import * as Yup from 'yup';
import { feedNames } from './feedsName'

const feedValidationSchema = Yup.object({
  volume: Yup.mixed()
    .test(
      'is-number',
      'Значение должно быть числом',
      (value) => value === '' || !isNaN(Number(value))
    )
    .test(
      'is-positive',
      'Значение не может быть отрицательным',
      (value) => value === '' || Number(value) >= 0
    )
    .required('Обязательно для заполнения'),
  price: Yup.mixed()
    .test(
      'is-number',
      'Значение должно быть числом',
      (value) => value === '' || !isNaN(Number(value))
    )
    .test(
      'is-positive',
      'Значение не может быть отрицательным',
      (value) => value === '' || Number(value) >= 0
    )
    .required('Обязательно для заполнения'),
});

export const validationSchema = Yup.object().shape(
  Object.fromEntries(
    feedNames.map(feedName => [feedName, feedValidationSchema])
  )
);