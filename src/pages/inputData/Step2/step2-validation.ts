import * as Yup from 'yup'
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object({
      culture: Yup.string().required('Выберите культуру'),
      yield: commonValidationSchema,
      fodder: commonValidationSchema,
      commodity: commonValidationSchema,
    })
  )
    .min(1, 'Должен быть хотя бы один ряд'),
});
