import * as Yup from 'yup'

export const transmissionSchema = Yup.object({
  name: Yup.string().required('El nombre es requerido'),
  abbreviation: Yup.string().required('La abreviación es requerida'),
}).required()
