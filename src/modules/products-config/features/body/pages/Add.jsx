import CardComponent from '../../../../../components/Cards/Card'
import Title from '../../../../../components/others/Title'

import BodyForm from '../components/BodyForm'

export default function BodyAddPage() {
  const initialData = {
    name: '',
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir marca'}
          description={'Aqui podrás crear el detalle de la marca'}
        />

        <CardComponent>
          <BodyForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
