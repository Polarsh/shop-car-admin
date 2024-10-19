import { useState } from 'react'
import { toast } from 'sonner'
import useLog, { LogHelper } from '../../../logs/hooks/useLog'
import AdminService from '../services/AdminFirebase'
import { exportToExcel } from '../../../../utils/excel'

const useAdministrator = () => {
  const [administratorList, setAdministratorList] = useState([])
  const [administrator, setAdministrator] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { createLog } = useLog()

  const getAllAdministrators = async () => {
    setIsLoading(true)
    try {
      const items = await AdminService.getAllAdministrators()
      const activeData = items.filter(item => item.status !== 'deleted')
      setAdministratorList(activeData)
      setError(null)
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const getAdministratorById = async ({ id }) => {
    setIsLoading(true)
    try {
      const item = await AdminService.getAdministratorById({ id })
      if (item.status !== 'deleted') {
        setAdministrator(item)
        setError(null)
      } else {
        setAdministrator(null)
        setError('El administrador está eliminado')
        toast.error('El administrador está eliminado')
      }
    } catch (error) {
      setError(error.message)
      setAdministrator(null)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const createAdministrator = async ({ adminData }) => {
    adminData.createdAt = Date.now()
    adminData.updatedAt = Date.now()
    adminData.status = 'active'

    setIsLoading(true)
    try {
      await AdminService.createAdministrator({ adminData })
      await createLog({
        description: 'Se creó un nuevo administrador',
        previousData: null,
        newData: adminData,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.CREATE,
      })
      setError(null)
      toast.success('Administrador creado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      await createLog({
        description: 'Error al crear administrador',
        previousData: null,
        newData: adminData,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.CREATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const updateAdministrator = async ({ previousAdminData, newAdminData }) => {
    newAdminData.updatedAt = Date.now()
    if (!newAdminData.status) {
      newAdminData.status = previousAdminData.status
    }

    setIsLoading(true)
    try {
      await AdminService.updateAdministrator({
        id: newAdminData.id,
        adminData: newAdminData,
      })
      await createLog({
        description: `Se actualizó el administrador con id ${newAdminData.id}`,
        previousData: previousAdminData,
        newData: newAdminData,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.UPDATE,
      })
      setError(null)
      toast.success('Administrador actualizado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      await createLog({
        description: `Error al actualizar el administrador con id ${newAdminData.id}`,
        previousData: previousAdminData,
        newData: newAdminData,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.UPDATE,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const deleteAdministrator = async ({ adminData }) => {
    const newAdminData = {
      ...adminData,
      status: 'deleted',
    }

    setIsLoading(true)
    try {
      await AdminService.updateAdministrator({
        id: adminData.id,
        adminData: newAdminData,
      })
      await createLog({
        description: `Se eliminó el administrador con id ${adminData.id}`,
        previousData: adminData,
        newData: null,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.DELETE,
      })
      setError(null)
      toast.success('Administrador eliminado exitosamente')
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      await createLog({
        description: `Error al eliminar el administrador con id ${adminData.id}`,
        previousData: adminData,
        newData: null,
        module: LogHelper.module.USERS,
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
        Nombre: `${row.firstName} ${row.lastName}`,
        Email: row.email,
        DNI: row.dni,
        Teléfono: row.phone,
        'Fecha de Creación': new Date(parseInt(row.createdAt)).toLocaleString(),
        'Última Actualización': new Date(
          parseInt(row.updatedAt)
        ).toLocaleString(),
      }))

      exportToExcel(transformedData, 'Administradores')

      await createLog({
        description: `Se exportó la lista de administradores`,
        previousData: null,
        newData: null,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.INFO,
        eventType: LogHelper.eventType.EXPORT,
      })
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
      await createLog({
        description: `Error al exportar la lista de Administradores`,
        previousData: null,
        newData: null,
        module: LogHelper.module.USERS,
        logLevel: LogHelper.logLevel.ERROR,
        eventType: LogHelper.eventType.EXPORT,
      })
    }
  }

  return {
    administratorList,
    administrator,
    error,
    isLoading,
    getAllAdministrators,
    getAdministratorById,
    createAdministrator,
    updateAdministrator,
    deleteAdministrator,
    downloadExcel,
  }
}

export default useAdministrator
