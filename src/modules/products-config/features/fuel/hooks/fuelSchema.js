import * as Yup from 'yup'

export const fuelSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
}).required()
