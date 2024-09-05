import * as Yup from 'yup'
import { commonValidationSchema } from '../../../utils/commonValidationsSchema'

export const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object({
      culture: Yup.string().required('Выберите культуру'),
      yield: commonValidationSchema,
      fodder: commonValidationSchema.test('fodder-not-exceeds-yield', 'Значение на корм не может превышать урожайность прогнозную', function (value) {
        const { yield: forecastYield, fodder } = this.parent;
        return !fodder || !forecastYield || Number(fodder) <= Number(forecastYield);
      }),
    })
  )
    .min(1, 'Должен быть хотя бы один ряд'),
});
