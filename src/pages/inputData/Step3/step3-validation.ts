import * as Yup from 'yup'

const animalValidationSchema = Yup.object().shape({
  productivity: Yup.mixed()
    .test(
      'is-number',
      'Значение должно быть числом',
      (value) => value === '' || !isNaN(Number(value))
    )
    .required('Обязательно для заполнения'),
  livestock: Yup.mixed()
    .test(
      'is-number',
      'Значение должно быть числом',
      (value) => value === '' || !isNaN(Number(value))
    )
    .required('Обязательно для заполнения'),
  consumptionOfFU: Yup.mixed()
    .test(
      'is-number',
      'Значение должно быть числом',
      (value) => value === '' || !isNaN(Number(value))
    )
    .required('Обязательно для заполнения'),
});

export const validationSchema = Yup.object().shape({
  cows: animalValidationSchema,
  youngCattle: animalValidationSchema,
});