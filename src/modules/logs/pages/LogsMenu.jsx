import { useEffect } from 'react'
import { EyeIcon } from '@heroicons/react/20/solid'

import useLogNavigate from '../hooks/useLogNavigate'
import useLog from '../hooks/useLog'

import { formatDateTime } from '../../../utils/functions'
import Title from '../../../components/others/Title'
import Table from '../../../components/Table/Table'
import LoadingPage from '../../../components/LoadingPage'

export default function LogsMenuPage() {
  const { navigateToLogView } = useLogNavigate()
  const { logList, isLoading, error, getAllLogs, downloadExcel } = useLog()

  const columns = [
    { header: 'Responsable', accessorKey: 'userEmail' },
    { header: 'Descripción', accessorKey: 'description' },

    {
      header: 'Fecha',
      accessorKey: 'timestamp',
      cell: info => formatDateTime(info.row.original.timestamp),
      sortingFn: 'datetime',
    },
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToLogView,
    },
  ]

  useEffect(() => {
    getAllLogs()
  }, [])

  if (isLoading) return <LoadingPage />

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Registros'
        description='Listado completo de registros, incluyendo información sobre el usuario, descripción, tipo de registro y fecha'
      />

      <Table data={logList} columns={columns}>
        <Table.Header handleExport={downloadExcel} />
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToLogView}
        />
      </Table>
    </div>
  )
}
