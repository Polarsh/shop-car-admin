import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../logs/hooks/useLog'

import AccessoryService from '../services/AccesoryFirebase'

import { exportToExcel } from '../../../../utils/excel'

const useAccessory = () => {
  const [accessoryList, setAccessoryList] = useState([])
  const [accessory, setAccessory] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllAccessories = async () => {
    setIsLoading(true)
    try {
      const data = await AccessoryService.getAllAccessories()
      setAccessoryList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de accesorios')
    } finally {
      setIsLoading(false)
    }
  }

  const getAccessoryById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await AccessoryService.getAccessoryById({ id })
      setAccessory(data)
      setError(null)
    } catch (error) {
      setError(error)
      setAccessory(null)
      toast.error('Error al obtener el accesorio')
    } finally {
      setIsLoading(false)
    }
  }

  const createAccessory = async ({ accessoryData }) => {
    accessoryData.createdAt = Date.now()
    accessoryData.updatedAt = Date.now()
    accessoryData.status = 'active'

    setIsLoading(true)
    try {
      await AccessoryService.createAccessory({ accessoryData })
      await createLog({
        description: 'Se creó un nuevo accesorio',
        previousData: null,
        newData: accessoryData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Accesorio creado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear el accesorio')
      await createLog({
        description: 'Error al crear accesorio',
        previousData: null,
        newData: accessoryData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateAccessory = async ({
    previousAccessoryData,
    newAccessoryData,
  }) => {
    newAccessoryData.updatedAt = Date.now()

    setIsLoading(true)
    try {
      await AccessoryService.updateAccessory({
        id: newAccessoryData.id,
        accessoryData: newAccessoryData,
      })
      await createLog({
        description: `Se actualizó el accesorio con id ${newAccessoryData.id}`,
        previousData: previousAccessoryData,
        newData: newAccessoryData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Accesorio actualizado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar el accesorio')
      await createLog({
        description: `Error al actualizar el accesorio con id ${newAccessoryData.id}`,
        previousData: previousAccessoryData,
        newData: newAccessoryData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAccessory = async ({ accessoryData }) => {
    setIsLoading(true)

    const newAccessoryData = {
      ...accessoryData,
      status: 'deleted',
    }

    try {
      await AccessoryService.updateAccessory({
        id: newAccessoryData.id,
        accessoryData: newAccessoryData,
      })
      await createLog({
        description: `Se eliminó el accesorio con id ${newAccessoryData.id}`,
        previousData: accessoryData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Accesorio eliminado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar el accesorio')
      await createLog({
        description: `Error al eliminar el accesorio con id ${newAccessoryData.id}`,
        previousData: accessoryData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.DELETE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = async json => {
    try {
      const transformedData = json.map(row => ({
        Nombre: `${row.name}`,
        Descripción: `${row.description}`,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Accesorios')

      await createLog({
        description: `Se exportó la lista de accesorios`,
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
        description: `Error al exportar la lista de accesorios`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    accessoryList,
    accessory,
    error,
    isLoading,
    getAllAccessories,
    getAccessoryById,
    createAccessory,
    updateAccessory,
    deleteAccessory,
    downloadExcel,
  }
}

export default useAccessory
