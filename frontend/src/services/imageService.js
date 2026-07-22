import api from './api';

/**
 * Servicio para verificar una imagen en el backend (DC-54)
 * @param {string} imageUrl URL de la imagen a verificar
 * @returns {Promise<any>} Respuesta de la IA
 */
export const verifyImage = async (imageUrl) => {
  const response = await api.post('/verificar', { imageUrl });
  return response.data;
};
