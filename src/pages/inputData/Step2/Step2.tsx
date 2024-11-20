import * as React from 'react'
import { useCallback } from 'react'
import { containerSx, navigationButtonsContainerSx } from '../InputData.styles'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from '../Step1/Step1'
import { useAppDispatch } from '../../../state/store'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import {
  CultureNames,
  setOnFeedAC,
  setOnProductAC,
  setOnSeedsAC,
  setYieldForecastAC,
} from '../../../state/cultures/cultures-reducer'
import { validationSchema } from './step2-validation'
import { culturesArray } from './inputCultures'
import { RowType, TableRowMemo } from './TableRowMemo'

const headers = [
  'Культура',
  'Урожайность прогнозная, ц/га',
  'в т.ч. на корм',
  'в т.ч. на товар',
  'в т.ч. на семена',
]


interface FormValues {
  rows: RowType[]
}

/**
 * Компонент `Step2` отвечает за отображение и обработку данных для второго шага формы.
 * Включает в себя таблицу, где пользователь может вводить данные о культурах, их урожайности и распределении.
 */
export const Step2: React.FC<StepsProps> = (props) => {
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  /**
   * Инициализация `formik` для управления состоянием формы, включая валидацию
   * и обработку отправки данных.
   */
  const formik = useFormik<FormValues>({
    initialValues: {
      rows: [{ culture: '', yield: '', fodder: '', commodity: '', seeds: '' }],
    },
    validationSchema, // Схема валидации данных
    onSubmit: (values) => {
      /**
       * Проверка, выбраны ли все культуры. Если хотя бы одна не выбрана, отображается ошибка.
       */
      const selectedCultures = values.rows
        .map((row) => row.culture)
        .filter((culture) => culture !== '')
      const allCultures = culturesArray.map((culture) => culture.value)

      const missingCultures = allCultures.filter(
        (culture) => !selectedCultures.includes(culture as '' | CultureNames),
      )

      if (missingCultures.length > 0) {
        setErrorMessage('Все культуры должны быть выбраны.')
        return
      }

      /**
       * Отправка данных в Redux store через `dispatch` для каждой строки данных.
       */
      values.rows.forEach((row) => {
        if (row.culture) {
          dispatch(setYieldForecastAC(row.culture, Number(row.yield)))
          dispatch(setOnFeedAC(row.culture, Number(row.fodder)))
          dispatch(setOnProductAC(row.culture, Number(row.commodity)))
          dispatch(setOnSeedsAC(row.culture, Number(row.seeds)))
        }
      })

      // Переход на следующий шаг
      props.onNext()
    },
  })

  /**
   * Добавление новой строки в таблицу, если количество строк меньше количества культур.
   */
  const handleAddRow = useCallback(() => {
    if (formik.values.rows.length < culturesArray.length) {
      formik.setFieldValue('rows', [
        ...formik.values.rows,
        { culture: '', yield: '', fodder: '', commodity: '', seeds: '' },
      ])
    }
  }, [formik])

  /**
   * Удаление строки из таблицы по индексу.
   */
  const handleDeleteRow = useCallback((index: number) => {
    const newRows = formik.values.rows.filter(
      (_, rowIndex) => rowIndex !== index,
    )
    formik.setFieldValue('rows', newRows)
  }, [formik])

  /**
   * Обработка изменения значения в поле таблицы. При изменении культуры сбрасываются
   * связанные поля. Урожайность пересчитывается как сумма полей "на корм", "на товар" и "на семена".
   */
  const handleInputChange = useCallback((
    index: number,
    field: keyof RowType,
    value: string,
  ) => {
    // Получаем текущую строку из formik.values.rows
    const currentRow = formik.values.rows[index];

    if (field === 'culture') {
      // Если изменяется поле "culture", сбрасываем другие значения и задаем новое
      formik.setFieldValue(`rows[${index}]`, {
        culture: value as CultureNames,
        yield: 0,
        fodder: 0,
        commodity: 0,
        seeds: getSeedsValueForCulture(value as CultureNames),
      });
    } else {
      // Для других полей обновляем только конкретное значение
      const updatedFieldValues = {
        ...currentRow,
        [field]: value,
      };

      // Пересчитываем итоговую урожайность
      const fodderValue = Number(updatedFieldValues.fodder) || 0;
      const commodityValue = Number(updatedFieldValues.commodity) || 0;
      const seedsValue = Number(updatedFieldValues.seeds) || 0;

      // Устанавливаем обновлённую строку с пересчитанной урожайностью
      formik.setFieldValue(`rows[${index}]`, {
        ...updatedFieldValues,
        yield: fodderValue + commodityValue + seedsValue,
      });
    }
  }, [formik])

  /**
   * Возвращает значение поля "на семена" по умолчанию в зависимости от выбранной культуры.
   */
  const getSeedsValueForCulture = (culture: CultureNames) => {
    switch (culture) {
      case 'winterGrains':
      case 'springGrains':
        return 3.0
      case 'pulses':
        return 3.5
      default:
        return 0
    }
  }

  /**
   * Получение ошибки для конкретного поля в строке.
   */
  const getError = (rowIndex: number, field: keyof RowType) =>
    formik.errors.rows &&
    (formik.errors.rows as FormikErrors<RowType[]>)[rowIndex]?.[field]

  /**
   * Проверка, был ли изменён конкретный элемент.
   */
  const isTouched = (rowIndex: number, field: keyof RowType): boolean =>
    !!(formik.touched.rows &&
      (formik.touched.rows as FormikTouched<RowType[]>)[rowIndex]?.[field])

  /**
   * Получение списка выбранных культур.
   */
  const getSelectedCultures = (): string[] => {
    return formik.values.rows
      .map((row) => row.culture)
      .filter((culture) => culture !== '')
  }

  /**
   * Проверка, доступно ли добавление новой строки.
   */
  const isAddRowDisabled = () => {
    return formik.values.rows.length >= culturesArray.length
  }

  /**
   * Проверка, заблокировано ли поле "на товар" для выбранной культуры.
   */
  const isCommodityFieldDisabled = (culture: CultureNames) => {
    return !['winterGrains', 'springGrains', 'rape'].includes(culture)
  }

  /**
   * Проверка, заблокировано ли поле "на корм" для выбранной культуры.
   */
  const isFodderFieldDisabled = (culture: CultureNames) => {
    return culture === 'rape'
  }

  return (
    /**
     * Форма включает в себя таблицу для ввода данных и кнопки для навигации между шагами.
     */
    <form
      style={{ width: '100%' }}
      onSubmit={formik.handleSubmit}
    >
      <Box sx={containerSx}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell
                    key={index}
                    style={{ whiteSpace: 'nowrap' }}
                  >
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.rows.map((row, rowIndex) => (
                <TableRowMemo
                  key={rowIndex}
                  row={row}
                  rowIndex={rowIndex}
                  handleInputChange={handleInputChange}
                  handleAddRow={handleAddRow}
                  handleDeleteRow={handleDeleteRow}
                  getError={getError}
                  isTouched={isTouched}
                  isAddRowDisabled={isAddRowDisabled}
                  isFodderFieldDisabled={isFodderFieldDisabled}
                  isCommodityFieldDisabled={isCommodityFieldDisabled}
                  getSelectedCultures={getSelectedCultures}
                />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {errorMessage && <Typography color="error">{errorMessage}</Typography>}
        <Box sx={navigationButtonsContainerSx}>
          <Button
            variant="outlined"
            color="primary"
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={props.onBack}
          >
            Назад
          </Button>
          <Button
            variant="contained"
            color="primary"
            endIcon={<KeyboardArrowRightIcon />}
            type="submit"
          >
            Далее
          </Button>
        </Box>
      </Box>
    </form>
  )
}

