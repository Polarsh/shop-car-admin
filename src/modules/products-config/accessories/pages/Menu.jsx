import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useAccessory from '../hooks/useAccessory'
import useAccessoryNavigate from '../hooks/useAccessoryNavigate'

import { formatDate } from '../../../../utils/functions'

import Title from '../../../../components/others/Title'
import Table from '../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'

export default function AccessoryMenuPage() {
  const {
    navigateToCreateAccessory,
    navigateToViewAccessory,
    navigateToEditAccessory,
  } = useAccessoryNavigate()
  const { accessoryList, isLoading, error, getAllAccessories, downloadExcel } =
    useAccessory()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    { header: 'Descripción', accessorKey: 'description' },
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
      action: navigateToViewAccessory,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditAccessory,
    },
  ]

  useEffect(() => {
    getAllAccessories()
  }, [])

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div className='space-y-6'>
      <Title
        title='Accesorios'
        description='Una lista de todos los accesorios disponibles'
      />
      <Table data={accessoryList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateAccessory}
            label={'Añadir accesorio'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewAccessory}
        />
      </Table>
    </div>
  )
}
