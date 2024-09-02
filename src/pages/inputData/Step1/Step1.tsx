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
import { useAppDispatch } from '../../../state/store'
import {
  LandResourcesType,
  setArableLandAC,
  setHayfieldsAndPastureImprovedAC,
  setHayfieldsAndPastureNaturalAC,
} from '../../../state/landResources/landResources-reducer'
import { useFormik } from 'formik'
import { validationSchema } from './step1-validation'

export type StepsProps = {
  activeStep: number;
  onBack: () => void;
  onNext: () => void;
};

const headers = ['Показатели', 'Наличие']

export const Step1 = (props: StepsProps) => {
  const dispatch = useAppDispatch();

  type LandResourcesFormType = {
    [K in keyof LandResourcesType]: LandResourcesType[K] | string;
  };

  const formik = useFormik<LandResourcesFormType>({
    initialValues: {
      arableLand: '',  // Изначально пустые строки
      hayfieldsAndPastureImproved: '',
      hayfieldsAndPastureNatural: '',
    },
    validationSchema,
    onSubmit:  (values) => {
      dispatch(setArableLandAC(Number(values.arableLand)))
      dispatch(setHayfieldsAndPastureImprovedAC(Number(values.hayfieldsAndPastureImproved)))
      dispatch(setHayfieldsAndPastureNaturalAC(Number(values.hayfieldsAndPastureNatural)))
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
                <TableCell>Пашня, га</TableCell>
                <TableCell>
                  <TextField
                    name="arableLand"
                    value={formik.values.arableLand}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.arableLand && Boolean(formik.errors.arableLand)}
                    helperText={formik.touched.arableLand && formik.errors.arableLand}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Сенокосы и пастбища улучшенные, га</TableCell>
                <TableCell>
                  <TextField
                    name="hayfieldsAndPastureImproved"
                    value={formik.values.hayfieldsAndPastureImproved}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.hayfieldsAndPastureImproved && Boolean(formik.errors.hayfieldsAndPastureImproved)}
                    helperText={formik.touched.hayfieldsAndPastureImproved && formik.errors.hayfieldsAndPastureImproved}
                    fullWidth
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Сенокосы и пастбища естественные, га</TableCell>
                <TableCell>
                  <TextField
                    name="hayfieldsAndPastureNatural"
                    value={formik.values.hayfieldsAndPastureNatural}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.hayfieldsAndPastureNatural && Boolean(formik.errors.hayfieldsAndPastureNatural)}
                    helperText={formik.touched.hayfieldsAndPastureNatural && formik.errors.hayfieldsAndPastureNatural}
                    fullWidth
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
