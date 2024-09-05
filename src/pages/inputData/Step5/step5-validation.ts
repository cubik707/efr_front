import * as Yup from 'yup'
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape({
  seeds: Yup.object({
    contractDeliveries: commonValidationSchema
  }),
  rape: Yup.object({
    contractDeliveries: commonValidationSchema
  }),
})