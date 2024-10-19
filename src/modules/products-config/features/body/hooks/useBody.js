import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../../logs/hooks/useLog'

import BodyService from '../services/BodyFirebase'

import { exportToExcel } from '../../../../../utils/excel'

const useBody = () => {
  const [bodyList, setBodyList] = useState([])
  const [body, setBody] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllBodies = async () => {
    setIsLoading(true)
    try {
      const data = await BodyService.getAllBodies()
      setBodyList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de carrocerías')
    } finally {
      setIsLoading(false)
    }
  }

  const getBodyById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await BodyService.getBodyById({ id })
      if (item.status !== 'deleted') {
        setBody(item)
        setError(null)
      } else {
        setBody(null)
        setError('La carrocería está eliminada')
        toast.error('La carrocería está eliminada')
      }
    } catch (error) {
      setError(error)
      setBody(null)
      toast.error('Error al obtener la carrocería')
    } finally {
      setIsLoading(false)
    }
  }

  const createBody = async ({ bodyData }) => {
    bodyData.createdAt = Date.now()
    bodyData.updatedAt = Date.now()
    bodyData.status = 'active'

    setIsLoading(true)
    try {
      await BodyService.createBody({ bodyData })
      await createLog({
        description: 'Se creó una nueva carrocería',
        previousData: null,
        newData: bodyData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Carrocería creada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear la carrocería')
      await createLog({
        description: 'Error al crear carrocería',
        previousData: null,
        newData: bodyData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateBody = async ({ previousBodyData, newBodyData }) => {
    newBodyData.updatedAt = Date.now()

    setIsLoading(true)
    try {
      await BodyService.updateBody({
        id: newBodyData.id,
        bodyData: newBodyData,
      })
      await createLog({
        description: `Se actualizó la carrocería con id ${newBodyData.id}`,
        previousData: previousBodyData,
        newData: newBodyData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Carrocería actualizada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar la carrocería')
      await createLog({
        description: `Error al actualizar la carrocería con id ${newBodyData.id}`,
        previousData: previousBodyData,
        newData: newBodyData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteBody = async ({ bodyData }) => {
    const newBodyData = {
      ...bodyData,
      status: 'deleted',
    }

    setIsLoading(true)
    try {
      await BodyService.updateBody({ id: bodyData.id, bodyData: newBodyData })
      await createLog({
        description: `Se eliminó la carrocería con id ${bodyData.id}`,
        previousData: bodyData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Carrocería eliminada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar la carrocería')
      await createLog({
        description: `Error al eliminar la carrocería con id ${bodyData.id}`,
        previousData: bodyData,
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
        Tipo: `${row.name}`,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Carrocerías')

      await createLog({
        description: `Se exportó la lista de carrocerías`,
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
        description: `Error al exportar la lista de carrocerías`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    bodyList,
    body,
    error,
    isLoading,
    getAllBodies,
    getBodyById,
    createBody,
    updateBody,
    deleteBody,
    downloadExcel,
  }
}

export default useBody
