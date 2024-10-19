import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useDriveTrain from '../hooks/useDriveTrain'
import useDriveTrainNavigate from '../hooks/useDriveTrainNavigate'

import { formatDate } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import Table from '../../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import TablePageSkeleton from '../../../../../components/Skeletons/TablePageSkeleton'

export default function DriveTrainMenuPage() {
  const {
    navigateToCreateDriveTrain,
    navigateToViewDriveTrain,
    navigateToEditDriveTrain,
  } = useDriveTrainNavigate()
  const { driveTrainList, isLoading, error, getAllDriveTrains, downloadExcel } =
    useDriveTrain()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Abreviatura', accessorKey: 'abbreviation' },
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
      action: navigateToViewDriveTrain,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditDriveTrain,
    },
  ]

  useEffect(() => {
    getAllDriveTrains()
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
        title='Sistemas de Tracción'
        description='Una lista de todos los sistemas de tracción disponibles'
      />
      <Table data={driveTrainList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateDriveTrain}
            label={'Añadir sistema de tracción'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewDriveTrain}
        />
      </Table>
    </div>
  )
}
