import * as Yup from 'yup'
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape({
  arableLand: commonValidationSchema,
  hayfieldsAndPastureImproved: commonValidationSchema,
  hayfieldsAndPastureNatural: commonValidationSchema,
})
