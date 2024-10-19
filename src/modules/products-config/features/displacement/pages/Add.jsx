import CardComponent from '../../../../../components/Cards/Card'
import Title from '../../../../../components/others/Title'

import DisplacementForm from '../components/DisplacementForm'

export default function DisplacementAddPage() {
  const initialData = {
    name: '',
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir cilindrada'}
          description={'Aquí podrás crear el detalle de la cilindrada'}
        />

        <CardComponent>
          <DisplacementForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
