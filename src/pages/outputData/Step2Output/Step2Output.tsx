import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import * as React from 'react'
import { feedNamesInRussian } from '../../inputData/Step4/Step4'
import { FeedName } from '../../../state/feeds/feeds-reducer'
import { useAppSelector } from '../../../state/store'

const headers = ['Виды кормов',
    'ц (Коров)',
    'ц.к.ед (Коров)',
    'ц (КРС)',
    'ц.к.ед (КРС)',
    'Структура кормов% (Коров)',
    'Структура кормов% (КРС)',
  ]

export const Step2Output = () => {
  // Получаем данные о кормах из состояния Redux
  const feedsState = useAppSelector(state => state.feeds);
// Функция для округления значений
  const formatNumber = (value: number) => value.toFixed(2);

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
          {Object.entries(feedNamesInRussian).map(([key, feedName]) => {
            const feed = feedsState[key as FeedName];

            return (
              <TableRow key={key}>
                <TableCell>{feedName}</TableCell>
                <TableCell>{formatNumber(feed.mainCows)}</TableCell>
                <TableCell>{formatNumber(feed.additionalCows)}</TableCell>
                <TableCell>{formatNumber(feed.mainYoungCattle)}</TableCell>
                <TableCell>{formatNumber(feed.additionalYoungCattle)}</TableCell>
                <TableCell>{/* Здесь добавьте логику для расчета и форматирования структуры кормов% (Коров) */}</TableCell>
                <TableCell>{/* Здесь добавьте логику для расчета и форматирования структуры кормов% (КРС) */}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
};