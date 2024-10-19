import { httpHelper } from '../../../../../services/httpHelper'

class DriveTrainService {
  constructor() {
    this.endpoint = '/drivetrains'
  }

  async getAllDriveTrains() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener sistemas de tracción:', error)
      throw error
    }
  }

  async getDriveTrainById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener sistema de tracción con id ${id}:`, error)
      throw error
    }
  }

  async createDriveTrain({ driveTrainData }) {
    try {
      return await httpHelper.post(this.endpoint, driveTrainData)
    } catch (error) {
      console.error('Error al crear sistema de tracción:', error)
      throw error
    }
  }

  async updateDriveTrain({ id, driveTrainData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, driveTrainData)
    } catch (error) {
      console.error(
        `Error al actualizar sistema de tracción con id ${id}:`,
        error
      )
      throw error
    }
  }

  async deleteDriveTrain({ id }) {
    try {
      return await httpHelper.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(
        `Error al eliminar sistema de tracción con id ${id}:`,
        error
      )
      throw error
    }
  }
}

export default new DriveTrainService()
