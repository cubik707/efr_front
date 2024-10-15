import * as React from 'react'
import {
  buttonContainerSx,
  containerSx,
  navigationButtonsContainerSx,
} from '../InputData.styles'
import {
  Box,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from '../Step1/Step1'
import { AddBox } from '@mui/icons-material'
import { CultureSelect } from './CultureSelect'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
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

const headers = [
  'Культура',
  'Урожайность прогнозная, ц/га',
  'в т.ч. на корм',
  'в т.ч. на товар',
  'в т.ч. на семена',
]

// Определение типа строки
type RowType = {
  culture: CultureNames | ''
  yield: number | ''
  fodder: number | ''
  commodity: number | ''
  seeds: number | ''
}

interface FormValues {
  rows: RowType[]
}

export const Step2: React.FC<StepsProps> = (props) => {
  const dispatch = useAppDispatch()
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  const formik = useFormik<FormValues>({
    initialValues: {
      rows: [{ culture: '', yield: '', fodder: '', commodity: '', seeds: '' }],
    },
    validationSchema,
    onSubmit: (values) => {
      const selectedCultures = values.rows
        .map((row) => row.culture)
        .filter((culture) => culture !== '')
      const allCultures = culturesArray.map((culture) => culture.value)

      const missingCultures = allCultures.filter(
        (culture) => !selectedCultures.includes(culture as '' | CultureNames)
      )

      if (missingCultures.length > 0) {
        setErrorMessage('Все культуры должны быть выбраны.')
        return
      }

      // Отправка данных в store через dispatch
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

  const handleAddRow = () => {
    if (formik.values.rows.length < culturesArray.length) {
      formik.setFieldValue('rows', [
        ...formik.values.rows,
        { culture: '', yield: '', fodder: '', commodity: '', seeds: '' },
      ])
    }
  }

  const handleDeleteRow = (index: number) => {
    const newRows = formik.values.rows.filter(
      (_, rowIndex) => rowIndex !== index
    )
    formik.setFieldValue('rows', newRows)
  }

  const handleInputChange = (
    index: number,
    field: keyof RowType,
    value: string
  ) => {
    // Update the specific field in the row
    const newRows = formik.values.rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    )

    // Get the updated row
    const updatedRow = newRows[index]

    if (field === 'culture') {
      // Reset fields when culture changes
      newRows[index] = {
        culture: value as CultureNames,
        yield: 0,
        fodder: 0,
        commodity: 0,
        seeds: getSeedsValueForCulture(value as CultureNames),
      }
    } else {
      // Convert string values to numbers
      const fodderValue = Number(updatedRow.fodder) || 0
      const commodityValue = Number(updatedRow.commodity) || 0
      const seedsValue = Number(updatedRow.seeds) || 0

      // Calculate the new forecast yield as the sum of fodder, commodity, and seeds
      const newYield = fodderValue + commodityValue + seedsValue

      // Update the yield in the row
      newRows[index] = {
        ...updatedRow,
        yield: newYield,
      }
    }

    // Update the formik state
    formik.setFieldValue('rows', newRows)
  }

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

  const getError = (rowIndex: number, field: keyof RowType) =>
    formik.errors.rows &&
    (formik.errors.rows as FormikErrors<RowType[]>)[rowIndex]?.[field]

  const isTouched = (rowIndex: number, field: keyof RowType) =>
    formik.touched.rows &&
    (formik.touched.rows as FormikTouched<RowType[]>)[rowIndex]?.[field]

  const getSelectedCultures = (): string[] => {
    return formik.values.rows
      .map((row) => row.culture)
      .filter((culture) => culture !== '')
  }

  const isAddRowDisabled = () => {
    return formik.values.rows.length >= culturesArray.length
  }

  // Проверка доступности полей
  const isCommodityFieldDisabled = (culture: CultureNames) => {
    return !['winterGrains', 'springGrains', 'rape'].includes(culture)
  }

  const isFodderFieldDisabled = (culture: CultureNames) => {
    return culture === 'rape'
  }

  return (
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
                <TableRow key={rowIndex}>
                  <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                    <Box
                      display='flex'
                      alignItems='center'
                    >
                      {rowIndex === formik.values.rows.length - 1 ? (
                        <IconButton
                          color='primary'
                          onClick={handleAddRow}
                          size='small'
                          disabled={isAddRowDisabled()}
                        >
                          <AddBox />
                        </IconButton>
                      ) : (
                        <IconButton
                          color='secondary'
                          onClick={() => handleDeleteRow(rowIndex)}
                          size='small'
                        >
                          <IndeterminateCheckBoxIcon />
                        </IconButton>
                      )}
                      <CultureSelect
                        value={row.culture}
                        onChange={(value) =>
                          handleInputChange(rowIndex, 'culture', value)
                        }
                        onBlur={formik.handleBlur}
                        error={Boolean(
                          isTouched(rowIndex, 'culture') &&
                            getError(rowIndex, 'culture')
                        )}
                        selectedCultures={getSelectedCultures()}
                        helperText={
                          isTouched(rowIndex, 'culture') &&
                          getError(rowIndex, 'culture')
                        }
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>{Number(row.yield).toFixed(1)}</Box>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].fodder`}
                      value={row.fodder}
                      onChange={(e) =>
                        handleInputChange(rowIndex, 'fodder', e.target.value)
                      }
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        isTouched(rowIndex, 'fodder') &&
                          getError(rowIndex, 'fodder')
                      )}
                      helperText={
                        isTouched(rowIndex, 'fodder') &&
                        getError(rowIndex, 'fodder')
                      }
                      disabled={isFodderFieldDisabled(
                        row.culture as CultureNames
                      )}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].commodity`}
                      value={row.commodity}
                      onChange={(e) =>
                        handleInputChange(rowIndex, 'commodity', e.target.value)
                      }
                      onBlur={formik.handleBlur}
                      error={Boolean(
                        isTouched(rowIndex, 'commodity') &&
                          getError(rowIndex, 'commodity')
                      )}
                      helperText={
                        isTouched(rowIndex, 'commodity') &&
                        getError(rowIndex, 'commodity')
                      }
                      fullWidth
                      disabled={isCommodityFieldDisabled(
                        row.culture as CultureNames
                      )}
                    />
                  </TableCell>
                  <TableCell>{row.seeds}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {errorMessage && <Typography color='error'>{errorMessage}</Typography>}
        <Box sx={navigationButtonsContainerSx}>
          <Button
            variant='outlined'
            color='primary'
            startIcon={<KeyboardArrowLeftIcon />}
            onClick={props.onBack}
          >
            Назад
          </Button>
          <Button
            variant='contained'
            color='primary'
            endIcon={<KeyboardArrowRightIcon />}
            type='submit'
          >
            Далее
          </Button>
        </Box>
      </Box>
    </form>
  )
}
