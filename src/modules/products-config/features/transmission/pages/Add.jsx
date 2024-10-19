import CardComponent from '../../../../../components/Cards/Card'
import Title from '../../../../../components/others/Title'

import TransmissionForm from '../components/TransmissionForm'

export default function TransmissionAddPage() {
  const initialData = {
    name: '',
    abbreviation: '',
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir transmisión'}
          description={'Aquí podrás crear el detalle de la transmisión'}
        />

        <CardComponent>
          <TransmissionForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
