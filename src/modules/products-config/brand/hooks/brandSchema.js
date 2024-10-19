import * as Yup from 'yup'

export const brandSchema = Yup.object({
  name: Yup.string().required('El nombre es obligatorio'),
  image: Yup.mixed().required('La imagen es obligatoria'),
  models: Yup.array()
    .of(
      Yup.object().shape({
        name: Yup.string().required('El nombre del modelo es obligatorio'),
        type: Yup.string().required('El tipo es obligatorio'),
      })
    )
    .min(1, 'Debe añadir al menos un modelo'),
})
