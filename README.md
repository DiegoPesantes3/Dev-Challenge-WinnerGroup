# MancOS IA - Dev Challenge 2026

Aplicación web MVP diseñada para combatir la desinformación en la industria gamer. Identifica y analiza imágenes de posibles noticias falsas (leaks, capturas editadas, rumores de hardware) utilizando Inteligencia Artificial, tomando como fuente de verdad exclusiva a **IGN Latinoamérica**.

Desarrollado para el **Dev Challenge 2026** por estudiantes de **PUCE TEC**:
- Erick Narváez
- Diego Pesantes
- David Sanipatin

## Stack Tecnológico

### Frontend
- **React + Vite:** Para una interfaz de usuario rápida y dinámica.
- **Tailwind CSS:** Para un diseño moderno, minimalista y responsivo.

### Backend
- **Node.js + Express:** Servidor ligero y *stateless*.
- **Multer (Memory Storage):** Para el manejo temporal de imágenes en la memoria RAM
- **LangChain & Zod:** Para orquestar la IA y forzar respuestas estructuradas en JSON.
- **Google Gemini 3.1 Flash Lite:** Modelo de lenguaje visual (LLM) encargado del análisis de las imágenes.

Más detalles en la carpeta `ADR's/`.

## 🚀 Instalación y Uso Local

El proyecto está dividido en dos partes: `frontend` y `backend`. Debes ejecutar ambos simultáneamente en terminales separadas.

### 1. Configurar el Backend

```bash
cd backend
npm install
```

**Variables de Entorno:**
Crea un archivo llamado `.env` en la carpeta `backend/` basándote en el archivo de ejemplo:
```bash
cp .env.example .env
```
*(Asegúrate de colocar tu API Key real de Google Gemini dentro del archivo `.env`)*

**Iniciar el servidor:**
```bash
npm run dev
```
El servidor backend correrá en `http://localhost:3001`.

### 2. Configurar el Frontend

Abre una nueva terminal en la raíz del proyecto y ejecuta:

```bash
cd frontend
npm install
npm run dev
```
Vite levantará el frontend (usualmente en `http://localhost:5173`).
