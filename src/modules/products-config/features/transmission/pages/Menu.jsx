import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useTransmission from '../hooks/useTransmission'
import useTransmissionNavigate from '../hooks/useTransmissionNavigate'

import { formatDate } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import Table from '../../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import TablePageSkeleton from '../../../../../components/Skeletons/TablePageSkeleton'

export default function TransmissionMenuPage() {
  const {
    navigateToCreateTransmission,
    navigateToViewTransmission,
    navigateToEditTransmission,
  } = useTransmissionNavigate()
  const {
    transmissionList,
    isLoading,
    error,
    getAllTransmissions,
    downloadExcel,
  } = useTransmission()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Abreviación', accessorKey: 'abbreviation' },
    {
      header: 'Fecha de creación',
      accessorKey: 'createdAt',
      cell: info => formatDate(info.row.original.createdAt),
      sortingFn: 'datetime',
    },
  ]

  const actionItems = [
    {
      label: 'Ver',
      icon: EyeIcon,
      action: navigateToViewTransmission,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditTransmission,
    },
  ]

  useEffect(() => {
    getAllTransmissions()
  }, [])

  if (isLoading) {
    return <TablePageSkeleton />
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Transmisiones'
        description='Una lista de todas las transmisiones disponibles'
      />
      <Table data={transmissionList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateTransmission}
            label={'Añadir transmisión'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewTransmission}
        />
      </Table>
    </div>
  )
}
