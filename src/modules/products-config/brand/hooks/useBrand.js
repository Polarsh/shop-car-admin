import { useState } from 'react'
import { toast } from 'sonner'

import BrandService from '../services/BrandFirebase'
import { exportToExcel } from '../../../../utils/excel'
import useLog, { LogHelper } from '../../../logs/hooks/useLog'
import { uploadImagesAndGetURLs } from '../../../../utils/uploadImages'

const useBrand = () => {
  const [brandList, setBrandList] = useState([])
  const [brand, setBrand] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllBrands = async () => {
    setIsLoading(true)
    try {
      const items = await BrandService.getAllBrands()
      const activeData = items.filter(item => item.status !== 'deleted')
      setBrandList(activeData)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de marcas')
    } finally {
      setIsLoading(false)
    }
  }

  const getBrandById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await BrandService.getBrandById({ id })
      if (item.status !== 'deleted') {
        setBrand(item)
        setError(null)
      } else {
        setBrand(null)
        setError('La marca está eliminada')
        toast.error('La marca está eliminada')
      }
    } catch (error) {
      setError(error)
      setBrand(null)
      toast.error('Error al obtener la marca')
    } finally {
      setIsLoading(false)
    }
  }

  const createBrand = async ({ brandData }) => {
    brandData.createdAt = Date.now()
    brandData.updatedAt = Date.now()
    brandData.status = 'active'

    setIsLoading(true)
    try {
      const imageUrls = await uploadImagesAndGetURLs({
        images: brandData.image,
        folder: 'car-shop/brandLogos',
      })
      brandData.image = imageUrls[0]

      await BrandService.createBrand({ brandData })
      await createLog({
        description: 'Se creó un nuevo marca',
        previousData: null,
        newData: brandData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Marca creada exitosamente')
    } catch (error) {
      await createLog({
        description: 'Error al crear la marca',
        previousData: null,
        newData: brandData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(error)
      toast.error('Error al crear la marca')
    } finally {
      setIsLoading(false)
    }
  }

  const updateBrand = async ({ previousBrandData, newBrandData }) => {
    newBrandData.updatedAt = Date.now()

    setIsLoading(true)

    try {
      const imageUrls = await uploadImagesAndGetURLs({
        images: newBrandData.image,
        folder: 'car-shop/brandLogos',
      })
      newBrandData.image = imageUrls[0]

      await BrandService.updateBrand({
        id: newBrandData.id,
        brandData: newBrandData,
      })
      await createLog({
        description: `Se actualizó la marca con id ${newBrandData.id}`,
        previousData: previousBrandData,
        newData: newBrandData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Marca actualizada exitosamente')
    } catch (error) {
      await createLog({
        description: `Error al actualizar la marca con id ${newBrandData.id}`,
        previousData: previousBrandData,
        newData: newBrandData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(error)
      toast.error('Error al actualizar la marca')
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBrand = async ({ brandData }) => {
    const newBrandData = {
      ...brandData,
      status: 'deleted',
    }

    setIsLoading(true)
    try {
      await BrandService.updateBrand({
        id: brandData.id,
        brandData: newBrandData,
      })
      await createLog({
        description: `Se eliminó la marca con id ${brandData.id}`,
        previousData: brandData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Marca eliminada exitosamente')
    } catch (error) {
      await createLog({
        description: `Error al eliminar la marca con id ${brandData.id}`,
        previousData: brandData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(error)
      toast.error('Error al eliminar la marca')
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = async json => {
    try {
      const transformedData = json.map(row => ({
        Nombre: row.name,
        Logo: row.urlImage,
        Modelos: row.models.map(model => model.name).join(', '),
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Marcas')

      await createLog({
        description: `Se exportó la lista de marcas`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.EXPORT,
      })
    } catch (error) {
      setError(error)
      toast.error('Error al exportar')
      await createLog({
        description: `Error al exportar la lista de marcas`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    brandList,
    brand,
    error,
    isLoading,
    getAllBrands,
    getBrandById,
    createBrand,
    updateBrand,
    deleteBrand,
    downloadExcel,
  }
}

export default useBrand
