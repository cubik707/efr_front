import * as Yup from 'yup';

// Соответствия продуктивности и расхода КЕ для коров
export const cowsProductivityToConsumption: { [key: number]: number } = {
  25: 1.28,
  26: 1.26,
  27: 1.24,
  28: 1.21,
  29: 1.19,
  30: 1.18,
  31: 1.17,
  32: 1.16,
  33: 1.14,
  34: 1.13,
  35: 1.12,
  36: 1.11,
  37: 1.10,
  38: 1.09,
  39: 1.08,
  40: 1.07,
  41: 1.07,
  42: 1.07,
  43: 1.06,
  44: 1.06,
  45: 1.05,
  46: 1.05,
  47: 1.04,
  48: 1.03,
  49: 1.03,
  50: 1.03,
  51: 1.03,
  52: 1.03,
  53: 1.03,
  54: 1.03,
  55: 1.03,
  56: 1.02,
  57: 1.02,
  58: 1.02,
  59: 1.02,
  60: 1.02
};

// Соответствия продуктивности и расхода КЕ для молодняка КРС
export const youngCattleProductivityToConsumption: { [key: number]: number } = {
  350: 9.3,
  400: 9.1,
  450: 9.0,
  500: 8.8,
  550: 8.7,
  600: 8.7,
  650: 8.6,
  700: 8.5,
  750: 8.5,
  800: 8.4,
  850: 8.4,
  900: 8.3,
  950: 8.0,
  1000: 7.7,
  1050: 7.5,
  1100: 7.3,
  1150: 7.3,
  1200: 7.2,
};

export const validationSchema = Yup.object().shape({
  cows: Yup.object().shape({
    productivity: Yup.number()
      .min(25, 'Продуктивность должна быть не меньше 25')
      .max(60, 'Продуктивность должна быть не больше 60')
      .required('Обязательно для заполнения'),
    livestock: Yup.number()
      .test(
        'is-number',
        'Значение должно быть числом',
        (value) => !isNaN(Number(value))
      )
      .test(
        'is-positive',
        'Значение не может быть отрицательным',
        (value) => Number(value) >= 0
      )
      .required('Обязательно для заполнения'),
    consumptionOfFU: Yup.number()
      .test(
        'valid-consumption',
        'Неверное значение расхода продукции',
        function(value) {
          const { productivity } = this.parent as { productivity: number }; // Указываем тип данных
          const expectedConsumption = cowsProductivityToConsumption[productivity];
          return expectedConsumption !== undefined ? value === expectedConsumption : true;
        }
      )
      .required('Обязательно для заполнения'),
  }),
  youngCattle: Yup.object().shape({
    productivity: Yup.number()
      .test(
        'is-valid-productivity',
        'Значение должно быть одним из допустимых значений: 350, 400, 450, ... 1200',
        (value) => value !== undefined && Object.keys(youngCattleProductivityToConsumption).map(Number).includes(value)
      )
      .required('Обязательно для заполнения'),
    livestock: Yup.number()
      .test(
        'is-number',
        'Значение должно быть числом',
        (value) => !isNaN(Number(value))
      )
      .test(
        'is-positive',
        'Значение не может быть отрицательным',
        (value) => Number(value) >= 0
      )
      .required('Обязательно для заполнения'),
    consumptionOfFU: Yup.number()
      .test(
        'valid-consumption',
        'Неверное значение расхода продукции',
        function(value) {
          const { productivity } = this.parent as { productivity: number }; // Указываем тип данных
          const expectedConsumption = youngCattleProductivityToConsumption[productivity];
          return expectedConsumption !== undefined ? value === expectedConsumption : true;
        }
      )
      .required('Обязательно для заполнения'),
  }),
});
