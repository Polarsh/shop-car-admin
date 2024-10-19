import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useFuel from '../hooks/useFuel'
import useFuelNavigate from '../hooks/useFuelNavigate'

import { formatDate } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import Table from '../../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import TablePageSkeleton from '../../../../../components/Skeletons/TablePageSkeleton'

export default function FuelMenuPage() {
  const { navigateToCreateFuel, navigateToViewFuel, navigateToEditFuel } =
    useFuelNavigate()
  const { fuelList, isLoading, error, getAllFuels, downloadExcel } = useFuel()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },

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
      action: navigateToViewFuel,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditFuel,
    },
  ]

  useEffect(() => {
    getAllFuels()
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
        title='Combustibles'
        description='Una lista de todos los combustibles disponibles'
      />
      <Table data={fuelList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateFuel}
            label={'Añadir combustible'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewFuel}
        />
      </Table>
    </div>
  )
}
