import { useParams } from 'react-router-dom'
import { useEffect } from 'react'

import useBrand from '../hooks/useBrand'
import BrandForm from '../components/BrandForm'

import Title from '../../../../components/others/Title'
import CardComponent from '../../../../components/Cards/Card'
import FormPageSkeleton from '../../../../components/Skeletons/FormPageSkeleton'

export default function BrandEditPage() {
  const { brandId } = useParams()

  const { brand, isLoading, error, getBrandById } = useBrand()

  useEffect(() => {
    getBrandById({ id: brandId })
  }, [])

  const initialData = brand

  if (isLoading) return <FormPageSkeleton />
  if (error) return <div>Error: {error.message}</div>
  if (!brand) return <div>No se encontró la marca</div>

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Editar marca'}
          description={'Aqui podrás editar el detalle de la marca'}
        />

        <CardComponent>
          <BrandForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
