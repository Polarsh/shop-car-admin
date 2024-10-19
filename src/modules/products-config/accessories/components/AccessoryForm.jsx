import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useAccessoryNavigate from '../hooks/useAccessoryNavigate'
import useAccessory from '../hooks/useAccessory'
import { accessorySchema } from '../hooks/accessorySchema'

import InputComponent from '../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'
import LoadingModal from '../../../../components/Modals/Loading'

export default function AccessoryForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createAccessory, updateAccessory, isLoading, error } = useAccessory()
  const { navigateToAccessoryMenu } = useAccessoryNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(accessorySchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createAccessory({ accessoryData: data })
      } else {
        await updateAccessory({
          previousAccessoryData: initialData,
          newAccessoryData: data,
        })
      }
      navigateToAccessoryMenu()
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
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  const buttonText = isCreateForm ? 'Añadir' : 'Guardar cambios'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='md:w-1/2'>
          {/* Nombre */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Accesorio'}
                placeholder={'Accesorio'}
                errors={errors.name}
              />
            )}
          />
        </div>

        {/* Descripción */}
        <Controller
          name='description'
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label={'Descripción'}
              placeholder={'Descripción'}
              errors={errors.description}
            />
          )}
        />

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToAccessoryMenu}
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
