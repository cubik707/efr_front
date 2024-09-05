import * as Yup from 'yup';
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'
import { cultures } from '../../../state/cultures/cultures'
import { CultureNames } from '../../../state/cultures/cultures-reducer'
import { disabledPriceCultures } from './disabledCultures'


const rowSchema = (isPriceDisabled: boolean) => Yup.object().shape({
  sellingPricePerCent: isPriceDisabled
    ? Yup.string() // Optional field if price is disabled
    : commonValidationSchema, // Apply common validation if not disabled
  costPrice: commonValidationSchema,
});

export const validationSchema = Yup.object().shape(
  Object.keys(cultures)
    .filter(culture => culture !== 'seeds')
    .reduce<Record<CultureNames, Yup.ObjectSchema<any, any, any, any>>>((acc, culture) => {
      acc[culture as CultureNames] = rowSchema(disabledPriceCultures.includes(culture));
      return acc;
    }, {} as Record<CultureNames, Yup.ObjectSchema<any, any, any, any>>)
);