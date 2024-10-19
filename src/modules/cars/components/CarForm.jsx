import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'
import { useState } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, FormProvider } from 'react-hook-form'
import useCar from '../hooks/useCar'
import useCarNavigate from '../hooks/useCarNavigate'
import { carSchema } from '../hooks/carSchema'
import ButtonComponent, {
  ButtonStyle,
} from '../../../components/Buttons/Button'
import AccessoryForm from './AccessoryForm'
import InformationForm from './InformationForm'
import NotesForm from './NotesForm'
import ImagesForm from './ImagesForm'
import LoadingModal from '../../../components/Modals/Loading'

export default function CarForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const [selectedAccessories, setSelectedAccessories] = useState(
    initialData.accessories || []
  )
  const [notesList, setNotesList] = useState(initialData.notes || [])
  const [images, setImages] = useState(initialData.images || [])

  const methods = useForm({
    defaultValues: initialData,
    resolver: yupResolver(carSchema),
  })

  const {
    handleSubmit,
    reset,
    setValue,
    trigger,
    formState: { errors },
  } = methods

  const { createCar, updateCar, isLoading, error } = useCar()
  const { navigateToCarMenu } = useCarNavigate()

  const onSubmit = async data => {
    const newData = {
      ...data,
      images,
    }

    try {
      if (isCreateForm) {
        await createCar({ carData: newData })
      } else {
        await updateCar({
          previousCarData: initialData,
          newCarData: newData,
        })
      }
      navigateToCarMenu()
      reset()
    } catch (error) {
      console.log(error)
      if (error.inner) {
        error.inner.forEach(e => alert(e.message))
      } else {
        alert('Error al enviar los datos')
      }
    }
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar cambios'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  const handleAccessoryChange = async accessories => {
    setSelectedAccessories(accessories)
    setValue('accessories', accessories)
    await trigger('accessories') // Revalida el campo de accesorios
  }

  const handleNotesChange = async notes => {
    setNotesList(notes)
    setValue('notes', notes)
    await trigger('notes') // Revalida el campo de notas
  }

  const handleImagesChange = async images => {
    setImages(images)

    if (Array.isArray(images)) {
      setValue('images', images)
      await trigger('images') // Revalida el campo de imágenes
    }
  }

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  return (
    <>
      <FormProvider {...methods}>
        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <InformationForm initialData={initialData} />

          <AccessoryForm
            selectedAccessories={selectedAccessories}
            setSelectedAccessories={handleAccessoryChange}
          />

          <NotesForm
            notes={notesList}
            setNotes={handleNotesChange}
            errors={errors.notes}
          />

          <ImagesForm
            images={images}
            setImages={handleImagesChange}
            errors={errors.images}
          />

          <div className='flex justify-end gap-4'>
            <ButtonComponent
              onClick={navigateToCarMenu}
              icon={MdCancel}
              label={'Cancelar'}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              isSubmit={true}
              icon={buttonIcon}
              label={buttonText}
              variant={ButtonStyle.Fill}
            />
          </div>
        </form>
      </FormProvider>
      {isLoading && <LoadingModal isOpen={isLoading} />}
    </>
  )
}
