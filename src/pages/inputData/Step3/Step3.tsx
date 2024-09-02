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
import { useAppDispatch } from '../../../state/store'
import {
  AnimalType,
  setConsumptionOfFUAC,
  setLivestockAC,
  setProductivityAC,
} from '../../../state/animals/animals-reducer'
import * as Yup from 'yup';

type RowType = {
  [K in keyof AnimalType]: AnimalType[K] | string;
};

type FormValues = {
  cows: RowType
  youngCattle: RowType
}

const headers = ['Вид животных', 'Продуктивность (базовая), ц', 'Поголовье, гол.', 'Расход ц КЕ на 1 ц продукции']

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

const validationSchema = Yup.object().shape({
  cows: animalValidationSchema,
  youngCattle: animalValidationSchema,
});


export const Step3 = (props: StepsProps) => {
  const dispatch = useAppDispatch();
  const formik = useFormik<FormValues>({
    initialValues: {
      cows: { productivity: '', livestock: '', consumptionOfFU: '' },
      youngCattle: { productivity: '', livestock: '', consumptionOfFU: '' },
    },
    validationSchema,
    onSubmit: (values) => {
      // Диспатчим значения из формы в animalsReducer
      dispatch(setProductivityAC('Коровы', Number(values.cows.productivity)));
      dispatch(setLivestockAC('Коровы', Number(values.cows.livestock)));
      dispatch(setConsumptionOfFUAC('Коровы', Number(values.cows.consumptionOfFU)));

      dispatch(setProductivityAC('Молодняк КРС', Number(values.youngCattle.productivity)));
      dispatch(setLivestockAC('Молодняк КРС', Number(values.youngCattle.livestock)));
      dispatch(setConsumptionOfFUAC('Молодняк КРС', Number(values.youngCattle.consumptionOfFU)));
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
              <TableRow>
                <TableCell>Коровы</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.cows.productivity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="cows.productivity"
                    error={formik.touched.cows?.productivity && Boolean(formik.errors.cows?.productivity)}
                    helperText={formik.touched.cows?.productivity && formik.errors.cows?.productivity}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.cows.livestock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="cows.livestock"
                    error={formik.touched.cows?.livestock && Boolean(formik.errors.cows?.livestock)}
                    helperText={formik.touched.cows?.livestock && formik.errors.cows?.livestock}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.cows.consumptionOfFU}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="cows.consumptionOfFU"
                    error={formik.touched.cows?.consumptionOfFU && Boolean(formik.errors.cows?.consumptionOfFU)}
                    helperText={formik.touched.cows?.consumptionOfFU && formik.errors.cows?.consumptionOfFU}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Молодняк КРС</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.youngCattle.productivity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="youngCattle.productivity"
                    error={formik.touched.youngCattle?.productivity && Boolean(formik.errors.youngCattle?.productivity)}
                    helperText={formik.touched.youngCattle?.productivity && formik.errors.youngCattle?.productivity}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.youngCattle.livestock}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="youngCattle.livestock"
                    error={formik.touched.youngCattle?.livestock && Boolean(formik.errors.youngCattle?.livestock)}
                    helperText={formik.touched.youngCattle?.livestock && formik.errors.youngCattle?.livestock}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.youngCattle.consumptionOfFU}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="youngCattle.consumptionOfFU"
                    error={formik.touched.youngCattle?.consumptionOfFU && Boolean(formik.errors.youngCattle?.consumptionOfFU)}
                    helperText={formik.touched.youngCattle?.consumptionOfFU && formik.errors.youngCattle?.consumptionOfFU}
                  />
                </TableCell>
              </TableRow>
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
                    type="submit"
                    disabled={false}>Далее</Button>
          </Box>
        </Box>
      </Box>
    </form>
  )
}