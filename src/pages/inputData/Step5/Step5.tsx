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
import { validationSchema } from './step5-validation'
import { useAppSelector } from '../../../state/store'

const headers = ['Вид продукции', 'Договорные поставки, ц']

type RowType = {
  contractDeliveries: number | ''
}

type FormType = {
  seeds: RowType,
  rape: RowType
}

export const Step5 = (props: StepsProps) => {
  // Get the culture values to check if they have been entered
  const rape = useAppSelector(state => state.cultures.rape)
  const winterGrains = useAppSelector(state => state.cultures.winterGrains)
  const springGrains = useAppSelector(state => state.cultures.springGrains)

  const initialValues: FormType = {
    seeds: { contractDeliveries: winterGrains || springGrains ? 0 : '' },
    rape: { contractDeliveries: rape ? 0 : '' },
  }
  console.log(initialValues)
  const formik = useFormik<FormType>({
    initialValues,
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
              {rape && (
                <TableRow>
                  <TableCell>Рапс</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="rape.contractDeliveries"
                      value={formik.values.rape?.contractDeliveries || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.touched.rape?.contractDeliveries && formik.errors.rape?.contractDeliveries)}
                      helperText={formik.touched.rape?.contractDeliveries && formik.errors.rape?.contractDeliveries}
                      disabled={!rape}
                    />
                  </TableCell>
                </TableRow>
              )}
              {(winterGrains || springGrains) && (
                <TableRow>
                  <TableCell>Зерно</TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      name="seeds.contractDeliveries"
                      value={formik.values.seeds?.contractDeliveries || ''}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={Boolean(formik.touched.seeds?.contractDeliveries && formik.errors.seeds?.contractDeliveries)}
                      helperText={formik.touched.seeds?.contractDeliveries && formik.errors.seeds?.contractDeliveries}
                      disabled={!(winterGrains || springGrains)}
                    />
                  </TableCell>
                </TableRow>
              )}
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
