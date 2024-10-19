import { httpHelper } from '../../../../../services/httpHelper'

class TransmissionService {
  constructor() {
    this.endpoint = '/transmissions'
  }

  async getAllTransmissions() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener transmisiones:', error)
      throw error
    }
  }

  async getTransmissionById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener transmisión con id ${id}:`, error)
      throw error
    }
  }

  async createTransmission({ transmissionData }) {
    try {
      return await httpHelper.post(this.endpoint, transmissionData)
    } catch (error) {
      console.error('Error al crear transmisión:', error)
      throw error
    }
  }

  async updateTransmission({ id, transmissionData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, transmissionData)
    } catch (error) {
      console.error(`Error al actualizar transmisión con id ${id}:`, error)
      throw error
    }
  }

  async deleteTransmission({ id }) {
    try {
      return await httpHelper.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al eliminar transmisión con id ${id}:`, error)
      throw error
    }
  }
}

export default new TransmissionService()
