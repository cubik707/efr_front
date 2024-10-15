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

const headers = ['Вид корма', 'Значение', 'Доля от возможного объема %']

export const Step3Output = () => {
  // Получаем данные о кормах из состояния Redux
  const feedsState = useAppSelector((state) => state.feeds)
  // Функция для округления значений
  const formatNumber = (value: number) => value.toFixed(2)

  // Рассчитаем общий объем для расчета доли
  const totalVolume = Object.values(feedsState).reduce(
    (total, feed) => total + feed.volume,
    0
  )

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
          {Object.entries(feedNamesInRussian).map(([key, feedName]) => {
            const feed = feedsState[key as FeedName]

            // Рассчитаем долю от возможного объема
            const proportion =
              totalVolume > 0 ? (feed.toBuy / totalVolume) * 100 : 0

            return (
              <TableRow key={key}>
                <TableCell>{feedName}</TableCell>
                <TableCell>{formatNumber(feed.toBuy)}</TableCell>
                <TableCell>{formatNumber(proportion)}</TableCell>
              </TableRow>
            )
          })}
          <TableRow>
            <TableCell>Итого</TableCell>
            <TableCell>
              {formatNumber(
                Object.values(feedsState).reduce(
                  (total, feed) => total + feed.toBuy,
                  0
                )
              )}
            </TableCell>
            <TableCell>
              {formatNumber(
                Object.values(feedsState).reduce(
                  (total, feed) =>
                    total +
                    (totalVolume > 0 ? (feed.toBuy / totalVolume) * 100 : 0),
                  0
                )
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}
