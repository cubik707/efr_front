import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import * as React from 'react'
import { feedNamesInRussian } from '../../inputData/Step4/Step4'
import { FeedName } from '../../../state/feeds/feeds-reducer'
import { useAppSelector } from '../../../state/store'

const headers = ['Показатель', 'Значение']

export const Step4Output = () => {
  const { revenue, cost, profit, profitability } = useAppSelector(
    (state) => state.financialResults
  )
  // Функция для округления значений до целых
  const roundToInteger = (value: number) => Math.round(value)

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, index) => (
              <TableCell
                key={index}
                style={{ whiteSpace: 'nowrap' }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Выручка, руб.</TableCell>
            <TableCell>{roundToInteger(revenue)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Себестоимость, руб.</TableCell>
            <TableCell>{roundToInteger(cost)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Прибыль, руб.</TableCell>
            <TableCell>{roundToInteger(profit)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Рентабельность, %</TableCell>
            <TableCell>{roundToInteger(profitability)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
