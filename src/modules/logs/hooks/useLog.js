import { useState } from 'react'
import LogService from '../services/LogService'
import { toast } from 'sonner'
import { exportToExcel } from '../../../utils/excel'

export const LogHelper = {
  module: {
    USERS: 'USERS',
    CARS: 'CARS',
    PRODUCTS_CONFIG: 'PRODUCTS_CONFIG',
    FEATURES: 'FEATURES',
  },
  logLevel: {
    INFO: 'INFO',
    WARN: 'WARN',
    ERROR: 'ERROR',
  },
  eventType: {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    EXPORT: 'EXPORT',
  },
}

/*
 ! @param {string} userId - The ID of the user who triggered the log entry.
 ! @param {string} userEmail - The email of the user who triggered the log entry.
 * @param {string} description - A description of the log entry.
 * @param {Object} previousData - The previous data before the change.
 * @param {Object} newData - The new data after the change.
 * @param {string} module - ['FEATURES', 'PRODUCTS_CONFIG', 'USERS'].
 * @param {string} logLevel - ['info', 'warn', 'error']
 * @param {string} eventType - ['CREATE', 'UPDATE', 'DELETE']
 ! @param {Date} timestamp - The timestamp when the log entry was created.
 */

const useLog = () => {
  const [logList, setLogList] = useState([])
  const [log, setLog] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getAllLogs = async () => {
    setIsLoading(true)
    try {
      const data = await LogService.getAllLogs()
      const sortedData = data.sort((a, b) => b.timestamp - a.timestamp)
      setLogList(sortedData)
      setError(null)
    } catch (error) {
      setError(error)
      toast.error('Error al obtener la lista de registros')
    } finally {
      setIsLoading(false)
    }
  }

  const getLogById = async ({ id }) => {
    setIsLoading(true)
    try {
      const data = await LogService.getLogById({ id })
      setLog(data)
      setError(null)
    } catch (error) {
      setError(error)
      setLog(null)
      toast.error('Error al obtener el registro')
    } finally {
      setIsLoading(false)
    }
  }

  const createLog = async ({
    description,
    previousData,
    newData,
    module,
    logLevel,
    eventType,
  }) => {
    const logData = {
      userId: '0000',
      userEmail: '@gmail.com',
      description,
      previousData,
      newData,
      module,
      logLevel,
      eventType,
      timestamp: Date.now(),
    }
    setIsLoading(true)
    try {
      await LogService.createLog({ logData })
      setError(null)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadExcel = json => {
    const transformedData = json.map(row => ({
      Responsable: row.userEmail,
      Descripción: row.description,
      'Datos anteriores': row.previousData
        ? JSON.stringify(row.previousData, null, 2)
        : 'N/A',
      'Datos nuevos': row.newData
        ? JSON.stringify(row.newData, null, 2)
        : 'N/A',
      Módulo: row.module,
      'Nivel de registro': row.logLevel,
      'Tipo de evento': row.eventType,
      Fecha: new Date(row.timestamp).toLocaleString(),
    }))

    exportToExcel(transformedData, 'Registros')
  }

  return {
    logList,
    log,
    error,
    isLoading,
    getAllLogs,
    getLogById,
    createLog,
    downloadExcel,
  }
}

export default useLog
