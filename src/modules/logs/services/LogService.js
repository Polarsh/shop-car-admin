import { httpHelper } from '../../../services/httpHelper'

class LogService {
  constructor() {
    this.endpoint = '/logs'
  }

  async getAllLogs() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener logs:', error)
      throw error
    }
  }

  async getLogById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener log con id ${id}:`, error)
      throw error
    }
  }

  async createLog({ logData }) {
    try {
      return await httpHelper.post(this.endpoint, logData)
    } catch (error) {
      console.error('Error al crear log:', error)
      throw error
    }
  }
}

export default new LogService()
