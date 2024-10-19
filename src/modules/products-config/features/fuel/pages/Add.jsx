import CardComponent from '../../../../../components/Cards/Card'
import Title from '../../../../../components/others/Title'

import FuelForm from '../components/FuelForm'

export default function FuelAddPage() {
  const initialData = {
    name: '',
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir combustible'}
          description={'Aquí podrás crear el detalle del combustible'}
        />

        <CardComponent>
          <FuelForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
