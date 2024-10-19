import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useDisplacementNavigate from '../hooks/useDisplacementNavigate'
import useDisplacement from '../hooks/useDisplacement'
import { displacementSchema } from '../hooks/displacementSchema'

import InputComponent from '../../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import LoadingModal from '../../../../../components/Modals/Loading'

export default function DisplacementForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createDisplacement, updateDisplacement, isLoading, error } =
    useDisplacement()
  const { navigateToDisplacementMenu } = useDisplacementNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(displacementSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createDisplacement({ displacementData: data })
      } else {
        await updateDisplacement({
          previousDisplacementData: initialData,
          newDisplacementData: data,
        })
      }
      navigateToDisplacementMenu()
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
        <div className='w-1/2'>
          {/* Nombre */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Cilindrada'}
                placeholder={'Cilindrada'}
                errors={errors.name}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToDisplacementMenu}
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
