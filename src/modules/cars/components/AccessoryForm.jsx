import { useEffect } from 'react'
import useAccessory from '../../products-config/accessories/hooks/useAccessory'
import CardComponent from '../../../components/Cards/Card'

const AccessoryForm = ({ selectedAccessories, setSelectedAccessories }) => {
  const { accessoryList, getAllAccessories } = useAccessory([])

  useEffect(() => {
    getAllAccessories()
  }, [])

  const handleCheckboxChange = (accessory, isChecked) => {
    const { id, name, description } = accessory
    const updatedAccessory = { id, name, description }

    const updatedAccessories = isChecked
      ? [...selectedAccessories, updatedAccessory]
      : selectedAccessories.filter(a => a.id !== updatedAccessory.id)

    setSelectedAccessories(updatedAccessories)
  }

  return (
    <CardComponent>
      <h3 className='text-lg font-medium leading-6 text-gray-900'>
        Accesorios
      </h3>
      <fieldset>
        <legend className='sr-only'>Accesorios</legend>
        <div className='mt-3 grid grid-cols-1 sm:grid-cols-2 gap-5'>
          {accessoryList.map(accessory => (
            <div key={accessory.id} className='relative flex items-start'>
              <div className='flex h-6 items-center'>
                <input
                  id={accessory.id}
                  name={accessory.id}
                  type='checkbox'
                  checked={selectedAccessories.some(a => a.id === accessory.id)}
                  onChange={e =>
                    handleCheckboxChange(accessory, e.target.checked)
                  }
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600'
                />
              </div>
              <div className='ml-3 text-sm leading-6'>
                <label
                  htmlFor={accessory.id}
                  className='font-bold text-gray-900'>
                  {accessory.name}
                </label>
                <p id={`${accessory.id}-description`} className='text-gray-500'>
                  {accessory.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </fieldset>
    </CardComponent>
  )
}

export default AccessoryForm
