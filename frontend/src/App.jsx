import { useState } from 'react';
import { verifyImage } from './services';

function App() {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageUrl.trim()) return;

    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await verifyImage(imageUrl);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Hubo un error de conexión con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg p-6 bg-slate-800 rounded-lg border border-slate-700 shadow-xl">
        <h1 className="text-3xl font-bold mb-2 text-center text-indigo-400">Fake Detector IGN</h1>
        <p className="text-slate-400 mb-6 text-center text-sm">Ingresa la URL de la imagen que deseas verificar</p>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="url"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            className="p-3 rounded bg-slate-900 border border-slate-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none transition"
            required
            disabled={loading}
          />
          
          <button
            type="submit"
            disabled={loading || !imageUrl.trim()}
            className={`px-4 py-3 rounded font-medium transition flex items-center justify-center gap-2
              ${loading || !imageUrl.trim() 
                ? 'bg-slate-700 text-slate-400 cursor-not-allowed' 
                : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Analizando...</span>
              </>
            ) : (
              'Verificar Imagen'
            )}
          </button>
        </form>

        {/* Mensaje de Error */}
        {error && (
          <div className="mt-6 p-4 bg-red-900/50 border border-red-500 rounded text-red-200">
            <p className="font-semibold">Error:</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Resultado */}
        {result && (
          <div className="mt-6 p-4 bg-emerald-900/30 border border-emerald-500/50 rounded">
            <h3 className="font-semibold text-emerald-400 mb-2">Resultado del Análisis:</h3>
            <div className="text-slate-300 text-sm whitespace-pre-wrap bg-slate-900/50 p-3 rounded font-mono">
              {typeof result === 'object' ? JSON.stringify(result, null, 2) : result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
