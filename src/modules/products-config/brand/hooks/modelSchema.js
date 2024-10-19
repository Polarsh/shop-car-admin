import * as Yup from 'yup'

export const modelSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  type: Yup.object({
    value: Yup.string().required('El tipo es requerido'),
    label: Yup.string().required('El tipo es requerido'),
  }).required('El tipo es requerido'),
}).required()
