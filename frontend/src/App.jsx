import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import AnalysisResult from "./components/AnalysisResult";
import BackgroundSlider from "./components/BackgroundSlider";
import { verifyImage } from "./services";

function App() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <div className="relative bg-slate-900 min-h-screen w-full text-white flex flex-col items-center justify-center overflow-hidden">
      <BackgroundSlider />

      <div className="relative z-10 flex flex-col items-center p-6 text-center w-full max-w-4xl">
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
    </div>
  );
}

export default App;
