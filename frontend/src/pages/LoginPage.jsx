import { useState } from 'react';

const LoginPage = ({ onLogin, onCancel }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nickname, setNickname] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password || !nickname) {
      alert('Completa email, contraseña y nickname');
      return;
    }

    const userObj = {
      email,
      name: nickname,
      nickname,
      avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(nickname)}&background=4f46e5&color=fff`,
      credits: 10,
    };

    onLogin?.(userObj);
  };

  return (
    <div className="w-full max-w-md bg-slate-800 rounded-xl p-6">
      <h2 className="text-2xl font-bold mb-4">Iniciar Sesión / Registrarse</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Correo electrónico"
          className="bg-slate-700 px-3 py-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="bg-slate-700 px-3 py-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Nickname"
          className="bg-slate-700 px-3 py-2 rounded"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />

        <div className="flex gap-2 mt-2">
          <button type="submit" className="bg-indigo-600 px-4 py-2 rounded">Continuar</button>
          <button type="button" onClick={onCancel} className="bg-slate-600 px-4 py-2 rounded">Cancelar</button>
        </div>
        <p className="text-sm text-slate-300 mt-2">Registro rápido: recibirás 10 consultas gratuitas.</p>
      </form>
    </div>
  );
};

export default LoginPage;
