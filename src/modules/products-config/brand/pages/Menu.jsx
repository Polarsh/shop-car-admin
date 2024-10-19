import { useEffect } from 'react'
import {
  EyeIcon,
  PencilSquareIcon,
  PlusCircleIcon,
} from '@heroicons/react/20/solid'

import useBrandNavigate from '../hooks/useBrandNavigate'
import useBrand from '../hooks/useBrand'

import { formatDate } from '../../../../utils/functions'

import Title from '../../../../components/others/Title'
import Table from '../../../../components/Table/Table'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'
import TablePageSkeleton from '../../../../components/Skeletons/TablePageSkeleton'

export default function BrandMenuPage() {
  const { navigateToCreateBrand, navigateToViewBrand, navigateToEditBrand } =
    useBrandNavigate()
  const { brandList, isLoading, error, getAllBrands, downloadExcel } =
    useBrand()

  const columns = [
    { header: 'Nombre', accessorKey: 'name' },
    {
      header: 'Modelos',
      accessorKey: 'models',
      accessorFn: row => row.models.map(model => model.name).join(', '),
    },
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
      action: navigateToViewBrand,
    },
    {
      label: 'Editar',
      icon: PencilSquareIcon,
      action: navigateToEditBrand,
    },
  ]

  useEffect(() => {
    getAllBrands()
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
        title='Marcas'
        description='Una lista de todas las marcas, con su nombre, país y año de establecimiento.'
      />
      <Table data={brandList} columns={columns}>
        <Table.Header handleExport={downloadExcel}>
          <ButtonComponent
            onClick={navigateToCreateBrand}
            label={'Añadir marca'}
            icon={PlusCircleIcon}
            variant={ButtonStyle.Fill}
          />
        </Table.Header>
        <Table.Body
          actionItems={actionItems}
          onActionClick={navigateToViewBrand}
        />
      </Table>
    </div>
  )
}
