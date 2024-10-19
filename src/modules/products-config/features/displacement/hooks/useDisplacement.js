import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../../logs/hooks/useLog'

import DisplacementService from '../services/DisplacementFirebase'

import { exportToExcel } from '../../../../../utils/excel'

const useDisplacement = () => {
  const [displacementList, setDisplacementList] = useState([])
  const [displacement, setDisplacement] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllDisplacements = async () => {
    setIsLoading(true)
    try {
      const data = await DisplacementService.getAllDisplacements()
      setDisplacementList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de cilindradas')
    } finally {
      setIsLoading(false)
    }
  }

  const getDisplacementById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await DisplacementService.getDisplacementById({ id })
      setDisplacement(data)
      setError(null)
    } catch (error) {
      setError(error)
      setDisplacement(null)
      toast.error('Error al obtener la cilindrada')
    } finally {
      setIsLoading(false)
    }
  }

  const createDisplacement = async ({ displacementData }) => {
    setIsLoading(true)

    displacementData.createdAt = Date.now()
    displacementData.updatedAt = Date.now()
    displacementData.status = 'active'

    try {
      await DisplacementService.createDisplacement({ displacementData })
      await createLog({
        description: 'Se creó una nueva cilindrada',
        previousData: null,
        newData: displacementData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Cilindrada creada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear la cilindrada')
      await createLog({
        description: 'Error al crear cilindrada',
        previousData: null,
        newData: displacementData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateDisplacement = async ({
    previousDisplacementData,
    newDisplacementData,
  }) => {
    newDisplacementData.updatedAt = Date.now()

    setIsLoading(true)

    try {
      await DisplacementService.updateDisplacement({
        id: newDisplacementData.id,
        displacementData: newDisplacementData,
      })
      await createLog({
        description: `Se actualizó la cilindrada con id ${newDisplacementData.id}`,
        previousData: previousDisplacementData,
        newData: newDisplacementData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Cilindrada actualizada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar la cilindrada')
      await createLog({
        description: `Error al actualizar la cilindrada con id ${newDisplacementData.id}`,
        previousData: previousDisplacementData,
        newData: newDisplacementData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteDisplacement = async ({ displacementData }) => {
    setIsLoading(true)

    const newDisplacementData = {
      ...displacementData,
      status: 'deleted',
    }

    try {
      await DisplacementService.updateDisplacement({
        id: displacementData.id,
        displacementData: newDisplacementData,
      })
      await createLog({
        description: `Se eliminó la cilindrada con id ${displacementData.id}`,
        previousData: displacementData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Cilindrada eliminada exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar la cilindrada')
      await createLog({
        description: `Error al eliminar la cilindrada con id ${displacementData.id}`,
        previousData: displacementData,
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

      exportToExcel(transformedData, 'Cilindradas')

      await createLog({
        description: `Se exportó la lista de cilindradas`,
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
        description: `Error al exportar la lista de cilindradas`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    displacementList,
    displacement,
    error,
    isLoading,
    getAllDisplacements,
    getDisplacementById,
    createDisplacement,
    updateDisplacement,
    deleteDisplacement,
    downloadExcel,
  }
}

export default useDisplacement
