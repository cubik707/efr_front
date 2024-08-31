// @flow
import * as React from 'react'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from './InputData.styles'
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
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { StepsProps } from './Step1'

const headers = ['Культура', 'Урожайность прогнозная, ц/га ', 'в т.ч. на корм', 'в т.ч. на товар', 'в т.ч. на семена']

export const Step2 = (props: StepsProps) => {
  return (
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

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сенокосы и пастбища улучшенные, га</TableCell>
              <TableCell>

              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сенокосы и пастбища естественные, га</TableCell>
              <TableCell>

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
                  onClick={props.onNext}
                  disabled={false}>Далее</Button>
        </Box>
      </Box>
    </Box>
  )
}