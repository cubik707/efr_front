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
import {
  cowsProductivityToConsumption,
  validationSchema,
  youngCattleProductivityToConsumption,
} from './step3-validation'

type RowType = {
  [K in keyof AnimalType]: AnimalType[K] | string;
};

type FormValues = {
  cows: RowType
  youngCattle: RowType
}

const headers = ['Вид животных', 'Продуктивность (базовая), ц', 'Поголовье, гол.', 'Расход ц КЕ на 1 ц продукции']

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
      dispatch(setProductivityAC('cows', Number(values.cows.productivity)));
      dispatch(setLivestockAC('cows', Number(values.cows.livestock)));
      dispatch(setConsumptionOfFUAC('cows', Number(values.cows.consumptionOfFU)));

      dispatch(setProductivityAC('youngCattle', Number(values.youngCattle.productivity)));
      dispatch(setLivestockAC('youngCattle', Number(values.youngCattle.livestock)));
      dispatch(setConsumptionOfFUAC('youngCattle', Number(values.youngCattle.consumptionOfFU)));
      props.onNext()
    },
  })

  // Обработчик изменения поля продуктивности
  const getConsumptionOfFU = (productivity: string | number, animal: 'cows' | 'youngCattle') => {
    const productivityNum = Number(productivity);
    if(animal === 'cows'){
      return cowsProductivityToConsumption[productivityNum] || '';
    }
    if(animal === 'youngCattle'){
      return youngCattleProductivityToConsumption[productivityNum] || ''
    }

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
              <TableRow>
                <TableCell>Коровы</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.cows.productivity}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue('cows.consumptionOfFU', getConsumptionOfFU(e.target.value, 'cows'));
                    }}
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
                  {/* Display consumption as text */}
                  <Box>{getConsumptionOfFU(formik.values.cows.productivity, 'cows')}</Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Молодняк КРС</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    value={formik.values.youngCattle.productivity}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.setFieldValue('youngCattle.consumptionOfFU', getConsumptionOfFU(e.target.value, 'youngCattle'));
                    }}
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
                  {/* Display consumption as text */}
                  <Box>{getConsumptionOfFU(formik.values.youngCattle.productivity, 'youngCattle')}</Box>
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
  );
}