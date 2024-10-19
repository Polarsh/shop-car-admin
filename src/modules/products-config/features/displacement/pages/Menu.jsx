import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useDisplacement from '../hooks/useDisplacement'
import useDisplacementNavigate from '../hooks/useDisplacementNavigate'

import { formatDate } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import Table from '../../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import TablePageSkeleton from '../../../../../components/Skeletons/TablePageSkeleton'

export default function DisplacementMenuPage() {
  const {
    navigateToCreateDisplacement,
    navigateToViewDisplacement,
    navigateToEditDisplacement,
  } = useDisplacementNavigate()
  const {
    displacementList,
    isLoading,
    error,
    getAllDisplacements,
    downloadExcel,
  } = useDisplacement()

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
      action: navigateToViewDisplacement,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditDisplacement,
    },
  ]

  useEffect(() => {
    getAllDisplacements()
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
        title='Cilindradas'
        description='Una lista de todas las cilindradas disponibles'
      />
      <Table data={displacementList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateDisplacement}
            label={'Añadir cilindrada'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewDisplacement}
        />
      </Table>
    </div>
  )
}
