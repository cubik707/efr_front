import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
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
];

// Функция для округления значений
const formatNumber = (value: number) => value.toFixed(2);

// Функция для расчета процентного отношения
const calculatePercentage = (value: number, total: number) => total > 0 ? ((value / total) * 100).toFixed(2) + '%' : '0%';

export const Step2Output = () => {
  // Получаем данные о кормах из состояния Redux
  const feedsState = useAppSelector(state => state.feeds);
  // Получаем прирост продуктивности коров из состояния Redux
  const increaseInCowProductivity = useAppSelector(state => state.increaseInCowProductivity.increaseInCowProductivity)
  // Вычисляем общие суммы для ц.к.ед (Коров) и ц.к.ед (КРС)
  let totalCows = 0;
  let totalYoungCattle = 0;

  Object.entries(feedNamesInRussian).forEach(([key]) => {
    const feed = feedsState[key as FeedName];
    totalCows += feed.additionalCows;
    totalYoungCattle += feed.additionalYoungCattle;
  });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
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
                  <TableCell>{calculatePercentage(feed.additionalCows, totalCows)}</TableCell>
                  <TableCell>{calculatePercentage(feed.additionalYoungCattle, totalYoungCattle)}</TableCell>
                </TableRow>
              );
            })}

            {/* Строка итого */}
            <TableRow>
              <TableCell>Итого</TableCell>
              <TableCell>-</TableCell> {/* Столбцы для "ц (Коров)" */}
              <TableCell>{formatNumber(totalCows)}</TableCell> {/* Сумма для "ц.к.ед (Коров)" */}
              <TableCell>-</TableCell> {/* Столбцы для "ц (КРС)" */}
              <TableCell>{formatNumber(totalYoungCattle)}</TableCell> {/* Сумма для "ц.к.ед (КРС)" */}
              <TableCell>100%</TableCell> {/* Процентное соотношение для "ц.к.ед (Коров)" */}
              <TableCell>100%</TableCell> {/* Процентное соотношение для "ц.к.ед (КРС)" */}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Текст с приростом продуктивности под таблицей */}
      <Typography variant="h6" gutterBottom>
        Прирост продуктивности коров от базового уровня – {increaseInCowProductivity} ц
      </Typography>
    </Box>
  );
};
