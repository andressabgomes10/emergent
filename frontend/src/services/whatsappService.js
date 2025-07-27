import axios from 'axios';

// Use o mesmo host do backend, mas na porta 8002 (WhatsApp service)
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
const whatsappUrl = backendUrl.replace('/api', ':8002');
const WHATSAPP_SERVICE_URL = whatsappUrl;

export const whatsappService = {
  // Verificar status da conexão
  getStatus: async () => {
    try {
      const response = await axios.get(`${WHATSAPP_SERVICE_URL}/status`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Erro ao verificar status WhatsApp:', error);
      return { data: null, error: error.message };
    }
  },

  // Buscar QR Code
  getQR: async () => {
    try {
      const response = await axios.get(`${WHATSAPP_SERVICE_URL}/qr`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Erro ao buscar QR WhatsApp:', error);
      return { data: null, error: error.message };
    }
  },

  // Enviar mensagem
  sendMessage: async (phoneNumber, message) => {
    try {
      const response = await axios.post(`${WHATSAPP_SERVICE_URL}/send`, {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        message
      });
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Erro ao enviar mensagem WhatsApp:', error);
      return { data: null, error: error.message };
    }
  },

  // Buscar tickets de um cliente via WhatsApp
  getTicketsByPhone: async (phoneNumber) => {
    try {
      const response = await axios.get(`${WHATSAPP_SERVICE_URL}/tickets/${phoneNumber}`);
      return { data: response.data, error: null };
    } catch (error) {
      console.error('Erro ao buscar tickets WhatsApp:', error);
      return { data: null, error: error.message };
    }
  }
};