import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../../logs/hooks/useLog'

import DriveTrainService from '../services/DriveTrainFirebase'

import { exportToExcel } from '../../../../../utils/excel'

const useDriveTrain = () => {
  const [driveTrainList, setDriveTrainList] = useState([])
  const [driveTrain, setDriveTrain] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllDriveTrains = async () => {
    setIsLoading(true)
    try {
      const data = await DriveTrainService.getAllDriveTrains()
      setDriveTrainList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de sistemas de tracción')
    } finally {
      setIsLoading(false)
    }
  }

  const getDriveTrainById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await DriveTrainService.getDriveTrainById({ id })
      setDriveTrain(data)
      setError(null)
    } catch (error) {
      setError(error)
      setDriveTrain(null)
      toast.error('Error al obtener el sistema de tracción')
    } finally {
      setIsLoading(false)
    }
  }

  const createDriveTrain = async ({ driveTrainData }) => {
    setIsLoading(true)

    driveTrainData.createdAt = Date.now()
    driveTrainData.updatedAt = Date.now()
    driveTrainData.status = 'active'

    try {
      await DriveTrainService.createDriveTrain({ driveTrainData })
      await createLog({
        description: 'Se creó un nuevo sistema de tracción',
        previousData: null,
        newData: driveTrainData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Sistema de tracción creado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear el sistema de tracción')
      await createLog({
        description: 'Error al crear sistema de tracción',
        previousData: null,
        newData: driveTrainData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateDriveTrain = async ({
    previousDriveTrainData,
    newDriveTrainData,
  }) => {
    newDriveTrainData.updatedAt = Date.now()

    setIsLoading(true)

    try {
      await DriveTrainService.updateDriveTrain({
        id: newDriveTrainData.id,
        driveTrainData: newDriveTrainData,
      })
      await createLog({
        description: `Se actualizó el sistema de tracción con id ${newDriveTrainData.id}`,
        previousData: previousDriveTrainData,
        newData: newDriveTrainData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Sistema de tracción actualizado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar el sistema de tracción')
      await createLog({
        description: `Error al actualizar el sistema de tracción con id ${newDriveTrainData.id}`,
        previousData: previousDriveTrainData,
        newData: newDriveTrainData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDriveTrain = async ({ driveTrainData }) => {
    setIsLoading(true)

    const newDriveTrainData = {
      ...driveTrainData,
      status: 'deleted',
    }

    try {
      await DriveTrainService.updateDriveTrain({
        id: driveTrainData.id,
        driveTrainData: newDriveTrainData,
      })
      await createLog({
        description: `Se eliminó el sistema de tracción con id ${driveTrainData.id}`,
        previousData: driveTrainData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Sistema de tracción eliminado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar el sistema de tracción')
      await createLog({
        description: `Error al eliminar el sistema de tracción con id ${driveTrainData.id}`,
        previousData: driveTrainData,
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
        Abreviación: `${row.abbreviation}`,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Sistemas de Tracción')

      await createLog({
        description: `Se exportó la lista de sistemas de tracción`,
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
        description: `Error al exportar la lista de sistemas de tracción`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    driveTrainList,
    driveTrain,
    error,
    isLoading,
    getAllDriveTrains,
    getDriveTrainById,
    createDriveTrain,
    updateDriveTrain,
    deleteDriveTrain,
    downloadExcel,
  }
}

export default useDriveTrain
