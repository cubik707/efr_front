import * as React from 'react'
import { useState } from 'react'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from '../InputData.styles'
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
} from '@mui/material'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from '../Step1/Step1'
import { AddBox } from '@mui/icons-material'
import { CultureSelect } from './CultureSelect'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { useAppDispatch } from '../../../state/store'
import { FormikErrors, FormikTouched, useFormik } from 'formik'
import * as Yup from 'yup'

const headers = [
  'Культура',
  'Урожайность прогнозная, ц/га ',
  'в т.ч. на корм',
  'в т.ч. на товар',
  'в т.ч. на семена',
]

// Схема валидации с использованием Yup
const validationSchema = Yup.object().shape({
  rows: Yup.array().of(
    Yup.object({
      culture: Yup.string().required('Выберите культуру'),
      yield: Yup.mixed().test(
        'is-number',
        'Значение должно быть числом',
        (value) => value === '' || !isNaN(Number(value)),
      ).required('Обязательно для заполнения'),
      fodder: Yup.mixed().test(
        'is-number',
        'Значение должно быть числом',
        (value) => value === '' || !isNaN(Number(value)),
      ).required('Обязательно для заполнения'),
      commodity: Yup.mixed().test(
        'is-number',
        'Значение должно быть числом',
        (value) => value === '' || !isNaN(Number(value)),
      ).required('Обязательно для заполнения'),
      seeds: Yup.mixed().test(
        'is-number',
        'Значение должно быть числом',
        (value) => value === '' || !isNaN(Number(value)),
      ).required('Обязательно для заполнения'),
    })
  ).min(1, 'Должен быть хотя бы один ряд'),
});

// Определение типа строки
type RowType = {
  culture: string;
  yield: number | '';
  fodder: number | '';
  commodity: number | '';
  seeds: number | '';
};

interface FormValues {
  rows: RowType[];
}

export const Step2: React.FC<StepsProps> = (props) => {
  const formik = useFormik<FormValues>({
    initialValues: { rows: [{ culture: '', yield: '', fodder: '', commodity: '', seeds: '' }] },
    validationSchema,
    onSubmit: (values) => {
      props.onNext();
    },
  });

  const handleAddRow = () => {
    formik.setFieldValue('rows', [
      ...formik.values.rows,
      { culture: '', yield: '', fodder: '', commodity: '', seeds: '' }
    ]);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = formik.values.rows.filter((_, rowIndex) => rowIndex !== index);
    formik.setFieldValue('rows', newRows);
  };

  const handleInputChange = (index: number, field: keyof RowType, value: string) => {
    const newRows = formik.values.rows.map((row, rowIndex) =>
      rowIndex === index ? { ...row, [field]: value } : row
    );
    formik.setFieldValue('rows', newRows);
  };
  // Access errors and touched with type safety
  const getError = (rowIndex: number, field: keyof RowType) =>
    formik.errors.rows && (formik.errors.rows as FormikErrors<RowType[]>)[rowIndex]?.[field]

  const isTouched = (rowIndex: number, field: keyof RowType) =>
    formik.touched.rows && (formik.touched.rows as FormikTouched<RowType[]>)[rowIndex]?.[field]

  const getSelectedCultures = (): string[] => {
    return formik.values.rows.map(row => row.culture).filter(culture => culture !== '');
  };

  return (
    <form style={{ width: '100%' }} onSubmit={formik.handleSubmit}>
      <Box sx={containerSx}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headers.map((header, index) => (
                  <TableCell key={index} style={{ whiteSpace: 'nowrap' }}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {formik.values.rows.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                    <Box display="flex" alignItems="center">
                      {rowIndex === formik.values.rows.length - 1 ? (
                        <IconButton color="primary" onClick={handleAddRow} size="small">
                          <AddBox />
                        </IconButton>
                      ) : (
                        <IconButton color="secondary" onClick={() => handleDeleteRow(rowIndex)} size="small">
                          <IndeterminateCheckBoxIcon />
                        </IconButton>
                      )}
                      <CultureSelect
                        value={row.culture}
                        onChange={(value) => handleInputChange(rowIndex, 'culture', value)}
                        onBlur={formik.handleBlur}
                        error={Boolean(isTouched(rowIndex, 'culture') && getError(rowIndex, 'culture'))}
                        selectedCultures={getSelectedCultures()}
                        helperText={isTouched(rowIndex, 'culture') && getError(rowIndex, 'culture')}
                      />
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].yield`}
                      value={row.yield}
                      onChange={(e) => handleInputChange(rowIndex, 'yield', e.target.value)}
                      onBlur={formik.handleBlur}
                      error={Boolean(isTouched(rowIndex, 'yield') && getError(rowIndex, 'yield'))}
                      helperText={isTouched(rowIndex, 'yield') && getError(rowIndex, 'yield')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].fodder`}
                      value={row.fodder}
                      onChange={(e) => handleInputChange(rowIndex, 'fodder', e.target.value)}
                      onBlur={formik.handleBlur}
                      error={Boolean(isTouched(rowIndex, 'fodder') && getError(rowIndex, 'fodder'))}
                      helperText={isTouched(rowIndex, 'fodder') && getError(rowIndex, 'fodder')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].commodity`}
                      value={row.commodity}
                      onChange={(e) => handleInputChange(rowIndex, 'commodity', e.target.value)}
                      onBlur={formik.handleBlur}
                      error={Boolean(isTouched(rowIndex, 'commodity') && getError(rowIndex, 'commodity'))}
                      helperText={isTouched(rowIndex, 'commodity') && getError(rowIndex, 'commodity')}
                      fullWidth
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`rows[${rowIndex}].seeds`}
                      value={row.seeds}
                      onChange={(e) => handleInputChange(rowIndex, 'seeds', e.target.value)}
                      onBlur={formik.handleBlur}
                      error={Boolean(isTouched(rowIndex, 'seeds') && getError(rowIndex, 'seeds'))}
                      helperText={isTouched(rowIndex, 'seeds') && getError(rowIndex, 'seeds')}
                      fullWidth
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box sx={buttonContainerSx}>
          <Button variant="outlined" disabled={true}>Найти оптимальные параметры</Button>
          <Box sx={navigationButtonsContainerSx}>
            <Button
              variant="text"
              startIcon={<KeyboardArrowLeftIcon />}
              onClick={props.onBack}
              disabled={props.activeStep === 0}
            >
              Назад
            </Button>
            <Button
              variant="contained"
              endIcon={<KeyboardArrowRightIcon />}
              type="submit" // Ensure the button triggers form submission
            >
              Далее
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  );
};
