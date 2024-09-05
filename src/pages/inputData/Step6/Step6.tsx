// @flow
import * as React from 'react'
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
  TextField,
} from '@mui/material'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from '../InputData.styles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from '../Step1/Step1'
import { useFormik } from 'formik'
import { validationSchema } from './step6-validation'
import { useAppSelector } from '../../../state/store'
import { CultureNames } from '../../../state/cultures/cultures-reducer'
import { cultures } from '../../../state/cultures/cultures'
import { disabledPriceCultures } from './disabledCultures'


const headers = ['Вид продукции', 'Цена реализации за ц, руб.', 'Себестоимость за 1ц, руб.']

type RowType = {
  sellingPricePerCent?: number | ''; // цена реализации продукции за ц
  costPrice: number | ''; // себестоимость
}

type FormType = {
  [k in CultureNames]: RowType
}

export const Step6 = (props: StepsProps) => {
  const culturesState = useAppSelector((state) => state.cultures);
  const cultureNames = Object.keys(culturesState).filter(culture => culture !== 'seeds') as CultureNames[];

  // Создание начального состояния для Formik
  const initialValues: FormType = cultureNames.reduce((acc, culture) => {
    acc[culture] = {
      sellingPricePerCent: '',
      costPrice: '',
    };
    return acc;
  }, {} as FormType);

  const formik = useFormik<FormType>({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      props.onNext();
    },
  });
  console.log(cultureNames)
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
              {cultureNames.map((cult:CultureNames, index) => (
                <TableRow key={index}>
                  <TableCell>{cultures[cult as keyof typeof cultures]}</TableCell>
                  <TableCell>
                    <TextField
                      name={`${cult}.sellingPricePerCent`}
                      value={formik.values[cult].sellingPricePerCent}
                      onChange={(e) => formik.setFieldValue(`${cult}.sellingPricePerCent`, e.target.value)}
                      fullWidth
                      disabled={disabledPriceCultures.includes(cult)}
                      error={formik.touched[cult]?.sellingPricePerCent && Boolean(formik.errors[cult]?.sellingPricePerCent)}
                      helperText={formik.touched[cult]?.sellingPricePerCent && formik.errors[cult]?.sellingPricePerCent}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`${cult}.costPrice`}
                      value={formik.values[cult].costPrice}
                      onChange={(e) => formik.setFieldValue(`${cult}.costPrice`, e.target.value)}
                      fullWidth
                      error={formik.touched[cult]?.costPrice && Boolean(formik.errors[cult]?.costPrice)}
                      helperText={formik.touched[cult]?.costPrice && formik.errors[cult]?.costPrice}
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
              type="submit"
            >
              Далее
            </Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}