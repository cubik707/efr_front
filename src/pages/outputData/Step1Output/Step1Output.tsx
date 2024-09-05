// @flow
import * as React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { cultures } from '../../../state/cultures/cultures'

type Props = {

};

const headers = ['Культуры', 'Расчетное значение площадь', 'Расчетное значение площадь %']

export const Step1Output = (props: Props) => {
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
          {Object.entries(cultures).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{value}</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}