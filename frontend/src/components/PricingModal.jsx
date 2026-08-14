const PricingModal = ({ onClose, onPurchase }) => {
  const plans = [
    { id: 'basic', name: 'Básico', price: '$2.99/mes', benefits: ['+50 consultas'] },
    { id: 'pro', name: 'Pro', price: '$7.99/mes', benefits: ['+200 consultas', 'Soporte prioritario'] },
    { id: 'enterprise', name: 'Enterprise', price: '$29.99/mes', benefits: ['Consultas ilimitadas', 'Integración API'] },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-slate-900 rounded-xl p-6 w-[min(920px,95vw)]">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Precios (simulados)</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">✕</button>
        </div>

        <p className="text-slate-300 mb-4">Estos precios son completamente inventados para propósitos de demostración. Selecciona un plan para ver detalles.</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {plans.map((p) => (
            <div key={p.id} className="border border-slate-700 rounded-xl p-4 bg-slate-800">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-lg">{p.name}</h4>
                  <div className="text-slate-300">{p.price}</div>
                </div>
                <div>
                  <button
                    onClick={() => onPurchase?.(p)}
                    className="bg-rose-600 hover:bg-rose-500 text-white px-3 py-2 rounded"
                  >Comprar</button>
                </div>
              </div>
              <ul className="mt-3 text-sm text-slate-300">
                {p.benefits.map((b, i) => (
                  <li key={i}>• {b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 text-right">
          <button onClick={onClose} className="bg-slate-700 px-4 py-2 rounded">Cerrar</button>
        </div>
      </div>
    </div>
  );
};

export default PricingModal;
