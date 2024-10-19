import CardComponent from '../../../../components/Cards/Card'
import Title from '../../../../components/others/Title'

import AdminForm from '../components/AdminForm'

export default function AdminAddPage() {
  const initialData = {
    firstName: '',
    lastName: '',
    dni: '',
    email: '',
    phone: '',
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Crear administrador'}
        description={'Aqui podrás crear el detalle del administrador'}
      />

      <CardComponent>
        <AdminForm initialData={initialData} />
      </CardComponent>
    </div>
  )
}
