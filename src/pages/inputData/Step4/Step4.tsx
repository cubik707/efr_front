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
import { FeedName, FeedType } from '../../../state/feeds/feeds-reducer'
import { validationSchema } from './step4-validation'
import { feedNames } from './feedsName'

type RowType = {
  [K in keyof FeedType]: FeedType[K] | string;
};

type FormValues = {
  [K in FeedName]: RowType
}

const headers = ['Вид корма', 'Объем, ц', 'Цена, руб.']

const feedNamesInRussian: Record<FeedName, string> = {
  concentrates: 'Концентраты',
  silo: 'Силос',
  greenFodder: 'Зеленый корм',
  hay: 'Сено',
  haylage: 'Сенаж',
  straw: 'Солома',
}


export const Step4 = (props: StepsProps) => {

  const formik = useFormik<FormValues>({
    initialValues: {
      concentrates: { volume: '', price: '' },
      silo: { volume: '', price: '' },
      greenFodder: { volume: '', price: '' },
      hay: { volume: '', price: '' },
      haylage: { volume: '', price: '' },
      straw: { volume: '', price: '' },
    },
    validationSchema,
    onSubmit: (values) => {
      props.onNext()
    },
  })

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
              {feedNames.map((feedName, index) => (
                <TableRow key={index}>
                  <TableCell>{feedNamesInRussian[feedName]}</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name={`${feedName}.volume`}
                      value={formik.values[feedName].volume}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched[feedName]?.volume && Boolean(formik.errors[feedName]?.volume)}
                      helperText={formik.touched[feedName]?.volume && formik.errors[feedName]?.volume}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name={`${feedName}.price`}
                      value={formik.values[feedName].price}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={formik.touched[feedName]?.price && Boolean(formik.errors[feedName]?.price)}
                      helperText={formik.touched[feedName]?.price && formik.errors[feedName]?.price}
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
            <Button variant="text"
                    startIcon={<KeyboardArrowLeftIcon />}
                    onClick={props.onBack}
                    disabled={props.activeStep === 0}>Назад</Button>
            <Button variant="contained"
                    endIcon={<KeyboardArrowRightIcon />}
                    onClick={props.onNext}
                    disabled={false}>Далее</Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}