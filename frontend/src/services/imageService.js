import api from './api';

/**
 * Servicio para verificar una imagen en el backend (soporta archivos y URLs)
 * @param {File|string} imageInput Archivo de imagen o URL de la imagen a verificar
 * @returns {Promise<any>} Respuesta de la IA
 */
export const verifyImage = async (imageInput) => {
  // MOCK temporal mientras se desarrolla el endpoint de IA en el backend
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        verdict: Math.random() > 0.5 ? 'false' : 'true',
        summary: 'Este es un análisis simulado porque el backend de IA aún está en construcción.',
        details: [
          'Texturas inconsistentes simuladas.',
          'Iluminación artificial detectada simulada.'
        ]
      });
    }, 2000);
  });

  /* 
  // CÓDIGO ORIGINAL CONSERVADO:
  if (imageInput instanceof File) {
    const formData = new FormData();
    formData.append('image', imageInput);
    const response = await api.post('/verificar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } else {
    const response = await api.post('/verificar', { imageUrl: imageInput });
    return response.data;
  }
  */
};
