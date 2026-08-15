import { useState } from 'react';
import api from '../services/api';

const LoginPage = ({ onLogin, onCancel }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Por favor completa email y contraseña');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      if (isRegistering) {
        await api.post('/auth/register', { email, password });
        setIsRegistering(false);
        setError('Registro exitoso. Ahora puedes iniciar sesión.');
      } else {
        const loginRes = await api.post('/auth/login', { email, password });
        localStorage.setItem('mancos_jwt', loginRes.data.token);
        
        // Cargar el perfil del usuario autenticado
        const profileRes = await api.get('/auth/profile');
        
        const nickname = profileRes.data.user.email.split('@')[0];
        
        const userObj = {
          ...profileRes.data.user,
          name: nickname,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nickname)}&background=4f46e5&color=fff`,
          credits: 10,
          token: loginRes.data.token
        };
        
        onLogin?.(userObj);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.response?.data?.error || 'Hubo un error de conexión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-xl p-6 relative">
      <h2 className="text-2xl font-bold mb-4">
        {isRegistering ? 'Crear una Cuenta' : 'Iniciar Sesión'}
      </h2>
      
      {error && (
        <div className={`p-3 mb-4 rounded ${error.includes('exitoso') ? 'bg-green-900/50 text-green-300' : 'bg-red-900/50 text-red-300'}`}>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-slate-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-slate-700 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className="flex gap-2 mt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-800 px-4 py-2 rounded transition-colors"
          >
            {loading ? 'Cargando...' : (isRegistering ? 'Registrarse' : 'Entrar')}
          </button>
          <button 
            type="button" 
            onClick={onCancel} 
            className="bg-slate-600 hover:bg-slate-500 px-4 py-2 rounded transition-colors"
          >
            Cancelar
          </button>
        </div>

        <p className="text-sm text-slate-300 mt-4 text-center">
          {isRegistering ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}
          <button
            type="button"
            className="text-indigo-400 font-bold ml-1 hover:underline"
            onClick={() => { setIsRegistering(!isRegistering); setError(null); }}
          >
            {isRegistering ? 'Inicia sesión' : 'Regístrate aquí'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
