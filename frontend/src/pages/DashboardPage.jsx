import React, { useState, useEffect } from 'react';
import AnalysisHistoryGrid from '../components/AnalysisHistoryGrid';
import api from '../services/api';

const DashboardPage = ({ user, activeTab, setActiveTab }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // BI Stats States
  const [stats, setStats] = useState(null);
  const [statsLoading, setStatsLoading] = useState(false);
  const [statsError, setStatsError] = useState(null);

  useEffect(() => {
    if (activeTab === 'history') {
      const fetchHistory = async () => {
        try {
          setLoading(true);
          const response = await api.get('/analyses');
          setHistory(response.data.userHistory || []);
        } catch (error) {
          console.error("Error fetching history:", error);
          setHistory([]);
        } finally {
          setLoading(false);
        }
      };
      fetchHistory();
    } else if (activeTab === 'reports') {
      const fetchStats = async () => {
        try {
          setStatsLoading(true);
          setStatsError(null);
          const response = await api.get('/stats');
          setStats(response.data);
        } catch (error) {
          console.error("Error fetching stats:", error);
          if (error.response?.status === 403) {
            setStatsError("Acceso Denegado: Requiere permisos de Administrador para ver esta sección.");
          } else {
            setStatsError("Ocurrió un error al cargar la reportería.");
          }
        } finally {
          setStatsLoading(false);
        }
      };
      fetchStats();
    }
  }, [activeTab]);

  // CRUD: Update Name
  const handleEditName = (id, newName) => {
    // Temporalmente deshabilitado en backend real, mantenemos mock local
    setHistory(prev => prev.map(item => 
      item.id === id ? { ...item, queryName: newName } : item
    ));
  };

  // CRUD: Delete
  const handleDelete = async (id) => {
    if(window.confirm('¿Estás seguro de eliminar este análisis de tu historial?')) {
      try {
        await api.delete(`/analyses/${id}`);
        setHistory(prev => prev.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting analysis:", error);
        alert("Hubo un error al eliminar el análisis.");
      }
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
            <p className="text-slate-400 mb-6">Métricas y KPI del sistema generados a partir del análisis global de la plataforma. Datos actualizados en tiempo real.</p>
            {statsLoading ? (
              <div className="flex justify-center items-center py-20">
                <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : statsError ? (
              <div className="bg-red-900/30 border border-red-700/50 text-red-300 p-6 rounded-xl flex items-start gap-4">
                <svg className="w-8 h-8 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                <div>
                  <h4 className="text-lg font-bold">Error de Acceso</h4>
                  <p className="mt-1">{statsError}</p>
                </div>
              </div>
            ) : stats ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center">
                    <span className="text-slate-400 text-sm font-semibold uppercase mb-1">Total Fake News</span>
                    <span className="text-3xl font-extrabold text-red-400">{stats.summary?.totalFakeNewsDetected || 0}</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center">
                    <span className="text-slate-400 text-sm font-semibold uppercase mb-1">Estado de BD</span>
                    <span className="text-lg font-bold text-green-400 flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></span> Operativa</span>
                  </div>
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg flex flex-col justify-center items-center">
                    <span className="text-slate-400 text-sm font-semibold uppercase mb-1">Rol de Acceso</span>
                    <span className="text-lg font-bold text-indigo-400">Admin verificado</span>
                  </div>
                </div>

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
                            {stats.trends && stats.trends.length > 0 ? (
                              Object.keys(stats.trends[0]).map((key, i) => (
                                <th key={i} className="px-4 py-2">{key.replace(/_/g, ' ')}</th>
                              ))
                            ) : (
                              <th className="px-4 py-2">Datos</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {stats.trends && stats.trends.length > 0 ? (
                            stats.trends.map((row, i) => (
                              <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/30">
                                {Object.values(row).map((val, j) => (
                                  <td key={j} className={`px-4 py-2 ${j===0 ? 'font-medium' : ''}`}>{val}</td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr><td className="px-4 py-4 text-center text-slate-500">No hay datos en la vista.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Vista 2: Auditoría de Usuarios Activos */}
                  <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-5 shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-cyan-300 text-sm uppercase tracking-wide">Registro de Actividad de Usuarios</h4>
                    </div>
                    <div className="overflow-x-auto scrollbar-hide" style={{ WebkitOverflowScrolling: 'touch' }}>
                      <table className="w-full min-w-[500px] text-sm text-left text-slate-300">
                        <thead className="text-xs text-slate-400 bg-slate-900/50 uppercase border-b border-slate-700">
                          <tr>
                            {stats.topUsers && stats.topUsers.length > 0 ? (
                              Object.keys(stats.topUsers[0]).map((key, i) => (
                                <th key={i} className="px-4 py-2">{key.replace(/_/g, ' ')}</th>
                              ))
                            ) : (
                              <th className="px-4 py-2">Datos</th>
                            )}
                          </tr>
                        </thead>
                        <tbody>
                          {stats.topUsers && stats.topUsers.length > 0 ? (
                            stats.topUsers.map((row, i) => (
                              <tr key={i} className="border-b border-slate-700 hover:bg-slate-700/30">
                                {Object.values(row).map((val, j) => (
                                  <td key={j} className="px-4 py-2">{val}</td>
                                ))}
                              </tr>
                            ))
                          ) : (
                            <tr><td className="px-4 py-4 text-center text-slate-500">No hay datos en la vista.</td></tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </>
            ) : null}
            
            <div className="bg-slate-800/50 border border-slate-700 border-dashed rounded-xl p-4 text-center">
              <p className="text-sm text-slate-400">ℹ️ Estas tablas reflejan la actividad en vivo de la plataforma y el rendimiento global de los algoritmos de detección.</p>
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
