// @flow
import * as React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from '../InputData.styles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from '../Step1/Step1'
import { useFormik } from 'formik'
import { validationSchema } from './step5-validation'


const headers = ['Вид продукции', 'Договорные поставки, ц']



export const Step5 = (props: StepsProps) => {

  const formik = useFormik<{}>({
    initialValues: {  },
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