import * as yup from 'yup'

export const carSchema = yup.object().shape({
  carDetails: yup.object().shape({
    brand: yup
      .object()
      .nullable()
      .required('La marca es obligatoria')
      .typeError('Marca es obligatoria'),
    model: yup
      .object()
      .nullable()
      .required('El modelo es obligatorio')
      .typeError('Modelo es obligatorio'),
    /* year: yup.number().required('El año es obligatorio').positive().integer(), */
    year: yup
      .object()
      .nullable()
      .required('El modelo es obligatorio')
      .typeError('Modelo es obligatorio'),
    color: yup.string().required('El color es obligatorio'),
    price: yup.number().required('El precio es obligatorio').positive(),
    mileage: yup
      .number()
      .required('El kilometraje es obligatorio')
      .positive()
      .integer(),
    drivetrain: yup
      .object()
      .nullable()
      .required('El tipo de tracción es obligatorio')
      .typeError('Tracción es obligatoria'),
    displacement: yup
      .object()
      .nullable()
      .required('La cilindrada es obligatoria')
      .typeError('Cilindrada es obligatoria'),
    transmission: yup
      .object()
      .nullable()
      .required('La transmisión es obligatoria')
      .typeError('Transmisión es obligatoria'),
    fuel: yup
      .array()
      .of(yup.object().required('El tipo de combustible es obligatorio'))
      .min(1, 'Debe seleccionar al menos un tipo de combustible')
      .max(2, 'No se puede seleccionar más de dos tipos de combustible'),
  }),
  notes: yup
    .array()
    .of(yup.string().required('La nota no puede estar vacía'))
    .min(1, 'Debe añadir al menos una nota'),
  images: yup
    .array()
    .of(yup.mixed().required('La imagen es obligatoria'))
    .min(1, 'Debe añadir al menos una imagen')
    .max(10, 'No se puede añadir más de 10 imágenes'),
})
