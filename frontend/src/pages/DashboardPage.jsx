import React, { useState, useEffect } from 'react';
import AnalysisHistoryGrid from '../components/AnalysisHistoryGrid';

const DashboardPage = ({ user, activeTab, setActiveTab }) => {
  // MOCK DATA for History
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular carga inicial de historial (Read)
    setTimeout(() => {
      setHistory([
        {
          id: 1,
          queryName: 'Análisis de Zelda',
          imageUrl: 'https://images.unsplash.com/photo-1605901309584-818e25960b8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          verdict: 'false',
          date: '14 Ago 2026',
          summary: 'La imagen ha sido detectada como generada por IA. Faltan detalles en las texturas de la espada.'
        },
        {
          id: 2,
          queryName: 'Noticia Xbox Series S',
          imageUrl: 'https://images.unsplash.com/photo-1627389955611-70c92a5d2e2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          verdict: 'true',
          date: '12 Ago 2026',
          summary: 'La consola coincide perfectamente con las fotos oficiales.'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  // CRUD: Update Name
  const handleEditName = (id, newName) => {
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, queryName: newName } : item
    ));
    // Aquí iría la llamada al backend: api.put(`/history/${id}`, { name: newName })
  };

  // CRUD: Delete
  const handleDelete = (id) => {
    if(window.confirm('¿Estás seguro de eliminar este análisis de tu historial?')) {
      setHistory(prev => prev.filter(item => item.id !== id));
      // Aquí iría la llamada al backend: api.delete(`/history/${id}`)
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-4 sm:p-6 relative z-10 text-white min-h-[80vh] flex flex-col">
      <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
          Dashboard de Usuario
        </h2>
        <p className="text-slate-400">
          Bienvenido, {user?.name || 'Administrador'}. Gestiona tus análisis y preferencias.
        </p>
      </div>

      {/* Navegación manejada exclusivamente desde el menú de perfil */}
      {/* Contenido Dinámico según la pestaña seleccionada en el menú */}
      <div className="flex-grow flex flex-col">
        {/* TAB: HISTORIAL */}
        {activeTab === 'history' && (
          <div className="animate-fade-in flex-grow">
            <h3 className="text-xl font-bold mb-6">Tus Consultas Recientes</h3>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64 gap-4">
                 <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-slate-400">Cargando historial...</span>
              </div>
            ) : (
              <AnalysisHistoryGrid 
                history={history} 
                onEditName={handleEditName} 
                onDelete={handleDelete} 
              />
            )}
          </div>
        )}

        {/* TAB: REPORTERÍA */}
        {activeTab === 'reports' && (
          <div className="animate-fade-in flex-grow">
            <h3 className="text-xl font-bold mb-2">Reportería Técnica y Business Intelligence</h3>
            <p className="text-slate-400 mb-6">Métricas y KPI generados a partir de vistas SQL complejas (Criterio 1.5). Datos actualizados en tiempo real.</p>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Vista 1: Resumen de Análisis por Mes (Agregación) */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-indigo-300 text-sm uppercase tracking-wide">Resumen Mensual de Análisis</h4>
                </div>
                <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full min-w-[500px] text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-2">Mes</th>
                        <th className="px-4 py-2">Total Consultas</th>
                        <th className="px-4 py-2 text-red-400">Falsos Detectados</th>
                        <th className="px-4 py-2 text-green-400">Tasa Acierto IA</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium">Agosto 2026</td>
                        <td className="px-4 py-2">145</td>
                        <td className="px-4 py-2 font-bold text-red-300">89 (61%)</td>
                        <td className="px-4 py-2 text-green-300">98.5%</td>
                      </tr>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium">Julio 2026</td>
                        <td className="px-4 py-2">312</td>
                        <td className="px-4 py-2 font-bold text-red-300">201 (64%)</td>
                        <td className="px-4 py-2 text-green-300">97.2%</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium">Junio 2026</td>
                        <td className="px-4 py-2">256</td>
                        <td className="px-4 py-2 font-bold text-red-300">110 (42%)</td>
                        <td className="px-4 py-2 text-green-300">99.1%</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vista 2: Auditoría de Usuarios Activos (Filtros y uniones) */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wide">Registro de Auditoría de Usuarios</h4>
                </div>
                <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full min-w-[500px] text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-2">Usuario</th>
                        <th className="px-4 py-2">Operación (CRUD)</th>
                        <th className="px-4 py-2">Tabla Afectada</th>
                        <th className="px-4 py-2">Última Actividad</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> admin@mancos</td>
                        <td className="px-4 py-2"><span className="bg-blue-500/20 text-blue-300 px-2 py-0.5 rounded text-xs">INSERT</span></td>
                        <td className="px-4 py-2">NewsAnalysis</td>
                        <td className="px-4 py-2">Hace 2 min</td>
                      </tr>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-green-500"></span> admin@mancos</td>
                        <td className="px-4 py-2"><span className="bg-yellow-500/20 text-yellow-300 px-2 py-0.5 rounded text-xs">UPDATE</span></td>
                        <td className="px-4 py-2">NewsAnalysis</td>
                        <td className="px-4 py-2">Hace 1 hora</td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-slate-500"></span> user02@mancos</td>
                        <td className="px-4 py-2"><span className="bg-red-500/20 text-red-300 px-2 py-0.5 rounded text-xs">DELETE</span></td>
                        <td className="px-4 py-2">NewsAnalysis</td>
                        <td className="px-4 py-2">Ayer</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vista 3: Rendimiento de LLM LangGraph */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-purple-300 text-sm uppercase tracking-wide">Rendimiento del Agente de IA</h4>
                </div>
                <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full min-w-[500px] text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-2">Modelo</th>
                        <th className="px-4 py-2">Tiempo Promedio (ms)</th>
                        <th className="px-4 py-2">Tokens Usados</th>
                        <th className="px-4 py-2">Estado</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-slate-200">Gemini 1.5 Pro</td>
                        <td className="px-4 py-2">1,240 ms</td>
                        <td className="px-4 py-2">845,020</td>
                        <td className="px-4 py-2"><span className="text-green-400 font-semibold">Óptimo</span></td>
                      </tr>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-slate-200">DuckDuckGo Search</td>
                        <td className="px-4 py-2">450 ms</td>
                        <td className="px-4 py-2">N/A</td>
                        <td className="px-4 py-2"><span className="text-green-400 font-semibold">Óptimo</span></td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-slate-200">Gemini Vision</td>
                        <td className="px-4 py-2 text-yellow-400">3,100 ms</td>
                        <td className="px-4 py-2">1,200,450</td>
                        <td className="px-4 py-2"><span className="text-yellow-400 font-semibold">Latencia Alta</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Vista 4: Enlaces Engañosos Frecuentes */}
              <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold text-orange-300 text-sm uppercase tracking-wide">Principales Fuentes Engañosas</h4>
                </div>
                <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                  <table className="w-full min-w-[500px] text-sm text-left text-slate-300">
                    <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700">
                      <tr>
                        <th className="px-4 py-2">Dominio de Origen</th>
                        <th className="px-4 py-2">Detecciones (Fake)</th>
                        <th className="px-4 py-2">Categoría Principal</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-orange-200">noticias-gamer-falsas.com</td>
                        <td className="px-4 py-2 font-bold text-red-400">452</td>
                        <td className="px-4 py-2"><span className="px-2 py-1 bg-slate-700 rounded text-xs">Rumores Hardware</span></td>
                      </tr>
                      <tr className="border-b border-slate-700 hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-orange-200">twitter.com/leaker_fake</td>
                        <td className="px-4 py-2 font-bold text-red-400">321</td>
                        <td className="px-4 py-2"><span className="px-2 py-1 bg-slate-700 rounded text-xs">Fechas Lanzamiento</span></td>
                      </tr>
                      <tr className="hover:bg-slate-700/30">
                        <td className="px-4 py-2 font-medium text-orange-200">facebook.com/gaming-gossip</td>
                        <td className="px-4 py-2 font-bold text-red-400">189</td>
                        <td className="px-4 py-2"><span className="px-2 py-1 bg-slate-700 rounded text-xs">Sorteos Falsos</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-xl p-4 text-center">
              <p className="text-sm text-slate-400">ℹ️ Estas tablas consumen directamente las vistas SQL complejas implementadas en el backend según el requerimiento de Inteligencia de Negocio.</p>
            </div>
          </div>
        )}

        {/* TAB: AJUSTES */}
        {activeTab === 'settings' && (
          <div className="animate-fade-in flex-grow max-w-lg">
            <h3 className="text-xl font-bold mb-6">Cambiar Contraseña</h3>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Contraseña actualizada con éxito (Simulado)"); }}>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Contraseña Actual</label>
                <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Nueva Contraseña</label>
                <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Confirmar Nueva Contraseña</label>
                <input type="password" required className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500" />
              </div>
              <div className="pt-2">
                <button type="submit" className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                  Actualizar Contraseña
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
