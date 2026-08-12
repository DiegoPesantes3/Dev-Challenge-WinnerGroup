import React from 'react';

const HistoryCard = ({ analysis }) => {
  const getBadgeColor = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case 'true': return 'bg-green-500 text-white';
      case 'false': return 'bg-red-500 text-white';
      case 'misleading': return 'bg-yellow-500 text-white';
      default: return 'bg-slate-500 text-white';
    }
  };

  const getTranslatedVerdict = (verdict) => {
    switch (verdict?.toLowerCase()) {
      case 'true': return 'Verdadero';
      case 'false': return 'Falso';
      case 'misleading': return 'Engañoso';
      default: return 'Desconocido';
    }
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-indigo-500 transition-all cursor-pointer flex flex-col h-full group">
      <div className="h-48 w-full relative overflow-hidden bg-slate-900">
        <img 
          src={analysis.imageUrl || "https://via.placeholder.com/400x300?text=Sin+Imagen"} 
          alt="Vista previa del análisis" 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300" 
        />
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-bold px-3 py-1 rounded-full shadow-md ${getBadgeColor(analysis.verdict)}`}>
            {getTranslatedVerdict(analysis.verdict)}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-semibold">{analysis.date}</p>
        <p className="text-slate-200 text-sm line-clamp-3">{analysis.summary || 'Sin descripción detallada.'}</p>
      </div>
    </div>
  );
};

const AnalysisHistoryGrid = ({ history = [] }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed w-full min-h-[300px]">
        <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Vista vacía</h3>
        <p className="text-slate-400 text-center max-w-sm">Aún no tienes análisis guardados en tu historial. Empieza analizando tu primera noticia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
      {history.map((item, index) => (
        <HistoryCard key={item.id || index} analysis={item} />
      ))}
    </div>
  );
};

export default AnalysisHistoryGrid;
