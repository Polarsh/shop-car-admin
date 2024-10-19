import * as Yup from 'yup'

export const driveTrainSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  abbreviation: Yup.string().required('La abreviatura es requerida'),
}).required()
