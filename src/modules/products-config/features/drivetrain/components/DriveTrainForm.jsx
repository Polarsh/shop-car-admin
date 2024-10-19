import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { MdCancel } from 'react-icons/md'
import { BiSave } from 'react-icons/bi'

import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

import useDriveTrainNavigate from '../hooks/useDriveTrainNavigate'
import useDriveTrain from '../hooks/useDriveTrain'

import { driveTrainSchema } from '../hooks/drivetrainSchema'

import InputComponent from '../../../../../components/Input/Input'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../../components/Buttons/Button'
import LoadingModal from '../../../../../components/Modals/Loading'

export default function DriveTrainForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createDriveTrain, updateDriveTrain, isLoading, error } =
    useDriveTrain()
  const { navigateToDriveTrainMenu } = useDriveTrainNavigate()

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(driveTrainSchema),
  })

  const onSubmit = async data => {
    try {
      if (isCreateForm) {
        await createDriveTrain({ driveTrainData: data })
      } else {
        await updateDriveTrain({
          previousDriveTrainData: initialData,
          newDriveTrainData: data,
        })
      }
      navigateToDriveTrainMenu()
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
        <div className=' grid grid-cols-1 sm:grid-cols-2 gap-6'>
          {/* Nombre */}
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Nombre'}
                placeholder={'Doble Tracción'}
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
                label={'Abreviatura'}
                placeholder={'ABC'}
                errors={errors.abbreviation}
              />
            )}
          />
        </div>

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToDriveTrainMenu}
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
