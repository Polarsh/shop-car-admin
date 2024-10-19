import * as Yup from 'yup'

export const bodySchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
}).required()
