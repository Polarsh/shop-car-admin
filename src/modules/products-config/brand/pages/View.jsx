import { TrashIcon } from '@heroicons/react/20/solid'
import { BiSave } from 'react-icons/bi'
import { MdCancel } from 'react-icons/md'

import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

import useBrand from '../hooks/useBrand'
import useBrandNavigate from '../hooks/useBrandNavigate'

import { formatDateTime } from '../../../../utils/functions'

import ButtonComponent, {
  ButtonStyle,
} from '../../../../components/Buttons/Button'
import CardComponent from '../../../../components/Cards/Card'
import Title from '../../../../components/others/Title'
import ModelList from '../components/ModelList'
import DeleteModalValidation from '../../../../components/Modals/Delete'
import InputOnlyViewComponent from '../../../../components/Input/View'
import LabelComponent from '../../../../components/Input/_Label'
import ImageComponent from '../../../../components/Image'
import FormPageSkeleton from '../../../../components/Skeletons/FormPageSkeleton'

export default function BrandViewPage() {
  const { brandId } = useParams()

  const { brand, isLoading, error, getBrandById, deleteBrand } = useBrand()
  const { navigateToBrandMenu, navigateToEditBrand } = useBrandNavigate()
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  useEffect(() => {
    getBrandById({ id: brandId })
  }, [])

  const handleDelete = async brandData => {
    // TODO
    try {
      await deleteBrand({ brandData })
      navigateToBrandMenu()
    } catch (error) {}
  }

  if (isLoading) return <FormPageSkeleton />
  if (error) return <div>Error: {error.message}</div>
  if (!brand) return <div>No se encontró la marca</div>

  return (
    <div>
      <div className='space-y-6'>
        <Title
          title={'Detalles de la marca'}
          description={'Aqui podras encontrar el detalle de la marca'}
        />

        <CardComponent className='space-y-6 bg-white'>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
            <InputOnlyViewComponent label={'Marca'} value={brand.name} />
            <div className=' h-32 aspect-square'>
              <LabelComponent label={'Imagen'} htmlFor={'Imagen'} />
              <ImageComponent
                image={brand.image}
                imageAlt={`Logo de marca ${brand.name}`}
              />
            </div>
            <InputOnlyViewComponent
              label={'Creado en'}
              value={formatDateTime(brand.createdAt)}
            />
            <InputOnlyViewComponent
              label={'Última actualización'}
              value={formatDateTime(brand.updatedAt)}
            />
          </div>

          <ModelList placeholder={'Añada algún modelo'} models={brand.models} />

          {/* Botones */}
          <div className='mt-6 flex flex-wrap gap-4 justify-end sm:flex-nowrap'>
            <ButtonComponent
              onClick={navigateToBrandMenu}
              label={'Atrás'}
              icon={MdCancel}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              onClick={() => setShowDeleteModal(!showDeleteModal)}
              label={'Eliminar'}
              icon={TrashIcon}
              variant={ButtonStyle.Cancel}
            />
            <ButtonComponent
              onClick={() => navigateToEditBrand(brandId)}
              label={'Editar'}
              icon={BiSave}
              variant={ButtonStyle.Fill}
            />
          </div>
        </CardComponent>
      </div>
      {showDeleteModal ? (
        <DeleteModalValidation
          title={'Borrar marca'}
          content={
            'Are you sure you want to deactivate your account? All of your data will be permanently removed from our servers forever. This action cannot be undone.'
          }
          onConfirmClick={() => handleDelete(brand)}
          onCloseModal={() => setShowDeleteModal(false)}
        />
      ) : (
        <></>
      )}
    </div>
  )
}
