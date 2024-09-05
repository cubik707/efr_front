// @flow
import * as React from 'react'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { cultures } from '../../../state/cultures/cultures'
import { useAppSelector } from '../../../state/store'

type Props = {

};

const headers = ['Культуры', 'Расчетное значение площадь', 'Расчетное значение площадь %']

export const Step1Output = (props: Props) => {
  // Получаем данные о культурах из состояния Redux
  const culturesState = useAppSelector(state => state.cultures);

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
          {Object.entries(cultures).map(([key, label]) => (
            <TableRow key={key}>
              <TableCell>{label}</TableCell>
              <TableCell>{Math.round(culturesState[key as keyof typeof cultures].square || 0)}</TableCell>
              <TableCell></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};