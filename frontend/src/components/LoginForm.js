import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const LoginForm = ({ onSuccess }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { signIn, signUp } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      let result;
      
      if (isLogin) {
        result = await signIn(email, password);
      } else {
        result = await signUp(email, password, {
          name: email.split('@')[0], // Nome baseado no email
          role: 'agent' // Papel padrão
        });
      }

      if (result.error) {
        setError(result.error.message);
      } else {
        // Login/registro bem-sucedido
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (err) {
      setError('Erro inesperado. Tente novamente.');
      console.error('Erro de autenticação:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-100">
      <div className="glass-card rounded-2xl p-8 w-full max-w-md border border-white/20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">C</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Cajá Atendimento</h1>
          <p className="text-gray-600">
            {isLogin ? 'Entre na sua conta' : 'Crie sua conta'}
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Digite seu email"
              className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Senha
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-3 bg-white/50 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full btn-primary py-3 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Carregando...' : (isLogin ? 'Entrar' : 'Criar Conta')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-600 hover:text-orange-800 font-medium"
          >
            {isLogin 
              ? 'Não tem conta? Criar conta' 
              : 'Já tem conta? Fazer login'
            }
          </button>
        </div>

        {/* Demo credentials */}
        <div className="mt-6 p-4 bg-orange-50/50 rounded-xl border border-orange-200/50">
          <h3 className="text-sm font-semibold text-orange-800 mb-2">Credenciais de Teste:</h3>
          <p className="text-xs text-orange-600">
            Email: admin@atendepro.com<br />
            Senha: admin123
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;