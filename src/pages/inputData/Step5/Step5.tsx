import * as React from 'react';
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
} from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useFormik } from 'formik';
import { validationSchema } from './step5-validation';
import { useAppDispatch, useAppSelector } from '../../../state/store'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from '../InputData.styles';
import { StepsProps } from '../Step1/Step1';
import { setContractDeliveriesAC } from '../../../state/cultures/cultures-reducer'

const headers = ['Вид продукции', 'Договорные поставки, ц'];

type RowType = {
  contractDeliveries: number | '';
};

type FormType = {
  seeds: RowType;
  rape: RowType;
};

const isEmptyObject = (obj: any) => {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const Step5 = (props: StepsProps) => {
  const dispatch = useAppDispatch();
  const rape = useAppSelector(state => state.cultures.rape);
  const winterGrains = useAppSelector(state => state.cultures.winterGrains);
  const springGrains = useAppSelector(state => state.cultures.springGrains);

  // Determine boolean values
  const isRapeAvailable = !isEmptyObject(rape);
  const isSeedsAvailable = !isEmptyObject(winterGrains) || !isEmptyObject(springGrains);

  // Initialize form values
  const initialValues: FormType = {
    seeds: { contractDeliveries: isSeedsAvailable ? '' : 0 },
    rape: { contractDeliveries: isRapeAvailable ? '' : 0 },
  };

  const formik = useFormik<FormType>({
    initialValues,
    validationSchema,
    onSubmit: values => {
      dispatch(setContractDeliveriesAC('rape', Number(values.rape.contractDeliveries)));
      dispatch(setContractDeliveriesAC('seeds', Number(values.seeds.contractDeliveries)));
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
              <TableRow>
                <TableCell>Рапс</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="rape.contractDeliveries"
                    value={formik.values.rape.contractDeliveries}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.rape?.contractDeliveries && formik.errors.rape?.contractDeliveries)}
                    helperText={formik.touched.rape?.contractDeliveries && formik.errors.rape?.contractDeliveries}
                    disabled={!isRapeAvailable}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Зерно</TableCell>
                <TableCell>
                  <TextField
                    fullWidth
                    name="seeds.contractDeliveries"
                    value={formik.values.seeds.contractDeliveries}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={Boolean(formik.touched.seeds?.contractDeliveries && formik.errors.seeds?.contractDeliveries)}
                    helperText={formik.touched.seeds?.contractDeliveries && formik.errors.seeds?.contractDeliveries}
                    disabled={!isSeedsAvailable}
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
  );
};