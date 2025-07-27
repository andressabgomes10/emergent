import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode-react';
import { whatsappService } from '../services/whatsappService';

const WhatsAppIntegration = () => {
  const [qrCode, setQrCode] = useState(null);
  const [status, setStatus] = useState('disconnected');
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  // Verificar status da conexão
  const checkStatus = async () => {
    try {
      const { data, error } = await whatsappService.getStatus();
      if (error) {
        console.error('Erro ao verificar status:', error);
        setStatus('error');
        return false;
      }
      setStatus(data.status);
      setUser(data.user);
      return data.connected;
    } catch (error) {
      console.error('Erro ao verificar status:', error);
      setStatus('error');
      return false;
    }
  };

  // Buscar QR Code
  const fetchQR = async () => {
    try {
      const { data, error } = await whatsappService.getQR();
      if (error) {
        console.error('Erro ao buscar QR:', error);
        setQrCode(null);
        return;
      }
      if (data?.qr) {
        setQrCode(data.qr);
      } else {
        setQrCode(null);
      }
    } catch (error) {
      console.error('Erro ao buscar QR:', error);
      setQrCode(null);
    }
  };

  // Polling para verificar status e QR
  useEffect(() => {
    const interval = setInterval(async () => {
      const isConnected = await checkStatus();
      if (!isConnected && status !== 'connected') {
        await fetchQR();
      }
    }, 3000);

    // Verificação inicial
    checkStatus();

    return () => clearInterval(interval);
  }, [status]);

  // Enviar mensagem de teste
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!phoneNumber || !message) {
      alert('Por favor, preencha todos os campos');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await whatsappService.sendMessage(phoneNumber, message);

      if (error) {
        alert('Erro ao enviar mensagem: ' + error);
        return;
      }

      if (data?.success) {
        alert('Mensagem enviada com sucesso!');
        setMessage('');
      } else {
        alert('Erro ao enviar mensagem: ' + (data?.error || 'Erro desconhecido'));
      }
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'connected': return 'from-green-400 to-green-600';
      case 'qr-ready': return 'from-yellow-400 to-orange-500';
      case 'disconnected': return 'from-gray-400 to-gray-600';
      case 'error': return 'from-red-400 to-red-600';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'connected': return '✅ Conectado';
      case 'qr-ready': return '📱 Aguardando QR';
      case 'disconnected': return '⚪ Desconectado';
      case 'error': return '❌ Erro';
      default: return '⚪ Verificando...';
    }
  };

  return (
    <div className="space-y-6 fade-in-up">
      {/* Header */}
      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.515z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">Integração WhatsApp</h1>
              <p className="text-gray-600">Conecte o AtendePro com WhatsApp</p>
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-xl bg-gradient-to-r ${getStatusColor()} text-white font-semibold`}>
            {getStatusText()}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* QR Code Section */}
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Conexão WhatsApp</h2>
          
          {status === 'connected' && user && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp Conectado!</h3>
              <p className="text-gray-600 mb-2">Conta: {user.name}</p>
              <p className="text-gray-600">Número: {user.id?.split(':')[0]}</p>
              <div className="mt-4 p-3 bg-green-50 rounded-xl border border-green-200">
                <p className="text-sm text-green-700">
                  ✅ Agora os clientes podem enviar mensagens no WhatsApp e automaticamente será criado um ticket no sistema!
                </p>
              </div>
            </div>
          )}

          {status === 'qr-ready' && qrCode && (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Escaneie o QR Code</h3>
              <div className="bg-white p-4 rounded-xl inline-block border-2 border-gray-200">
                <QRCode value={qrCode} size={200} />
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                <p className="text-sm text-blue-700">
                  1. Abra o WhatsApp no seu celular<br/>
                  2. Vá em Configurações → Aparelhos conectados<br/>
                  3. Toque em "Conectar um aparelho"<br/>
                  4. Escaneie este QR code
                </p>
              </div>
            </div>
          )}

          {(status === 'disconnected' || status === 'error') && (
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.464 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">WhatsApp Desconectado</h3>
              <p className="text-gray-600">
                {status === 'error' 
                  ? 'Erro na conexão. Verifique se o serviço WhatsApp está rodando.' 
                  : 'Aguardando conexão com WhatsApp...'}
              </p>
            </div>
          )}
        </div>

        {/* Send Message Section */}
        <div className="glass-card rounded-2xl p-6 border border-white/20">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Enviar Mensagem de Teste</h2>
          
          <form onSubmit={handleSendMessage} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de Telefone
              </label>
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Ex: 5511999999999"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                disabled={status !== 'connected'}
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Formato: Código do país + DDD + número (sem espaços)
              </p>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Mensagem
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite sua mensagem..."
                rows="4"
                className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                disabled={status !== 'connected'}
                required
              />
            </div>

            <button
              type="submit"
              disabled={status !== 'connected' || loading}
              className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Enviando...' : status !== 'connected' ? 'WhatsApp Desconectado' : '📤 Enviar Mensagem'}
            </button>
          </form>

          {status === 'connected' && (
            <div className="mt-6 p-4 bg-green-50 rounded-xl border border-green-200">
              <h4 className="font-semibold text-green-800 mb-2">✅ Como funciona:</h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Clientes enviam mensagens no WhatsApp</li>
                <li>• Automaticamente é criado um ticket</li>
                <li>• Você pode responder diretamente pelo sistema</li>
                <li>• Histórico fica salvo no Supabase</li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Instructions */}
      <div className="glass-card rounded-2xl p-6 border border-white/20">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Como usar a integração WhatsApp</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">1</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Conectar WhatsApp</h3>
            <p className="text-sm text-gray-600">Escaneie o QR code com seu WhatsApp Business para conectar</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">2</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Receber Mensagens</h3>
            <p className="text-sm text-gray-600">Mensagens dos clientes viram tickets automaticamente no sistema</p>
          </div>

          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-xl mx-auto mb-3 flex items-center justify-center">
              <span className="text-white font-bold text-lg">3</span>
            </div>
            <h3 className="font-semibold text-gray-800 mb-2">Gerenciar Atendimento</h3>
            <p className="text-sm text-gray-600">Responda e gerencie todos os atendimentos pelo AtendePro</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhatsAppIntegration;