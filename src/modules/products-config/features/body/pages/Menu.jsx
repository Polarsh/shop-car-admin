import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useBody from '../hooks/useBody'
import useBodyNavigate from '../hooks/useBodyNavigate'

import { formatDate } from '../../../../../utils/functions'

import Title from '../../../../../components/others/Title'
import Table from '../../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import FormPageSkeleton from '../../../../../components/Skeletons/FormPageSkeleton'

export default function BodyMenuPage() {
  const { navigateToCreateBody, navigateToViewBody, navigateToEditBody } =
    useBodyNavigate()
  const { bodyList, isLoading, error, getAllBodies, downloadExcel } = useBody()

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
      action: navigateToViewBody,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditBody,
    },
  ]

  useEffect(() => {
    getAllBodies()
  }, [])

  if (isLoading) return <FormPageSkeleton />

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Carrocerías'
        description='Una lista de todas las carrocerías disponibles'
      />
      <Table data={bodyList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateBody}
            label={'Añadir carrocería'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewBody}
        />
      </Table>
    </div>
  )
}
