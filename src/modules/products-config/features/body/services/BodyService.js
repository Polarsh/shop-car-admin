import { httpHelper } from '../../../../../services/httpHelper'

class BodyService {
  constructor() {
    this.endpoint = '/bodies'
  }

  async getAllBodies() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener carrocerías:', error)
      throw error
    }
  }

  async getBodyById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener carrocería con id ${id}:`, error)
      throw error
    }
  }

  async createBody({ bodyData }) {
    try {
      return await httpHelper.post(this.endpoint, bodyData)
    } catch (error) {
      console.error('Error al crear carrocería:', error)
      throw error
    }
  }

  async updateBody({ id, bodyData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, bodyData)
    } catch (error) {
      console.error(`Error al actualizar carrocería con id ${id}:`, error)
      throw error
    }
  }

  async deleteBody({ id }) {
    try {
      return await httpHelper.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al eliminar carrocería con id ${id}:`, error)
      throw error
    }
  }
}

export default new BodyService()
