// @flow
import * as React from 'react'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from '../InputData.styles'
import {
  Box,
  Button, IconButton,
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
import { StepsProps } from '../Step1/Step1'
import { AddBox } from '@mui/icons-material'
import { useState } from 'react'
import { CultureSelect } from './CultureSelect'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'

const headers = ['Культура', 'Урожайность прогнозная, ц/га ', 'в т.ч. на корм', 'в т.ч. на товар', 'в т.ч. на семена']

export const Step2 = (props: StepsProps) => {
  const [rows, setRows] = useState([{ culture: '', yield: '', fodder: '', commodity: '', seeds: '' }]);

  const handleAddRow = () => {
    setRows([...rows, { culture: '', yield: '', fodder: '', commodity: '', seeds: '' }]);
  };

  const handleDeleteRow = (index: number) => {
    const newRows = rows.filter((_, rowIndex) => rowIndex !== index);
    setRows(newRows);
  };

  const handleInputChange = (index: number, field: string, value: string) => {
    const newRows = rows.map((row, rowIndex) => rowIndex === index ? { ...row, [field]: value } : row);
    setRows(newRows);
  };
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
            {rows.map((row, rowIndex) => (
              <TableRow key={rowIndex}>
                <TableCell style={{display: 'flex', gap: '5px'}}>
                  {rowIndex === rows.length - 1 ? (
                    <IconButton color="primary" onClick={handleAddRow} size="small">
                      <AddBox />
                    </IconButton>
                  ) : (
                    <IconButton color="secondary" onClick={() => handleDeleteRow(rowIndex)} size="small">
                      <IndeterminateCheckBoxIcon />
                    </IconButton>
                  )}
                  <CultureSelect
                    value={row.culture}
                    onChange={(value) => handleInputChange(rowIndex, 'culture', value)}
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.yield}
                    onChange={(e) => handleInputChange(rowIndex, 'yield', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.fodder}
                    onChange={(e) => handleInputChange(rowIndex, 'fodder', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.commodity}
                    onChange={(e) => handleInputChange(rowIndex, 'commodity', e.target.value)}
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    value={row.seeds}
                    onChange={(e) => handleInputChange(rowIndex, 'seeds', e.target.value)}
                    fullWidth
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
  )
}