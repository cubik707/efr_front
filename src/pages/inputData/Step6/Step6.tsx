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
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { CultureNames, setCostPriceAC, setSellingPricePerCentAC } from '../../../state/cultures/cultures-reducer'
import { cultures } from '../../../state/cultures/cultures'
import { disabledPriceCultures } from './disabledCultures'
import {
  LivestockProductName,
  setCostPriceLivestockAC,
  setSellingPricePerCentLivestockAC,
} from '../../../state/livestockProducts/livestockProducts-reducer'
import { gatherData } from './gatherData'


const headers = ['Вид продукции', 'Цена реализации за ц, руб.', 'Себестоимость за 1ц, руб.']

type RowType = {
  sellingPricePerCent?: number | ''; // цена реализации продукции за ц
  costPrice: number | ''; // себестоимость
}

type FormType = {
  [k in CultureNames | LivestockProductName]: RowType
}

export const Step6 = (props: StepsProps) => {
  const state = useAppSelector(state => state);
  const cultureNames = Object.keys(cultures) as CultureNames[];
  const dispatch = useAppDispatch();


  // Создание начального состояния для Formik
  const initialValues: FormType = {
    ...cultureNames.reduce((acc, culture) => {
      acc[culture] = {
        sellingPricePerCent: '',
        costPrice: '',
      };
      return acc;
    }, {} as FormType),
    milk: {
      sellingPricePerCent: '',
      costPrice: '',
    },
    cattleMeat: {
      sellingPricePerCent: '',
      costPrice: '',
    },
  };

  const formik = useFormik<FormType>({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      console.log(values)
      Object.keys(values).forEach((culture) => {
        const value = values[culture as CultureNames | LivestockProductName];
        if (value.sellingPricePerCent !== undefined) {
          if (culture === 'milk' || culture === 'cattleMeat') {
            dispatch(setSellingPricePerCentLivestockAC(culture as LivestockProductName, Number(value.sellingPricePerCent)));
          } else {
            dispatch(setSellingPricePerCentAC(culture as CultureNames, Number(value.sellingPricePerCent)));
          }
        }
        if (value.costPrice !== undefined) {
          if (culture === 'milk' || culture === 'cattleMeat') {
            dispatch(setCostPriceLivestockAC(culture as LivestockProductName, Number(value.costPrice)));
          } else {
            dispatch(setCostPriceAC(culture as CultureNames, Number(value.costPrice)));
          }
        }
      });
      await gatherData(state);
      props.onNext();
    },
  });
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
                      disabled={disabledPriceCultures.includes(cult)}
                      name={`${cult}.costPrice`}
                      value={formik.values[cult]?.costPrice || ''}
                      onChange={(e) => formik.setFieldValue(`${cult}.costPrice`, e.target.value)}
                      fullWidth
                      error={formik.touched[cult]?.costPrice && Boolean(formik.errors[cult]?.costPrice)}
                      helperText={formik.touched[cult]?.costPrice && formik.errors[cult]?.costPrice}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      name={`${cult}.sellingPricePerCent`}
                      value={formik.values[cult]?.sellingPricePerCent || ''}
                      onChange={(e) => formik.setFieldValue(`${cult}.sellingPricePerCent`, e.target.value)}
                      fullWidth

                      error={formik.touched[cult]?.sellingPricePerCent && Boolean(formik.errors[cult]?.sellingPricePerCent)}
                      helperText={formik.touched[cult]?.sellingPricePerCent && formik.errors[cult]?.sellingPricePerCent}
                    />
                  </TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell>Молоко</TableCell>
                <TableCell>
                  <TextField
                    name="milk.costPrice"
                    value={formik.values.milk.costPrice}
                    onChange={(e) => formik.setFieldValue('milk.costPrice', e.target.value)}
                    fullWidth
                    error={formik.touched.milk?.costPrice && Boolean(formik.errors.milk?.costPrice)}
                    helperText={formik.touched.milk?.costPrice && formik.errors.milk?.costPrice}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="milk.sellingPricePerCent"
                    value={formik.values.milk.sellingPricePerCent}
                    onChange={(e) => formik.setFieldValue('milk.sellingPricePerCent', e.target.value)}
                    fullWidth
                    error={formik.touched.milk?.sellingPricePerCent && Boolean(formik.errors.milk?.sellingPricePerCent)}
                    helperText={formik.touched.milk?.sellingPricePerCent && formik.errors.milk?.sellingPricePerCent}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Мясо</TableCell>
                <TableCell>
                  <TextField
                    name="cattleMeat.costPrice"
                    value={formik.values.cattleMeat.costPrice}
                    onChange={(e) => formik.setFieldValue('cattleMeat.costPrice', e.target.value)}
                    fullWidth
                    error={formik.touched.cattleMeat?.costPrice && Boolean(formik.errors.cattleMeat?.costPrice)}
                    helperText={formik.touched.cattleMeat?.costPrice && formik.errors.cattleMeat?.costPrice}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    name="cattleMeat.sellingPricePerCent"
                    value={formik.values.cattleMeat.sellingPricePerCent}
                    onChange={(e) => formik.setFieldValue('cattleMeat.sellingPricePerCent', e.target.value)}
                    fullWidth
                    error={formik.touched.cattleMeat?.sellingPricePerCent && Boolean(formik.errors.cattleMeat?.sellingPricePerCent)}
                    helperText={formik.touched.cattleMeat?.sellingPricePerCent && formik.errors.cattleMeat?.sellingPricePerCent}
                  />
                </TableCell>
              </TableRow>
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