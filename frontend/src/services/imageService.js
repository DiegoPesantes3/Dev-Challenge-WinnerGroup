import api from './api';

/**
 * Servicio para verificar una imagen en el backend (soporta archivos y URLs)
 * @param {File|string} imageInput Archivo de imagen o URL de la imagen a verificar
 * @returns {Promise<any>} Respuesta de la IA
 */
export const verifyImage = async (imageInput) => {
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
};
