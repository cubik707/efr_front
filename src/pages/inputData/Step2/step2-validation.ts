import * as Yup from 'yup'

export const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object({
      culture: Yup.string().required('Выберите культуру'),

      yield: Yup.mixed()
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

      fodder: Yup.mixed()
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

      commodity: Yup.mixed()
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

      seeds: Yup.mixed()
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
    })
  )
    .min(1, 'Должен быть хотя бы один ряд'),
});
