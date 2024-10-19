/* eslint-disable space-before-function-paren */
import axios from 'axios'

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || 'http://localhost:4000'

class HttpError extends Error {
  constructor(message, status, data) {
    super(message)
    this.status = status
    this.data = data
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Interceptor para manejar errores
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      const message = error.response.data.message || 'An error occurred'
      throw new HttpError(message, error.response.status, error.response.data)
    } else if (error.request) {
      // La petición fue hecha pero no se recibió respuesta
      throw new HttpError('No response received from the server', 500)
    } else {
      // Algo sucedió en la configuración de la petición que provocó un error
      throw new HttpError('Error setting up the request', 500)
    }
  }
)

// Interceptor para añadir token de autenticación (si es necesario)
axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token') // O donde sea que almacenes tu token
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  error => Promise.reject(error)
)

const handleRequest = async request => {
  try {
    const response = await request()
    return response.data
  } catch (error) {
    if (error instanceof HttpError) {
      // Aquí puedes manejar errores específicos basados en el código de estado
      switch (error.status) {
        case 401:
          // Manejar error de autenticación
          console.error('Authentication error:', error.message)
          // Podrías redirigir al login o refrescar el token aquí
          break
        case 403:
          // Manejar error de autorización
          console.error('Authorization error:', error.message)
          break
        case 404:
          // Manejar error de recurso no encontrado
          console.error('Resource not found:', error.message)
          break
        case 500:
          // Manejar error del servidor
          console.error('Server error:', error.message)
          break
        default:
          console.error('HTTP error:', error.message)
      }
    } else {
      console.error('Unexpected error:', error)
    }
    throw error
  }
}

export const httpHelper = {
  get: (url, config = {}) =>
    handleRequest(() => axiosInstance.get(url, config)),
  post: (url, data, config = {}) =>
    handleRequest(() => axiosInstance.post(url, data, config)),
  put: (url, data, config = {}) =>
    handleRequest(() => axiosInstance.put(url, data, config)),
  patch: (url, data, config = {}) =>
    handleRequest(() => axiosInstance.patch(url, data, config)),
  delete: (url, config = {}) =>
    handleRequest(() => axiosInstance.delete(url, config))
}
