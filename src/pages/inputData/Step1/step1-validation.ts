import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  arableLand: Yup.mixed()
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

  hayfieldsAndPastureImproved: Yup.mixed()
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

  hayfieldsAndPastureNatural: Yup.mixed()
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