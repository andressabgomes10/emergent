const { makeWASocket, useMultiFileAuthState, DisconnectReason } = require('@whiskeysockets/baileys');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const qrcode = require('qrcode-terminal');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://4420134b-e876-4cbb-a37a-af96d2ddba3c.preview.emergentagent.com';
const SUPABASE_URL = 'https://whfmtlavhmalfsdetfsy.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndoZm10bGF2aG1hbGZzZGV0ZnN5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTM2NDEwMjYsImV4cCI6MjA2OTIxNzAyNn0.KCCHHy3FgnsveExLYWpI8qJMmrHTYFwkkJmQ2H_M-cw';

let sock = null;
let qrCodeData = null;
let connectionStatus = 'disconnected';

// Inicializar WhatsApp
async function initWhatsApp() {
    try {
        const { state, saveCreds } = await useMultiFileAuthState('./auth_info');

        sock = makeWASocket({
            auth: state,
            printQRInTerminal: false,
            browser: ['AtendePro', 'Chrome', '1.0.0']
        });

        sock.ev.on('connection.update', async (update) => {
            const { connection, lastDisconnect, qr } = update;

            if (qr) {
                qrCodeData = qr;
                connectionStatus = 'qr-ready';
                console.log('🔗 QR Code gerado - Escaneie com seu WhatsApp');
            }

            if (connection === 'close') {
                const shouldReconnect = (lastDisconnect?.error)?.output?.statusCode !== DisconnectReason.loggedOut;
                console.log('⚠️ Conexão fechada:', lastDisconnect?.error, 'Reconectando:', shouldReconnect);
                
                connectionStatus = 'disconnected';
                qrCodeData = null;

                if (shouldReconnect) {
                    setTimeout(initWhatsApp, 5000);
                }
            } else if (connection === 'open') {
                console.log('✅ WhatsApp conectado com sucesso!');
                connectionStatus = 'connected';
                qrCodeData = null;
            }
        });

        sock.ev.on('messages.upsert', async ({ messages, type }) => {
            if (type === 'notify') {
                for (const message of messages) {
                    if (!message.key.fromMe && message.message) {
                        await handleIncomingMessage(message);
                    }
                }
            }
        });

        sock.ev.on('creds.update', saveCreds);

    } catch (error) {
        console.error('❌ Erro ao inicializar WhatsApp:', error);
        connectionStatus = 'error';
        setTimeout(initWhatsApp, 10000);
    }
}

// Processar mensagens recebidas
async function handleIncomingMessage(message) {
    try {
        const phoneNumber = message.key.remoteJid.replace('@s.whatsapp.net', '');
        const messageText = message.message.conversation || 
                           message.message.extendedTextMessage?.text || '';

        console.log(`📱 Mensagem de ${phoneNumber}: ${messageText}`);

        // Processar comando e criar ticket
        const response = await processMessageAndCreateTicket(phoneNumber, messageText);

        // Enviar resposta
        if (response) {
            await sendMessage(phoneNumber, response);
        }

    } catch (error) {
        console.error('❌ Erro ao processar mensagem:', error);
    }
}

// Processar mensagem e criar ticket no Supabase
async function processMessageAndCreateTicket(phoneNumber, messageText) {
    try {
        // Buscar ou criar cliente
        const client = await findOrCreateClient(phoneNumber);
        
        if (!client) {
            return "❌ Erro ao processar sua solicitação. Tente novamente.";
        }

        // Criar ticket no Supabase
        const ticketResponse = await axios.post(`${SUPABASE_URL}/rest/v1/tickets`, {
            client_id: client.id,
            subject: `Atendimento WhatsApp - ${phoneNumber}`,
            description: messageText,
            status: 'open',
            priority: 'medium',
            created_by: '550e8400-e29b-41d4-a716-446655440000' // Admin ID
        }, {
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        const ticket = ticketResponse.data[0];

        return `✅ *Ticket criado!*

🎫 *ID:* #${ticket.id.slice(0, 8)}
📝 *Assunto:* ${ticket.subject}
📱 *Status:* Aberto
⏰ *Criado em:* ${new Date().toLocaleString('pt-BR')}

Nossa equipe irá analisar sua solicitação e retornar em breve.

Digite *ajuda* para ver os comandos disponíveis.`;

    } catch (error) {
        console.error('❌ Erro ao criar ticket:', error);
        return "❌ Erro ao processar sua solicitação. Nossa equipe foi notificada.";
    }
}

// Buscar ou criar cliente
async function findOrCreateClient(phoneNumber) {
    try {
        // Buscar cliente existente
        const clientResponse = await axios.get(`${SUPABASE_URL}/rest/v1/clients`, {
            params: { phone: `eq.${phoneNumber}` },
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY
            }
        });

        if (clientResponse.data.length > 0) {
            return clientResponse.data[0];
        }

        // Criar novo cliente
        const newClientResponse = await axios.post(`${SUPABASE_URL}/rest/v1/clients`, {
            name: `Cliente WhatsApp ${phoneNumber}`,
            email: `${phoneNumber}@whatsapp.temp`,
            phone: phoneNumber,
            company: 'WhatsApp',
            city: 'WhatsApp',
            status: 'active'
        }, {
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY,
                'Content-Type': 'application/json',
                'Prefer': 'return=representation'
            }
        });

        return newClientResponse.data[0];

    } catch (error) {
        console.error('❌ Erro ao buscar/criar cliente:', error);
        return null;
    }
}

// Enviar mensagem
async function sendMessage(phoneNumber, text) {
    try {
        if (!sock || connectionStatus !== 'connected') {
            throw new Error('WhatsApp não está conectado');
        }

        const jid = phoneNumber.includes('@') ? phoneNumber : `${phoneNumber}@s.whatsapp.net`;
        await sock.sendMessage(jid, { text });
        
        console.log(`📤 Mensagem enviada para ${phoneNumber}`);
        return { success: true };

    } catch (error) {
        console.error('❌ Erro ao enviar mensagem:', error);
        return { success: false, error: error.message };
    }
}

// Endpoints da API
app.get('/status', (req, res) => {
    res.json({
        status: connectionStatus,
        connected: connectionStatus === 'connected',
        user: sock?.user || null
    });
});

app.get('/qr', (req, res) => {
    res.json({
        qr: qrCodeData,
        status: connectionStatus
    });
});

app.post('/send', async (req, res) => {
    const { phoneNumber, message } = req.body;
    
    if (!phoneNumber || !message) {
        return res.status(400).json({ 
            success: false, 
            error: 'phoneNumber e message são obrigatórios' 
        });
    }

    const result = await sendMessage(phoneNumber, message);
    res.json(result);
});

// Endpoint para listar tickets de um cliente
app.get('/tickets/:phoneNumber', async (req, res) => {
    try {
        const phoneNumber = req.params.phoneNumber;
        
        const response = await axios.get(`${SUPABASE_URL}/rest/v1/tickets`, {
            params: { 
                select: '*,clients(name)',
                'clients.phone': `eq.${phoneNumber}`
            },
            headers: {
                'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
                'apikey': SUPABASE_ANON_KEY
            }
        });

        res.json(response.data);
    } catch (error) {
        console.error('❌ Erro ao buscar tickets:', error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`🚀 Serviço WhatsApp AtendePro rodando na porta ${PORT}`);
    console.log(`🌐 Frontend URL: ${FRONTEND_URL}`);
    initWhatsApp();
});

module.exports = { sendMessage };