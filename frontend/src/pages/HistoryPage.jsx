import React, { useState, useEffect } from 'react';
import AnalysisHistoryGrid from '../components/AnalysisHistoryGrid';

const HistoryPage = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simular llamada a la base de datos/API
    const fetchHistory = () => {
      setTimeout(() => {
        setHistory([]); 
        setLoading(false);
      }, 1000);
    };
    
    fetchHistory();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 relative z-10 text-white">
      <div className="mb-8">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 mb-2">
          Historial de Análisis
        </h2>
        <p className="text-slate-400">
          Explora y revisa todos los análisis de imágenes que has realizado anteriormente.
        </p>
      </div>
      
      {loading ? (
        <div className="flex flex-col justify-center items-center h-64 gap-4">
           <svg className="animate-spin h-10 w-10 text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">  
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-slate-400">Cargando historial...</span>
        </div>
      ) : (
        <AnalysisHistoryGrid history={history} />
      )}
    </div>
  );
};

export default HistoryPage;
