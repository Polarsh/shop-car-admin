import { toast } from 'sonner'
import CardComponent from '../../../components/Cards/Card'
import ImageComponent from '../../../components/Image'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

const ImagesForm = ({ images, setImages, errors }) => {
  const handleImageChange = async e => {
    const files = Array.from(e.target.files)

    const totalImages = [...images, ...files]

    if (totalImages.length > 10) {
      toast.error('Solo puedes subir hasta 10 imágenes.')
      return
    }

    setImages(totalImages)
  }

  const removeImage = indexToRemove => {
    if (images.length === 1) {
      toast.error('Debe haber al menos una imagen')
      return
    }
    setImages(prevImages =>
      prevImages.filter((_, index) => index !== indexToRemove)
    )
  }

  const onDragEnd = result => {
    const { destination, source } = result

    // Si no se arrastró a una posición válida
    if (!destination) return

    const reorderedImages = Array.from(images)
    const [removed] = reorderedImages.splice(source.index, 1)
    reorderedImages.splice(destination.index, 0, removed)

    setImages(reorderedImages)
  }

  return (
    <CardComponent label={'Subir imagen'}>
      <div className='space-y-6'>
        <input
          type='file'
          accept='image/*'
          multiple
          onChange={handleImageChange}
          className='w-full p-2 border border-gray-300 rounded'
        />
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId='images-droppable' direction='horizontal'>
            {provided => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {images.map((image, index) => (
                  <Draggable
                    key={index}
                    draggableId={index.toString()}
                    index={index}>
                    {provided => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className='relative h-24 border-gray-400 border-2 bg-gray-200'>
                        <ImageComponent
                          image={
                            typeof image === 'string'
                              ? image
                              : URL.createObjectURL(image)
                          }
                          imageAlt={`Preview Imagen ${index} `}
                        />
                        <button
                          type='button'
                          className='absolute top-0 right-0 p-1 bg-red-500 text-white rounded'
                          onClick={() => removeImage(index)}>
                          X
                        </button>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      {errors && <p className='text-xs text-red-500'>{errors.message}</p>}
    </CardComponent>
  )
}

export default ImagesForm
