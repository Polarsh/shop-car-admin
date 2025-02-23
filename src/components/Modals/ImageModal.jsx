import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function ImageModal({ image, imageAlt, onCloseModal }) {
  return (
    <Dialog className='relative z-50' open={true} onClose={onCloseModal}>
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
      />

      <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
        <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
          <DialogPanel
            transition
            className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg sm:p-6 data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
            <div className='absolute right-0 top-0 hidden pr-4 pt-4 sm:block'>
              <button
                type='button'
                className='rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2'
                onClick={onCloseModal}>
                <span className='sr-only'>Cerrar</span>
                <XMarkIcon className='h-6 w-6' aria-hidden='true' />
              </button>
            </div>
            <img src={image} alt={imageAlt} />
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}
