import { useState } from 'react'
import { toast } from 'sonner'

import useLog, { LogHelper } from '../../logs/hooks/useLog'
import { useAuth } from '../../../context/AuthProvider'

import CarService from '../services/CarFirebase'

import { uploadImagesAndGetURLs } from '../../../utils/uploadImages'
import { exportToExcel } from '../../../utils/excel'

const useCar = () => {
  const [carList, setCarList] = useState([])
  const [car, setCar] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()
  const { currentUser } = useAuth()

  const getAllCars = async () => {
    setIsLoading(true)
    try {
      const data = await CarService.getAllCars()
      const activeCars = data.filter(car => car.status !== 'deleted')
      setCarList(activeCars)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de autos')
    } finally {
      setIsLoading(false)
    }
  }

  const getCarById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await CarService.getCarById({ id })
      if (data.status !== 'deleted') {
        setCar(data)
        setError(null)
      } else {
        setCar(null)
        setError('El auto está eliminado')
        toast.error('El auto está eliminado')
      }
    } catch (error) {
      setError(error)
      setCar(null)
      toast.error('Error al obtener el auto')
    } finally {
      setIsLoading(false)
    }
  }

  const createCar = async ({ carData }) => {
    setIsLoading(true)

    carData.createdAt = Date.now()
    carData.createdBy = currentUser.email
    carData.updatedAt = Date.now()
    carData.updatedBy = currentUser.email
    carData.status = 'active'

    try {
      const imageUrls = await uploadImagesAndGetURLs({
        images: carData.images,
        folder: 'car-shop/carImages',
      })
      const newCarData = { ...carData, images: imageUrls }

      console.log({ newCarData })

      await CarService.createCar({ carData: newCarData })
      await createLog({
        description: 'Se creó un nuevo auto',
        previousData: null,
        newData: carData,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Auto creado exitosamente')
    } catch (error) {
      setError(error)
      console.log(error)
      toast.error('Error al crear el auto')
      await createLog({
        description: 'Error al crear auto',
        previousData: null,
        newData: carData,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateCar = async ({ previousCarData, newCarData }) => {
    setIsLoading(true)

    newCarData.updatedAt = Date.now()
    newCarData.updatedBy = currentUser.email

    try {
      const imageUrls = await uploadImagesAndGetURLs({
        images: newCarData.images,
        folder: 'car-shop/carImages',
      })
      const updatedCarData = { ...newCarData, images: imageUrls }

      await CarService.updateCar({ id: newCarData.id, carData: updatedCarData })

      await createLog({
        description: `Se actualizó el auto con id ${newCarData.id}`,
        previousData: previousCarData,
        newData: newCarData,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Auto actualizado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al actualizar el auto')
      await createLog({
        description: `Error al actualizar el auto con id ${newCarData.id}`,
        previousData: previousCarData,
        newData: newCarData,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteCar = async ({ carData }) => {
    const newCarData = {
      ...carData,
      status: 'deleted',
    }

    setIsLoading(true)
    try {
      await CarService.updateCar({ id: carData.id, carData: newCarData })
      await createLog({
        description: `Se eliminó el auto con id ${carData.id}`,
        previousData: carData,
        newData: null,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Auto eliminado exitosamente')
    } catch (error) {
      setError(error)
      toast.error('Error al eliminar el auto')
      await createLog({
        description: `Error al eliminar el auto con id ${carData.id}`,
        previousData: carData,
        newData: null,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.DELETE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = async json => {
    try {
      const transformedData = json.map(car => ({
        Marca: car.carDetails.brand.label,
        Modelo: car.carDetails.model.label,
        Carrocería: car.carDetails.model.value,
        Año: car.carDetails.year.value,
        Color: car.carDetails.color,
        Kilometraje: `${car.carDetails.mileage.toLocaleString('en-US')} km`,
        Combustible: car.carDetails.fuel.map(fuel => fuel.label).join(' | '),
        Cilindrada: car.carDetails.displacement.label,
        Transmisión: car.carDetails.transmission.label,
        Tracción: car.carDetails.drivetrain.label,
        Accesorios: car.accessories
          .map(accessory => `${accessory.name}`)
          .join(' | '),
        Imágenes: car.images.join(' | '),
        Notas: car.notes.join(' | '),
        'Fecha de Creación': new Date(parseInt(car.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(car.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Autos')

      await createLog({
        description: `Se exportó la lista de autos`,
        previousData: null,
        newData: null,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.EXPORT,
      })
    } catch (error) {
      setError(error)
      toast.error('Error al exportar')
      await createLog({
        description: `Error al exportar la lista de autos`,
        previousData: null,
        newData: null,
        module: LogHelper.module.CARS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    carList,
    car,
    error,
    isLoading,
    getAllCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    downloadExcel,
  }
}

export default useCar
