import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import AnalysisResult from "./components/AnalysisResult";
import BackgroundSlider from "./components/BackgroundSlider";
import HistoryPage from "./pages/HistoryPage";
import { verifyImage } from "./services";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'history'
  const [user, setUser] = useState(null); // Mock auth state

  const handleLogin = () => {
    setUser({ name: 'Admin', avatar: 'https://ui-avatars.com/api/?name=Admin&background=4f46e5&color=fff' });
  };

  const handleLogout = () => {
    setUser(null);
    if (currentView === 'history') {
      setCurrentView('home');
    }
  };

  const handleNavigation = (view) => {
    if (view === 'history' && !user) {
      alert("Debes iniciar sesión para acceder al historial.");
      return;
    }
    setCurrentView(view);
  };

  const handleImageUpload = async (imageInput) => {
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      const data = await verifyImage(imageInput);
      setResult(data);
    } catch (err) {
      setError(err.response?.data?.error || "Hubo un error al verificar la imagen.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-slate-900 min-h-screen w-full text-white flex flex-col items-center justify-center overflow-x-hidden">
      <BackgroundSlider />

      {/* Navbar Temporal */}
      <nav className="absolute top-0 left-0 w-full p-4 z-20 flex justify-between items-center bg-slate-900/50 backdrop-blur-sm border-b border-slate-800">
        <div className="font-bold text-xl text-indigo-400">MancOS</div>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <button
              onClick={() => handleNavigation('home')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'home' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              Inicio
            </button>
            <button
              onClick={() => handleNavigation('history')}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${currentView === 'history' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              Historial
            </button>
          </div>

          <div className="h-6 w-px bg-slate-700 hidden sm:block"></div>

          {user ? (
            <div className="flex items-center gap-3">
              <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-indigo-500" />
              <span className="text-sm font-medium text-slate-200 hidden sm:block">{user.name}</span>
              <button onClick={handleLogout} className="text-xs bg-slate-800 hover:bg-red-600/80 text-slate-300 hover:text-white px-3 py-1.5 rounded transition-colors">
                Cerrar Sesión
              </button>
            </div>
          ) : (
            <button onClick={handleLogin} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
              Iniciar Sesión
            </button>
          )}
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-6 text-center w-full min-h-screen">
        {currentView === 'home' ? (
          <div className="w-full max-w-4xl flex flex-col items-center">
            <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
              MancOS IA
            </h1>
            <p className="mt-4 mb-8 text-slate-300 max-w-lg text-lg">
              Sube una imagen o pega un enlace y nuestra IA contrastará su veracidad con las noticias
              de IGN Latinoamérica.
            </p>

            {error && (
              <div className="mb-6 p-4 w-full max-w-lg bg-red-900/50 border border-red-500 rounded-xl text-red-200 text-left">
                <p className="font-semibold">Error:</p>
                <p className="text-sm">{error}</p>
              </div>
            )}

            {loading ? (
              <div className="flex flex-col items-center justify-center gap-4 mt-8">
                <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span className="text-slate-300 font-medium">Analizando imagen con Gemini...</span>
              </div>
            ) : !result ? (
              <ImageUploader onImageDrop={handleImageUpload} />
            ) : (
              <AnalysisResult result={result} />
            )}
          </div>
        ) : (
          <HistoryPage />
        )}
      </div>
    </div>
  );
}

export default App;
