import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { feedNamesInRussian } from '../../inputData/Step4/Step4'
import { FeedName } from '../../../state/feeds/feeds-reducer'
import { useAppSelector } from '../../../state/store'

const headers = ['Показатель', 'Значение']

export const Step4Output = () => {
  // Получаем данные о кормах из состояния Redux
  const feedsState = useAppSelector(state => state.feeds);
  // Функция для округления значений
  const formatNumber = (value: number) => value.toFixed(2);

  // Рассчитаем общий объем для расчета доли
  const totalVolume = Object.values(feedsState).reduce((total, feed) => total + feed.volume, 0);

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
          <TableRow>
            <TableCell>Выручка, руб.</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>Выручка, руб.</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>Себестоимость, руб</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>Прибыль, руб</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
        <TableBody>
          <TableRow>
            <TableCell>Рентабельность, %</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};