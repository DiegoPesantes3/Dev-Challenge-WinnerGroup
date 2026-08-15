import React from 'react';

const Sidebar = ({ user, currentView, onNavigate, onLoadQuery, onNewQuery, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  // Historial Mock para mostrar en la barra lateral con datos completos
  const recentQueries = [
    {
      id: 1,
      title: 'PS5 Pro Filtración',
      resultData: {
        isFake: true,
        verdict: "FALSO",
        explanation: "La imagen generada muestra inconsistencias en las proporciones de los puertos USB y artefactos típicos de generación por IA en las texturas de la consola.",
        confidence: 95,
        sources: [
          { url: "https://ign.lat/fake-news-ps5-pro", title: "IGN: Desmintiendo el rumor de PS5 Pro" }
        ],
        agent_reasoning: ["Análisis de imagen: Inconsistencias lumínicas.", "Búsqueda DDG: No hay comunicados de Sony."],
        image_url: "https://placehold.co/600x400/png?text=PS5+Pro+Fake"
      }
    },
    {
      id: 2,
      title: 'Sorteo Xbox Series X',
      resultData: {
        isFake: false,
        verdict: "VERDADERO",
        explanation: "La campaña coincide exactamente con los comunicados oficiales de Xbox Latinoamérica en sus redes certificadas.",
        confidence: 99,
        sources: [
          { url: "https://ign.lat/xbox-sorteo-oficial", title: "IGN: Participa en el sorteo de Xbox" }
        ],
        agent_reasoning: ["Búsqueda web cruzada positiva.", "URL origen verificada: xbox.com"],
        image_url: "https://placehold.co/600x400/png?text=Xbox+Sorteo"
      }
    }
  ];

  return (
    <>
      {/* Overlay para móviles */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-30 md:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 border-r border-slate-800 h-screen flex flex-col transition-transform duration-300 md:relative md:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        {/* Header del Sidebar */}
        <div className="p-4 flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div
              className="font-bold text-xl text-indigo-400 cursor-pointer flex items-center gap-2"
              onClick={() => onNavigate('home')}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
              MancOS IA
            </div>
            {/* Botón cerrar solo móvil */}
            <button 
              className="md:hidden text-slate-400 hover:text-white p-1"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
          </div>

          <button
            onClick={() => { onNewQuery(); setIsMobileMenuOpen(false); }}
            className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl px-4 py-2.5 transition-colors font-medium shadow-sm"
          >
            <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
            Nueva consulta
          </button>
        </div>

        {/* Historial Reciente */}
        <div className="flex-1 overflow-y-auto px-3 py-2 scrollbar-hide">
          <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider px-3 mb-2 mt-4">
            Recientes
          </h3>
          <ul className="space-y-1">
            {recentQueries.map((query) => (
              <li key={query.id}>
                <button
                  onClick={() => { onLoadQuery(query.resultData); setIsMobileMenuOpen(false); }}
                  className="w-full text-left px-3 py-3 rounded-lg text-sm text-slate-300 hover:bg-slate-800 transition-colors truncate flex items-center gap-2"
                >
                  <svg className="w-4 h-4 text-slate-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
                  <span className="truncate">{query.title}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer del Sidebar (Mensaje o Enlaces extras) */}
        <div className="p-4 border-t border-slate-800">
          <p className="text-xs text-slate-500 text-center">
            Analizador impulsado por Gemini y LangGraph
          </p>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
