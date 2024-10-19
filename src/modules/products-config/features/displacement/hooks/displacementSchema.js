import * as Yup from 'yup'

export const displacementSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
}).required()
