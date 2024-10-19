import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../../logs/hooks/useLog'

import TransmissionService from '../services/TransmissionFirebase'

import { exportToExcel } from '../../../../../utils/excel'

const useTransmission = () => {
  const [transmissionList, setTransmissionList] = useState([])
  const [transmission, setTransmission] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllTransmissions = async () => {
    setIsLoading(true)
    try {
      const data = await TransmissionService.getAllTransmissions()
      setTransmissionList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de transmisiones')
    } finally {
      setIsLoading(false)
    }
  }

  const getTransmissionById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await TransmissionService.getTransmissionById({ id })
      setTransmission(data)
      setError(null)
    } catch (error) {
      setError(error)
      setTransmission(null)
      toast.error('Error al obtener la transmisión')
    } finally {
      setIsLoading(false)
    }
  }

  const createTransmission = async ({ transmissionData }) => {
    transmissionData.createdAt = Date.now()
    transmissionData.updatedAt = Date.now()
    transmissionData.status = 'active'

    setIsLoading(true)
    try {
      await TransmissionService.createTransmission({ transmissionData })
      await createLog({
        description: 'Se creó una nueva transmisión',
        previousData: null,
        newData: transmissionData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Transmisión creada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear la transmisión')
      await createLog({
        description: 'Error al crear transmisión',
        previousData: null,
        newData: transmissionData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateTransmission = async ({
    previousTransmissionData,
    newTransmissionData,
  }) => {
    setIsLoading(true)

    newTransmissionData.updatedAt = Date.now()

    try {
      await TransmissionService.updateTransmission({
        id: newTransmissionData.id,
        transmissionData: newTransmissionData,
      })
      await createLog({
        description: `Se actualizó la transmisión con id ${newTransmissionData.id}`,
        previousData: previousTransmissionData,
        newData: newTransmissionData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Transmisión actualizada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar la transmisión')
      await createLog({
        description: `Error al actualizar la transmisión con id ${newTransmissionData.id}`,
        previousData: previousTransmissionData,
        newData: newTransmissionData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteTransmission = async ({ transmissionData }) => {
    setIsLoading(true)

    const newTransmissionData = {
      ...transmissionData,
      status: 'deleted',
    }

    try {
      await TransmissionService.updateTransmission({
        id: transmissionData.id,
        transmissionData: newTransmissionData,
      })
      await createLog({
        description: `Se eliminó la transmisión con id ${transmissionData.id}`,
        previousData: transmissionData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Transmisión eliminada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar la transmisión')
      await createLog({
        description: `Error al eliminar la transmisión con id ${transmissionData.id}`,
        previousData: transmissionData,
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
        Nombre: row.name,
        Abreviación: row.abbreviation,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Transmisiones')

      await createLog({
        description: `Se exportó la lista de transmisiones`,
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
        description: `Error al exportar la lista de transmisiones`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    transmissionList,
    transmission,
    error,
    isLoading,
    getAllTransmissions,
    getTransmissionById,
    createTransmission,
    updateTransmission,
    deleteTransmission,
    downloadExcel,
  }
}

export default useTransmission
