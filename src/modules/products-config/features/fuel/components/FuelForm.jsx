import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useFuelNavigate from '../hooks/useFuelNavigate'
import useFuel from '../hooks/useFuel'

import { fuelSchema } from '../hooks/fuelSchema'

import InputComponent from '../../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'

export default function FuelForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createFuel, updateFuel, isLoading, error } = useFuel()
  const { navigateToFuelMenu } = useFuelNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(fuelSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createFuel({ fuelData: data })
      } else {
        await updateFuel({
          previousFuelData: initialData,
          newFuelData: data,
        })
      }
      navigateToFuelMenu()
      reset()
    } catch (error) {
      if (error.inner) {
        // Manejar errores de validación de Yup
        error.inner.forEach(e => alert(e.message))
      } else {
        // Manejar otros errores (e.g., de red)
        alert('Error al enviar los datos')
      }
    }
  }

  if (isLoading) {
    return <div>Cargando...</div>
  }

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar cambios'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='w-1/2'>
          {/* Nombre */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Combustible'}
                placeholder={'Combustible'}
                errors={errors.name}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToFuelMenu}
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
      {error && (
        <div className='mt-4 text-center text-red-500'>{error.message}</div>
      )}
    </>
  )
}
