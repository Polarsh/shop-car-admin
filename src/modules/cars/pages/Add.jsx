import Title from '../../../components/others/Title'

import CarForm from '../components/CarForm'

export default function CarAddPage() {
  const carDetails = {
    brand: null,
    model: null,
    year: '',
    color: '',
    price: '',
    mileage: '',
    drivetrain: null,
    displacement: null,
    transmission: null,
    fuel: [],
  }

  const initialData = {
    carDetails,
    accessories: [],
    images: [],
    notes: [],
  }

  return (
    <div className='space-y-6'>
      <Title
        title={'Añadir auto'}
        description={'Aquí podrás crear el detalle del auto'}
      />

      <CarForm initialData={initialData} />
    </div>
  )
}
