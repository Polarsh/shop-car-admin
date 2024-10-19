import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../../../logs/hooks/useLog'

import FuelService from '../services/FuelFirebase'

import { exportToExcel } from '../../../../../utils/excel'

const useFuel = () => {
  const [fuelList, setFuelList] = useState([])
  const [fuel, setFuel] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllFuels = async () => {
    setIsLoading(true)
    try {
      const data = await FuelService.getAllFuels()
      setFuelList(data)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de combustibles')
    } finally {
      setIsLoading(false)
    }
  }

  const getFuelById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await FuelService.getFuelById({ id })
      setFuel(data)
      setError(null)
    } catch (error) {
      setError(error)
      setFuel(null)
      toast.error('Error al obtener el combustible')
    } finally {
      setIsLoading(false)
    }
  }

  const createFuel = async ({ fuelData }) => {
    setIsLoading(true)

    fuelData.createdAt = Date.now()
    fuelData.updatedAt = Date.now()
    fuelData.status = 'active'

    try {
      await FuelService.createFuel({ fuelData })
      await createLog({
        description: 'Se creó un nuevo combustible',
        previousData: null,
        newData: fuelData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Combustible creado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al crear el combustible')
      await createLog({
        description: 'Error al crear combustible',
        previousData: null,
        newData: fuelData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateFuel = async ({ previousFuelData, newFuelData }) => {
    setIsLoading(true)

    newFuelData.updatedAt = Date.now()

    try {
      await FuelService.updateFuel({
        id: newFuelData.id,
        fuelData: newFuelData,
      })
      await createLog({
        description: `Se actualizó el combustible con id ${newFuelData.id}`,
        previousData: previousFuelData,
        newData: newFuelData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Combustible actualizado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar el combustible')
      await createLog({
        description: `Error al actualizar el combustible con id ${newFuelData.id}`,
        previousData: previousFuelData,
        newData: newFuelData,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteFuel = async ({ fuelData }) => {
    setIsLoading(true)

    const newFuelData = {
      ...fuelData,
      status: 'deleted',
    }

    try {
      await FuelService.updateFuel({ id: fuelData.id, fuelData: newFuelData })
      await createLog({
        description: `Se eliminó el combustible con id ${fuelData.id}`,
        previousData: fuelData,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Combustible eliminado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar el combustible')
      await createLog({
        description: `Error al eliminar el combustible con id ${fuelData.id}`,
        previousData: fuelData,
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
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Combustibles')

      await createLog({
        description: `Se exportó la lista de combustibles`,
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
        description: `Error al exportar la lista de combustibles`,
        previousData: null,
        newData: null,
        module: LogHelper.module.PRODUCTS_CONFIG,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    fuelList,
    fuel,
    error,
    isLoading,
    getAllFuels,
    getFuelById,
    createFuel,
    updateFuel,
    deleteFuel,
    downloadExcel,
  }
}

export default useFuel
