import { httpHelper } from '../../../../../services/httpHelper'

class DisplacementService {
  constructor() {
    this.endpoint = '/displacements'
  }

  async getAllDisplacements() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener cilindradas:', error)
      throw error
    }
  }

  async getDisplacementById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener cilindrada con id ${id}:`, error)
      throw error
    }
  }

  async createDisplacement({ displacementData }) {
    try {
      return await httpHelper.post(this.endpoint, displacementData)
    } catch (error) {
      console.error('Error al crear cilindrada:', error)
      throw error
    }
  }

  async updateDisplacement({ id, displacementData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, displacementData)
    } catch (error) {
      console.error(`Error al actualizar cilindrada con id ${id}:`, error)
      throw error
    }
  }
}

export default new DisplacementService()
