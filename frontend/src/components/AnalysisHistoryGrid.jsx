import React, { useState } from 'react';

const HistoryCard = ({ analysis, onEditName, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(analysis.queryName || 'Consulta sin nombre');

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

  const handleSaveName = (e) => {
    e.stopPropagation();
    onEditName(analysis.id, editName);
    setIsEditing(false);
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setEditName(analysis.queryName || 'Consulta sin nombre');
    setIsEditing(false);
  };

  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-indigo-500 transition-all flex flex-col h-full group">
      <div className="h-48 w-full relative overflow-hidden bg-slate-900 cursor-pointer">
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
        {isEditing ? (
          <div className="mb-2 flex flex-col gap-3">
            <input 
              type="text" 
              value={editName}
              onChange={(e) => setEditName(e.target.value)}
              className="w-full bg-slate-900 border border-slate-600 rounded px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500"
              autoFocus
            />
            <div className="flex gap-2">
              <button onClick={handleSaveName} className="text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg flex-1">Guardar</button>
              <button onClick={handleCancelEdit} className="text-sm font-medium bg-slate-700 hover:bg-slate-600 text-white px-4 py-2 rounded-lg flex-1">Cancelar</button>
            </div>
          </div>
        ) : (
          <div className="mb-2 flex justify-between items-start gap-2">
            <h4 className="font-bold text-slate-200 text-sm truncate pt-1">{analysis.queryName || 'Consulta sin nombre'}</h4>
            {/* 
            <button 
              onClick={(e) => { e.stopPropagation(); setIsEditing(true); }}
              className="text-slate-400 hover:text-indigo-400 p-2 -mr-2 -mt-1 rounded-lg hover:bg-slate-700/50 transition-colors"
              title="Editar nombre"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"></path></svg>
            </button> 
            */}
          </div>
        )}
        
        <p className="text-slate-400 text-xs mb-2 uppercase tracking-wider font-semibold">{analysis.date}</p>
        <p className="text-slate-300 text-sm line-clamp-2 flex-grow">{analysis.summary || 'Sin descripción detallada.'}</p>
        
        <div className="mt-4 pt-3 border-t border-slate-700 flex justify-end">
          <button 
            onClick={(e) => { e.stopPropagation(); onDelete(analysis.id); }}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 transition-colors px-3 py-2 -mr-3 rounded-lg hover:bg-slate-700/30"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

const AnalysisHistoryGrid = ({ history = [], onEditName, onDelete }) => {
  if (!history || history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-slate-800/50 rounded-2xl border border-slate-700 border-dashed w-full min-h-[300px]">
        <svg className="w-16 h-16 text-slate-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        <h3 className="text-xl font-semibold text-slate-300 mb-2">Historial vacío</h3>
        <p className="text-slate-400 text-center max-w-sm">Aún no tienes análisis guardados en tu historial. Empieza analizando tu primera noticia.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
      {history.map((item, index) => (
        <HistoryCard 
          key={item.id || index} 
          analysis={item} 
          onEditName={onEditName} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
};

export default AnalysisHistoryGrid;
