import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useEffect, useState } from 'react'

import InputComponent from '../../../../components/Input/Input'
import SelectComponent from '../../../../components/Input/Select'
import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'

import useBody from '../../features/body/hooks/useBody'
import { modelSchema } from '../hooks/modelSchema'

const initialData = {
  name: '',
  type: '',
}

export default function ModelForm({ onSubmit }) {
  const { bodyList, isLoading, error, getAllBodies } = useBody()

  const [selectKey, setSelectKey] = useState(0) // Estado local para forzar el re-render
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: initialData,
    resolver: yupResolver(modelSchema),
  })

  useEffect(() => {
    getAllBodies()
  }, [])

  const handleAdd = data => {
    const model = {
      name: data.name,
      type: data.type.label,
    }

    onSubmit(model)
    reset(initialData)
    setSelectKey(prevKey => prevKey + 1) // Forzar re-render del select
  }

  if (error) {
    return <div>Error: {error.message}</div>
  }

  return (
    <>
      <div className='flex flex-col sm:flex-row gap-4 border-y border-gray-400 py-6'>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 flex-grow'>
          <Controller
            name='name'
            control={control}
            render={({ field }) => (
              <InputComponent
                {...field}
                label={'Modelo'}
                placeholder={'Modelo'}
                errors={errors.name}
              />
            )}
          />
          <Controller
            name='type'
            control={control}
            key={selectKey} // Añadir key para forzar re-render
            render={({ field }) => (
              <SelectComponent
                {...field}
                label={'Tipo de carrocería'}
                options={bodyList.map(option => ({
                  value: option.id,
                  label: option.name,
                }))}
                errors={errors.type}
                isLoading={isLoading}
              />
            )}
          />
        </div>
        <div className='flex justify-end sm:justify-end mt-0 sm:mt-6 items-center'>
          <ButtonComponent
            onClick={handleSubmit(handleAdd)}
            label={'Agregar modelo'}
            variant={ButtonStyle.Outline}
          />
        </div>
      </div>
    </>
  )
}
