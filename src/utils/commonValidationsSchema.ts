import * as Yup from 'yup'

export const commnonValidationSchema = Yup.object({
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