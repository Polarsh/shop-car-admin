import { httpHelper } from '../../../../../services/httpHelper'

class FuelService {
  constructor() {
    this.endpoint = '/fuels'
  }

  async getAllFuels() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener combustibles:', error)
      throw error
    }
  }

  async getFuelById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener combustible con id ${id}:`, error)
      throw error
    }
  }

  async createFuel({ fuelData }) {
    try {
      return await httpHelper.post(this.endpoint, fuelData)
    } catch (error) {
      console.error('Error al crear combustible:', error)
      throw error
    }
  }

  async updateFuel({ id, fuelData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, fuelData)
    } catch (error) {
      console.error(`Error al actualizar combustible con id ${id}:`, error)
      throw error
    }
  }

  async deleteFuel({ id }) {
    try {
      return await httpHelper.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al eliminar combustible con id ${id}:`, error)
      throw error
    }
  }
}

export default new FuelService()
