// @flow
import * as React from 'react'
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material'

type Props = {};

const headers = ['Показатели', 'Наличие']
const rows = [
  'Пашня, га',
  'Сенокосы и пастбища улучшенные, га',
  'Сенокосы и пастбища естественные, га'
];

export const Step1 = (props: Props) => {
  return (
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
              <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                {row}
              </TableCell>
              <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                <TextField
                  variant="outlined"
                  size="small"
                  fullWidth
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}