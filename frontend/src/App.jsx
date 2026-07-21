import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Vite + React + Tailwind CSS</h1>
      <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
        <button
          onClick={() => setCount((count) => count + 1)}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded font-medium transition"
        >
          Count is {count}
        </button>
      </div>
    </div>
  )
}

export default App
