const AnalysisResult = ({ result }) => {
    let status = result.status;
    if (!status) {
        status = result.isFake ? "fake" : "real";
    }

    let cardColor = "";
    let titleColor = "";
    let badgeColor = "";
    let titleText = "";

    if (status === "fake") {
        cardColor = "border-red-500 shadow-[0_0_40px_rgba(239,68,68,0.4)]";
        titleColor = "text-red-400";
        badgeColor = "bg-red-500/20 text-red-300";
        titleText = "LA IMAGEN ES FALSA";
    } else if (status === "suspicious") {
        cardColor = "border-yellow-500 shadow-[0_0_40px_rgba(234,179,8,0.4)]";
        titleColor = "text-yellow-400";
        badgeColor = "bg-yellow-500/20 text-yellow-300";
        titleText = "LA IMAGEN ES SOSPECHOSA";
    } else {
        cardColor = "border-green-500 shadow-[0_0_40px_rgba(34,197,94,0.4)]";
        titleColor = "text-green-400";
        badgeColor = "bg-green-500/20 text-green-300";
        titleText = "LA IMAGEN ES REAL";
    }

    return (
        <div
            className={`mt-8 w-full max-w-2xl bg-slate-900/85 backdrop-blur-xl border-2 rounded-2xl p-8 transition-all duration-500 ${cardColor}`}
        >
            <div className="flex items-center justify-between border-b border-slate-700 pb-4 mb-6">
                <h2 className={`text-3xl font-extrabold tracking-tight ${titleColor}`}>
                    {titleText}
                </h2>
                <span
                    className={`px-4 py-1.5 rounded-full font-bold text-sm border border-current ${badgeColor}`}
                >
                    Precisión: {result.confidence}
                </span>
            </div>

            <div className="text-slate-200 text-lg leading-relaxed">
                <p className="mb-6">
                    <strong className="text-white">Análisis de la IA:</strong>{" "}
                    {result.explanation}
                </p>

                <div className="bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                    <p className="text-sm text-slate-400 italic">
                        * Este resultado fue generado mediante inteligencia artificial
                        contrastando la imagen exclusivamente con el historial de noticias
                        de <strong>IGN Latinoamérica</strong>.
                    </p>
                </div>
            </div>

            <button
                className="mt-8 w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-lg border border-slate-600 transition-colors"
                onClick={() => window.location.reload()}
            >
                Analizar otra imagen
            </button>
        </div>
    );
};

export default AnalysisResult;
