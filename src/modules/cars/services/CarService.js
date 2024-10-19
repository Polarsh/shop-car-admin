import { httpHelper } from '../../../services/httpHelper'

class CarService {
  constructor() {
    this.endpoint = '/cars'
  }

  async getAllCars() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener autos:', error)
      throw error
    }
  }

  async getCarById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener auto con id ${id}:`, error)
      throw error
    }
  }

  async createCar({ carData }) {
    try {
      return await httpHelper.post(this.endpoint, carData)
    } catch (error) {
      console.error('Error al crear auto:', error)
      throw error
    }
  }

  async updateCar({ id, carData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, carData)
    } catch (error) {
      console.error(`Error al actualizar auto con id ${id}:`, error)
      throw error
    }
  }
}

export default new CarService()
