import { useState } from "react";

const ImageUploader = ({ onImageDrop }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState("");

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      const tiposValidos = ["image/jpeg", "image/png", "image/webp"];
      if (!tiposValidos.includes(file.type)) {
        alert("Formato no válido. Por favor sube solo imágenes.");
        return;
      }

      onImageDrop(file);
    }
  };

  const handleUrlSubmit = (e) => {
    e.preventDefault();
    if (urlInput.trim() !== "") {
      onImageDrop(urlInput.trim());
      setUrlInput("");
    }
  };

  return (
    <div className="mt-8 w-full max-w-lg flex flex-col gap-6">
      <div
        className={`w-full p-12 border-2 border-dashed rounded-xl flex flex-col items-center justify-center transition-all duration-300 ${
          isDragging
            ? "border-indigo-500 bg-indigo-500/20 scale-105"
            : "border-slate-500 bg-slate-800 cursor-pointer hover:bg-slate-700"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {isDragging ? (
          <p className="text-2xl font-bold text-indigo-400 animate-pulse pointer-events-none">
            ¡Suelta la imagen aquí!
          </p>
        ) : (
          <div className="text-center pointer-events-none">
            <p className="text-slate-300 font-medium text-lg">
              Arrastra y suelta tu Imagen aquí
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="h-px bg-slate-600 flex-1"></div>
        <span className="text-slate-400 text-sm font-semibold uppercase tracking-wider">
          O pega un enlace
        </span>
        <div className="h-px bg-slate-600 flex-1"></div>
      </div>

      <form onSubmit={handleUrlSubmit} className="flex gap-3">
        <input
          type="url"
          placeholder="https://ejemplo.com/imagen.jpg"
          className="flex-1 bg-slate-800 border-2 border-slate-600 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500 transition-colors"
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-xl font-bold transition-colors shadow-lg shadow-indigo-600/30"
        >
          Analizar
        </button>
      </form>
    </div>
  );
};

export default ImageUploader;
