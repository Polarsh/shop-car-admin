import { httpHelper } from '../../../../services/httpHelper'

class AccessoryService {
  constructor() {
    this.endpoint = '/accessories'
  }

  async getAllAccessories() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener accesorios:', error)
      throw error
    }
  }

  async getAccessoryById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener accesorio con id ${id}:`, error)
      throw error
    }
  }

  async createAccessory({ accessoryData }) {
    try {
      return await httpHelper.post(this.endpoint, accessoryData)
    } catch (error) {
      console.error('Error al crear accesorio:', error)
      throw error
    }
  }

  async updateAccessory({ id, accessoryData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, accessoryData)
    } catch (error) {
      console.error(`Error al actualizar accesorio con id ${id}:`, error)
      throw error
    }
  }
}

export default new AccessoryService()
