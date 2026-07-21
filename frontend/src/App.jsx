import { useState } from "react";
import ImageUploader from "./components/ImageUploader";
import AnalysisResult from "./components/AnalysisResult";
import BackgroundSlider from "./components/BackgroundSlider";

function App() {
  const [result, setResult] = useState(null);

  const handleImageUpload = async (file) => {
    console.log("Preparado para enviar al backend:", file.name);
  };

  return (
    <div className="relative bg-slate-900 min-h-screen w-full text-white flex flex-col items-center justify-center overflow-hidden">
      <BackgroundSlider />

      <div className="relative z-10 flex flex-col items-center p-6 text-center">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400 drop-shadow-lg">
          MancOS IA
        </h1>
        <p className="mt-4 mb-10 text-slate-300 max-w-lg text-lg">
          Sube una imagen y nuestra IA contrastará su veracidad con las noticias
          de IGN Latinoamérica.
        </p>

        {!result ? (
          <ImageUploader onImageDrop={handleImageUpload} />
        ) : (
          <AnalysisResult result={result} />
        )}
      </div>
    </div>
  );
}

export default App;
