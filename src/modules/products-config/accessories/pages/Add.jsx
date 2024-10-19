import CardComponent from '../../../../components/Cards/Card'
import Title from '../../../../components/others/Title'

import AccessoryForm from '../components/AccessoryForm'

export default function AccessoryAddPage() {
  const initialData = {
    name: '',
    description: '',
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Añadir accesorio'}
        description={'Aqui podrás crear el detalle del accesorio'}
      />

      <CardComponent>
        <AccessoryForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
