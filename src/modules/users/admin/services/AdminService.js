/* eslint-disable space-before-function-paren */
// src/services/AdminService.js
import { httpHelper } from '../../../../services/httpHelper'

class AdminService {
  constructor() {
    this.endpoint = '/administrators'
  }

  async getAllAdministrators() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener administradores:', error)
      throw error
    }
  }

  async getAdministratorById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener administrador con id ${id}:`, error)
      throw error
    }
  }

  async createAdministrator({ adminData }) {
    try {
      return await httpHelper.post(this.endpoint, adminData)
    } catch (error) {
      console.error('Error al crear administrador:', error)
      throw error
    }
  }

  async updateAdministrator({ id, adminData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, adminData)
    } catch (error) {
      console.error(`Error al actualizar administrador con id ${id}:`, error)
      throw error
    }
  }
}

export default new AdminService()
