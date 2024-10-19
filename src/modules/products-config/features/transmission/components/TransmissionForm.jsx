import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useTransmissionNavigate from '../hooks/useTransmissionNavigate'
import useTransmission from '../hooks/useTransmission'

import { transmissionSchema } from '../hooks/transmissionSchema'

import InputComponent from '../../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'

export default function TransmissionForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createTransmission, updateTransmission, isLoading, error } =
    useTransmission()
  const { navigateToTransmissionMenu } = useTransmissionNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(transmissionSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createTransmission({ transmissionData: data })
      } else {
        await updateTransmission({
          previousTransmissionData: initialData,
          newTransmissionData: data,
        })
      }
      navigateToTransmissionMenu()
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
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Nombre */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Transmisión'}
                placeholder={'Transmisión'}
                errors={errors.name}
              />
            )}
          />
          {/* Nombre */}
          <Controller
            name='abbreviation'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Abreviación'}
                placeholder={'Abreviación'}
                errors={errors.abbreviation}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToTransmissionMenu}
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
