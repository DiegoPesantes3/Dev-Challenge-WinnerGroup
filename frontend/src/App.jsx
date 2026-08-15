import { useEffect, useRef, useState } from "react";
import ImageUploader from "./components/ImageUploader";
import AnalysisResult from "./components/AnalysisResult";
import BackgroundSlider from "./components/BackgroundSlider";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import PricingModal from "./components/PricingModal";
import { verifyImage } from "./services";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notification, setNotification] = useState(null);
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'dashboard' | 'login'
  const [dashboardTab, setDashboardTab] = useState('history'); // 'history' | 'reports' | 'settings'
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('mancos_user');
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  });
  const [guestCredits, setGuestCredits] = useState(() => {
    const v = parseInt(localStorage.getItem('mancos_guest_credits') || "3", 10);
    return Number.isNaN(v) ? 3 : v;
  });
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const notificationTimeoutRef = useRef(null);

  const handleOpenLogin = () => setCurrentView('login');

  const performLogin = (userObj) => {
    setUser(userObj);
    try {
      localStorage.setItem('mancos_user', JSON.stringify(userObj));
    } catch (e) {}
    setCurrentView('home');
  };

  const handleLogout = () => {
    setUser(null);
    setIsProfileMenuOpen(false);
    try { localStorage.removeItem('mancos_user'); } catch (e) {}
    if (currentView === 'dashboard' || currentView === 'history') {
      setCurrentView('home');
    }
  };

  const handleNavigation = (view, tab = null) => {
    if (view === 'dashboard' && !user) {
      alert("Debes iniciar sesión para acceder al dashboard.");
      return;
    }
    setCurrentView(view);
    if (tab) {
      setDashboardTab(tab);
    }
    setIsProfileMenuOpen(false);
    setIsMobileMenuOpen(false); // Cierra menú móvil al navegar
  };

  const handleLoadQuery = (queryData) => {
    setResult(queryData);
    setCurrentView('home');
    setIsMobileMenuOpen(false);
  };

  const handleNewQuery = () => {
    setResult(null);
    setCurrentView('home');
    setIsMobileMenuOpen(false);
  };

  const handleUpgrade = () => {
    // Mostrar modal de precios (no otorgar mejoras automáticamente)
    setShowPricing(true);
  };

  const [showPricing, setShowPricing] = useState(false);

  const handlePurchaseMock = (plan) => {
    // No otorgar mejoras; solo mostrar notificación de mock
    showNotification({ title: 'Pago (simulado)', message: `Has seleccionado ${plan.name} (${plan.price}). La pasarela de pago no está implementada.`, type: 'info', autoCloseMs: 4000 });
    setShowPricing(false);
  };

  const closeNotification = () => {
    setNotification(null);
    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
      notificationTimeoutRef.current = null;
    }
  };

  const showNotification = ({ title, message, retryAction = null, type = "error", autoCloseMs = 5000 }) => {
    setNotification({ title, message, retryAction, type });

    if (notificationTimeoutRef.current) {
      clearTimeout(notificationTimeoutRef.current);
    }

    notificationTimeoutRef.current = setTimeout(() => setNotification(null), autoCloseMs);
  };

  useEffect(() => {
    return () => {
      if (notificationTimeoutRef.current) {
        clearTimeout(notificationTimeoutRef.current);
      }
    };
  }, []);

  const handleImageUpload = async (imageInput) => {
    // Comprobar créditos antes de permitir la solicitud
    const available = user ? (user.credits || 0) : guestCredits;
    if ((available || 0) <= 0) {
      if (user) {
        showNotification({ title: 'Límite alcanzado', message: 'Se han agotado tus consultas gratuitas. Mejora tu plan para más consultas.', type: 'warning', retryAction: handleUpgrade });
      } else {
        showNotification({ title: 'Límite alcanzado', message: 'Has alcanzado el límite de 3 consultas. Inicia sesión para obtener 10 consultas gratis.', type: 'warning', retryAction: () => setCurrentView('login') });
      }
      return;
    }

    // Consumir un crédito
    if (user) {
      const updated = { ...user, credits: (user.credits || 0) - 1 };
      setUser(updated);
      try { localStorage.setItem('mancos_user', JSON.stringify(updated)); } catch (e) {}
    } else {
      const newGuest = Math.max(0, guestCredits - 1);
      setGuestCredits(newGuest);
      try { localStorage.setItem('mancos_guest_credits', String(newGuest)); } catch (e) {}
    }

    setLoading(true);
    setResult(null);
    setError(null);
    closeNotification();

    try {
      const data = await verifyImage(imageInput);
      setResult(data);
    } catch (err) {
      const status = err.response?.status;
      const backendMessage = err.response?.data?.error;
      const isServerError = status >= 500 || !err.response;

      const title = isServerError ? "Sin conexión con el servidor" : "No se pudo procesar la imagen";
      const message = isServerError
        ? "No pudimos contactar con el servidor. Verifica tu conexión e inténtalo de nuevo."
        : backendMessage || "Hubo un error al verificar la imagen.";

      setError(message);
      showNotification({
        title,
        message,
        type: isServerError ? "warning" : "error",
        retryAction: () => handleImageUpload(imageInput),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 w-full overflow-hidden text-white">
      <Sidebar 
        user={user} 
        currentView={currentView} 
        onNavigate={handleNavigation} 
        onLoadQuery={handleLoadQuery}
        onNewQuery={handleNewQuery}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      
      {/* Contenedor Principal Derecho */}
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <BackgroundSlider />

      {notification && (
        <div className="fixed top-4 right-4 z-50 w-[min(90vw,420px)] rounded-xl border border-slate-700 bg-slate-900/95 shadow-2xl backdrop-blur-md p-4 text-left">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <p className="text-sm font-bold text-white">{notification.title}</p>
              <p className="mt-1 text-sm text-slate-300">{notification.message}</p>
            </div>
            <button
              type="button"
              onClick={closeNotification}
              className="text-slate-400 hover:text-white text-lg leading-none"
              aria-label="Cerrar notificación"
            >
              ×
            </button>
          </div>

          {notification.retryAction && (
            <button
              type="button"
              onClick={() => {
                closeNotification();
                notification.retryAction();
              }}
              className="mt-3 inline-flex items-center justify-center rounded-lg bg-indigo-600 hover:bg-indigo-500 px-3 py-2 text-sm font-semibold text-white"
            >
              Reintentar
            </button>
          )}
        </div>
      )}

      {/* Navbar Simplificada (Solo Perfil) */}
      <nav className="absolute top-0 right-0 left-0 p-4 z-20 flex justify-between items-center pointer-events-none md:justify-end">
        {/* Hamburger Menu (Mobile) */}
        <div className="md:hidden pointer-events-auto">
          <button 
            onClick={() => setIsMobileMenuOpen(true)} 
            className="p-2 text-slate-300 hover:text-white bg-slate-800/80 rounded-lg border border-slate-700 shadow-lg backdrop-blur-sm transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          </button>
        </div>

        <div className="flex items-center gap-2 sm:gap-4 pointer-events-auto flex-wrap justify-end">
          {user ? (
            <div className="relative">
              <div className="flex items-center gap-2 sm:gap-3">
                <span className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded hidden sm:inline-block">{(user.credits||0)} consultas</span>
                <button onClick={handleUpgrade} className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-2 py-1.5 sm:px-3 rounded transition-colors flex items-center gap-1 sm:gap-2">
                  <span className="text-sm">💳</span>
                  <span className="hidden sm:inline">Mejorar (Pagar)</span>
                  <span className="sm:hidden">Mejorar</span>
                </button>
                <button 
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                  className="flex items-center gap-2 sm:gap-3 bg-slate-800 hover:bg-slate-700 px-2 sm:px-3 py-1.5 rounded-full transition-colors border border-slate-700"
                >
                  <img src={user.avatar} alt="Avatar" className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-indigo-500" />
                  <span className="text-sm font-medium text-slate-200 hidden sm:block">{user.name}</span>
                  <svg className={`w-4 h-4 text-slate-400 transition-transform ${isProfileMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </button>
              </div>

              {isProfileMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 sm:w-56 bg-slate-800 border border-slate-700 rounded-xl shadow-xl py-2 z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-slate-700 mb-1">
                    <p className="text-sm text-white font-medium truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">admin@mancos.ia</p>
                    <p className="text-xs text-indigo-400 mt-1 sm:hidden">{(user.credits||0)} consultas</p>
                  </div>
                  <button 
                    onClick={() => handleNavigation('dashboard', 'history')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
                  >
                    🕒 <span className="truncate">Historial</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('dashboard', 'reports')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
                  >
                    📊 <span className="truncate">Reportería</span>
                  </button>
                  <button 
                    onClick={() => handleNavigation('dashboard', 'settings')}
                    className="w-full text-left px-4 py-2 text-sm text-slate-300 hover:bg-slate-700 hover:text-white transition-colors flex items-center gap-2"
                  >
                    ⚙️ <span className="truncate">Ajustes</span>
                  </button>
                  <div className="h-px bg-slate-700 my-1"></div>
                  <button 
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-slate-700 hover:text-red-300 transition-colors flex items-center gap-2"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="text-xs text-slate-300 bg-slate-800 px-2 py-1 rounded hidden sm:inline-block">{guestCredits} consultas</span>
              <button onClick={handleOpenLogin} className="bg-indigo-600 hover:bg-indigo-500 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-colors text-sm whitespace-nowrap">
                Iniciar Sesión
              </button>
              <button onClick={handleUpgrade} className="text-xs bg-rose-600 hover:bg-rose-500 text-white px-2 py-1.5 sm:px-3 sm:py-1.5 rounded transition-colors flex items-center gap-1 sm:gap-2">
                <span className="text-sm">💳</span>
                <span className="hidden sm:inline">Mejorar</span>
              </button>
            </div>
          )}
        </div>
      </nav>

      <div className="relative z-10 flex flex-col items-center pt-24 pb-12 px-6 text-center w-full flex-1 overflow-y-auto">
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
              <ImageUploader onImageDrop={handleImageUpload} onNotify={showNotification} />
            ) : (
              <AnalysisResult result={result} />
            )}
          </div>
        ) : currentView === 'login' ? (
          <LoginPage onLogin={performLogin} onCancel={() => setCurrentView('home')} />
        ) : (
          <DashboardPage user={user} activeTab={dashboardTab} setActiveTab={setDashboardTab} />
        )}

        {showPricing && (
          <PricingModal onClose={() => setShowPricing(false)} onPurchase={handlePurchaseMock} />
        )}
      </div>
    </div>
    </div>
  );
}

export default App;
