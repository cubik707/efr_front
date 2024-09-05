import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { cultures } from '../../../state/cultures/cultures'
import * as React from 'react'
import { feedNamesInRussian } from '../../inputData/Step4/Step4'

const headers = ['Виды кормов',
    'ц (Коров)',
    'ц.к.ед (Коров)',
    'ц (КРС)',
    'ц.к.ед (КРС)',
    'Структура кормов% (Коров)',
    'Структура кормов% (КРС)',
  ]

export const Step2Output = () => {
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
          {Object.entries(feedNamesInRussian).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{value}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}