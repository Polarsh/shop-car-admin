import { XMarkIcon } from '@heroicons/react/20/solid'
import LabelComponent from '../../../../components/Input/_Label'

const ModelList = ({ models, onRemoveModel, errors }) => {
  const isEdit = typeof onRemoveModel === 'function'
  const errorClass = 'mt-1 text-xs text-red-500'

  return (
    <div>
      <LabelComponent label={'Lista de modelos'} htmlFor={'models'} />
      <div
        className='flex flex-wrap gap-2 w-full px-3 py-2 text-gray-700 border rounded-lg border-gray-300 bg-gray-50'
        id='models'>
        {models.length === 0 ? (
          <span className='text-gray-500'>Añada algún modelo</span>
        ) : (
          models.map((model, index) => (
            <div
              key={index}
              className='flex items-center border rounded-md py-1 px-3 text-primary bg-backgroundLight'>
              <span className='mr-2'>{`${model.name} - ${model.type}`}</span>
              {isEdit && (
                <button
                  type='button'
                  className='text-red-500 hover:text-red-700'
                  onClick={() => onRemoveModel(index)}>
                  <XMarkIcon className='h-4 w-4' aria-hidden='true' />
                </button>
              )}
            </div>
          ))
        )}
      </div>
      {errors && <p className={errorClass}>{errors}</p>}
    </div>
  )
}

export default ModelList
