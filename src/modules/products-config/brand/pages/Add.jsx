import BrandForm from '../components/BrandForm'

import Title from '../../../../components/others/Title'
import CardComponent from '../../../../components/Cards/Card'

export default function BrandAddPage() {
  const initialData = {
    name: '',
    image: null,
    models: [],
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir marca'}
          description={'Aqui podrás crear el detalle de la marca'}
        />

        <CardComponent>
          <BrandForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
