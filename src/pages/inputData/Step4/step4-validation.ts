import * as Yup from 'yup';
import { feedNames } from './feedsName'
import { commnonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape(
  Object.fromEntries(
    feedNames.map(feedName => [feedName, commnonValidationSchema])
  )
);