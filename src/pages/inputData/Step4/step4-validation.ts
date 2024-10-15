import * as Yup from 'yup'
import { feedNames } from '../../../state/feeds/feedsName'
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape(
  Object.fromEntries(
    feedNames.map((feedName) => [
      feedName,
      Yup.object({
        volume: commonValidationSchema,
        price: commonValidationSchema,
      }),
    ])
  )
)
