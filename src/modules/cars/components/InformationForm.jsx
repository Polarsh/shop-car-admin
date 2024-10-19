import { useEffect, useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import useBrand from '../../products-config/brand/hooks/useBrand'
import useDisplacement from '../../products-config/features/displacement/hooks/useDisplacement'
import useDriveTrain from '../../products-config/features/drivetrain/hooks/useDriveTrain'
import useFuel from '../../products-config/features/fuel/hooks/useFuel'
import useTransmission from '../../products-config/features/transmission/hooks/useTransmission'
import InputComponent from '../../../components/Input/Input'
import SelectComponent from '../../../components/Input/Select'
import CardComponent from '../../../components/Cards/Card'
import { formatToCurrency, formatToKilometers } from '../../../utils/functions'

const generateYearOptions = () => {
  const currentYear = new Date().getFullYear()
  const years = []
  for (let i = 0; i < 50; i++) {
    const year = currentYear - i
    years.push({ id: year, name: year.toString() })
  }
  return years
}

const InformationForm = ({ initialData }) => {
  const {
    control,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext()

  const [modelList, setModelList] = useState([])

  const { brandList, getAllBrands } = useBrand([])
  const { displacementList, getAllDisplacements } = useDisplacement([])
  const { driveTrainList, getAllDriveTrains } = useDriveTrain([])
  const { fuelList, getAllFuels } = useFuel([])
  const { transmissionList, getAllTransmissions } = useTransmission([])

  const yearList = generateYearOptions()

  useEffect(() => {
    getAllBrands()
    getAllDisplacements()
    getAllDriveTrains()
    getAllFuels()
    getAllTransmissions()
  }, [])

  useEffect(() => {
    if (initialData.carDetails.brand) {
      loadModelList(initialData.carDetails.brand.value)
    }
  }, [brandList])

  const loadModelList = brandId => {
    if (brandList.length > 0) {
      const brand = brandList.find(model => model.id === brandId)
      if (brand) {
        const models = brand.models
        setModelList(models)
      }
    }
  }

  const handleChange = async (field, selectedOption) => {
    setValue(field, selectedOption)
    await trigger(field)
  }

  const handleFormattedPriceChange = (field, value) => {
    const rawValue = value.replace(/[^0-9.-]+/g, '')
    setValue(field.name, rawValue)
    field.onChange(rawValue)
  }

  const handleFormattedValueChange = (field, value, formatFunction) => {
    const rawValue = value.replace(/[^0-9-]+/g, '')
    setValue(field.name, rawValue)
    field.onChange(rawValue)
  }

  return (
    <CardComponent>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <Controller
          name='carDetails.brand'
          control={control}
          render={({ field }) => (
            <SelectComponent
              {...field}
              isSearchable
              label='Marcas'
              errors={errors.carDetails && errors.carDetails.brand}
              options={brandList.map(option => ({
                value: option.id,
                label: option.name,
              }))}
              onChange={selectedOption => {
                handleChange('carDetails.brand', selectedOption)
                setValue('carDetails.model', null)
                loadModelList(selectedOption.value)
              }}
            />
          )}
        />
        <Controller
          name='carDetails.model'
          control={control}
          render={({ field }) => (
            <SelectComponent
              {...field}
              isSearchable
              label='Modelo'
              errors={errors.carDetails && errors.carDetails.model}
              options={modelList.map(option => ({
                value: option.type,
                label: option.name,
              }))}
              onChange={selectedOption => {
                handleChange('carDetails.model', selectedOption)
              }}
            />
          )}
        />
        <Controller
          name='carDetails.year'
          control={control}
          render={({ field }) => (
            <SelectComponent
              {...field}
              isSearchable
              label='Año'
              errors={errors.carDetails && errors.carDetails.year}
              options={yearList.map(option => ({
                value: option.id,
                label: option.name,
              }))}
              onChange={selectedOption => {
                handleChange('carDetails.year', selectedOption)
              }}
            />
          )}
        />
        <Controller
          name='carDetails.color'
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label='Color'
              placeholder='Verde Carmesí'
              errors={errors.carDetails && errors.carDetails.color}
              onChange={e => handleChange('carDetails.color', e.target.value)}
            />
          )}
        />
        <Controller
          name='carDetails.price'
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label='Precio'
              placeholder='0.00'
              errors={errors.carDetails && errors.carDetails.price}
              value={formatToCurrency(field.value)}
              onChange={e => handleFormattedPriceChange(field, e.target.value)}
            />
          )}
        />
        <Controller
          name='carDetails.mileage'
          control={control}
          render={({ field }) => (
            <InputComponent
              {...field}
              label='Kilometraje (km)'
              placeholder='0'
              errors={errors.carDetails && errors.carDetails.mileage}
              value={formatToKilometers(field.value)}
              onChange={e =>
                handleFormattedValueChange(
                  field,
                  e.target.value,
                  formatToKilometers
                )
              }
            />
          )}
        />
        <div className='col-span-full grid grid-cols-1 sm:grid-cols-2 gap-6'>
          <Controller
            name='carDetails.drivetrain'
            control={control}
            render={({ field }) => (
              <SelectComponent
                {...field}
                label='Tracción'
                errors={errors.carDetails && errors.carDetails.drivetrain}
                options={driveTrainList.map(option => ({
                  value: option.id,
                  label: `${option.abbreviation} - ${option.name}`,
                }))}
                onChange={selectedOption => {
                  handleChange('carDetails.drivetrain', selectedOption)
                }}
              />
            )}
          />
          <Controller
            name='carDetails.transmission'
            control={control}
            render={({ field }) => (
              <SelectComponent
                {...field}
                label='Transmision'
                errors={errors.carDetails && errors.carDetails.transmission}
                options={transmissionList.map(option => ({
                  value: option.id,
                  label: `${option.abbreviation} - ${option.name}`,
                }))}
                onChange={selectedOption => {
                  handleChange('carDetails.transmission', selectedOption)
                }}
              />
            )}
          />
        </div>
        <div className='col-span-full sm:col-span-2'>
          <Controller
            name='carDetails.fuel'
            control={control}
            render={({ field }) => (
              <SelectComponent
                {...field}
                isMulti
                label='Combustible'
                errors={errors.carDetails && errors.carDetails.fuel}
                options={fuelList.map(option => ({
                  value: option.id,
                  label: option.name,
                }))}
                onChange={selectedOptions => {
                  const values = selectedOptions || []
                  handleChange('carDetails.fuel', values)
                }}
              />
            )}
          />
        </div>
        <Controller
          name='carDetails.displacement'
          control={control}
          render={({ field }) => (
            <SelectComponent
              {...field}
              label='Cilindrada'
              errors={errors.carDetails && errors.carDetails.displacement}
              options={displacementList.map(option => ({
                value: option.id,
                label: option.name,
              }))}
              onChange={selectedOption => {
                handleChange('carDetails.displacement', selectedOption)
              }}
            />
          )}
        />
      </div>
    </CardComponent>
  )
}

export default InformationForm
