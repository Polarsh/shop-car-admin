import { PlusCircleIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'

import useBrand from '../hooks/useBrand'
import useBrandNavigate from '../hooks/useBrandNavigate'

import InputComponent from '../../../../components/Input/Input'
import FileInputComponent from '../../../../components/Input/InputFile'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'

import ModelList from './ModelList'
import ModelForm from './ModelForm'

import { brandSchema } from '../hooks/brandSchema'
import LoadingModal from '../../../../components/Modals/Loading'
import ImageComponent from '../../../../components/Image'
import LabelComponent from '../../../../components/Input/_Label'

export default function BrandForm({ initialData }) {
  const isCreateForm = !Object.hasOwn(initialData, 'id')

  const { createBrand, updateBrand, isLoading, error } = useBrand()
  const { navigateToBrandMenu } = useBrandNavigate()

  const [models, setModels] = useState(initialData.models)
  const [image, setImage] = useState(initialData.image)

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: initialData, // Incluir modelos en los valores por defecto
    resolver: yupResolver(brandSchema),
  })

  const onSubmit = async data => {
    data.models = models
    data.image = image
    try {
      if (isCreateForm) {
        await createBrand({ brandData: data })
      } else {
        await updateBrand({
          previousBrandData: initialData,
          newBrandData: data,
        })
      }
      navigateToBrandMenu()
      reset()
    } catch (error) {
      if (error.inner) {
        error.inner.forEach(e => alert(e.message))
      } else {
        alert('Error al enviar los datos')
      }
    }
  }

  const handleImageUpload = event => {
    const file = event.target.files[0]

    if (file) {
      setValue('image', file)
      setImage(file)
    }
  }

  const handleAddModel = model => {
    const newModels = [...models, model]
    setModels(newModels)
    setValue('models', newModels)
  }

  const handleRemoveModel = index => {
    setModels(models.filter((_, i) => i !== index))
  }

  const buttonText = isCreateForm ? 'Añadir marca' : 'Guardar cambios'
  const buttonIcon = isCreateForm ? PlusCircleIcon : BiSave

  if (error) {
    // todo
    /* return <div>Error: {error.message}</div> */
  }

  return (
    <>
      <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-6'>
            <Controller
              name='name'
              control={control}
              render={({ field }) => (
                <InputComponent
                  {...field}
                  label={'Marca'}
                  placeholder={'Marca'}
                  errors={errors.name}
                />
              )}
            />
            <Controller
              name='image'
              control={control}
              render={({ field }) => (
                <FileInputComponent
                  {...field}
                  label='Logo'
                  onChange={e => {
                    handleImageUpload(e)
                    field.onChange(e)
                  }}
                  id='image'
                  errors={errors.image}
                />
              )}
            />
          </div>

          {image ? (
            <div className=' h-36'>
              <LabelComponent label={'Imagen'} htmlFor={'Imagen'} />
              <ImageComponent
                image={
                  typeof image === 'string' ? image : URL.createObjectURL(image)
                }
                imageAlt={`Preview Logo `}
              />
            </div>
          ) : (
            <p className='w-full h-full flex items-center justify-center text-center border rounded-lg'>
              Inserte una imagen para visualizar
            </p>
          )}
        </div>

        <ModelForm onSubmit={handleAddModel} />

        <ModelList
          placeholder={'Añada algún modelo'}
          models={models}
          onRemoveModel={handleRemoveModel}
          errors={errors.models && errors.models.message}
        />

        <div className='flex justify-end gap-4'>
          <ButtonComponent
            onClick={navigateToBrandMenu}
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
