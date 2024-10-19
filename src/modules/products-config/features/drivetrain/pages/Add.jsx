import CardComponent from '../../../../../components/Cards/Card'
import Title from '../../../../../components/others/Title'

import DriveTrainForm from '../components/DriveTrainForm'

export default function DriveTrainAddPage() {
  const initialData = {
    name: '',
  }

  return (
    <>
      <div className='space-y-6'>
        <Title
          title={'Añadir sistema de tracción'}
          description={'Aquí podrás crear el detalle del sistema de tracción'}
        />

        <CardComponent>
          <DriveTrainForm initialData={initialData} />
        </CardComponent>
      </div>
    </>
  )
}
