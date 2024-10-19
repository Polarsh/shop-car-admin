import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import { bodySchema } from '../hooks/bodySchema'
import useBodyNavigate from '../hooks/useBodyNavigate'
import useBody from '../hooks/useBody'

import InputComponent from '../../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import LoadingModal from '../../../../../components/Modals/Loading'

export default function BodyForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createBody, updateBody, isLoading, error } = useBody()
  const { navigateToBodyMenu } = useBodyNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(bodySchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createBody({ bodyData: data })
      } else {
        await updateBody({
          previousBodyData: initialData,
          newBodyData: data,
        })
      }
      navigateToBodyMenu()
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

  if (error) {
    return <div className='mt-4 text-center text-red-500'>{error.message}</div>
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
                label={'Carrocería'}
                placeholder={'Carrocería'}
                errors={errors.name}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToBodyMenu}
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
      {isLoading && <LoadingModal isOpen={isLoading} />}
    </>
  )
}
