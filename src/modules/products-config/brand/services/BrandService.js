import { httpHelper } from '../../../../services/httpHelper'

class BrandService {
  constructor() {
    this.endpoint = '/brands'
  }

  async getAllBrands() {
    try {
      return await httpHelper.get(this.endpoint)
    } catch (error) {
      console.error('Error al obtener marcas:', error)
      throw error
    }
  }

  async getBrandById({ id }) {
    try {
      return await httpHelper.get(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al obtener la marca con id ${id}:`, error)
      throw error
    }
  }

  async createBrand({ brandData }) {
    try {
      return await httpHelper.post(this.endpoint, brandData)
    } catch (error) {
      console.error('Error al crear la marca:', error)
      throw error
    }
  }

  async updateBrand({ id, brandData }) {
    try {
      return await httpHelper.put(`${this.endpoint}/${id}`, brandData)
    } catch (error) {
      console.error(`Error al actualizar la marca con id ${id}:`, error)
      throw error
    }
  }

  async deleteBrand({ id }) {
    try {
      return await httpHelper.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      console.error(`Error al eliminar la marca con id ${id}:`, error)
      throw error
    }
  }
}

export default new BrandService()
