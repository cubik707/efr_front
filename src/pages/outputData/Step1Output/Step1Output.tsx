// @flow
import * as React from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { cultures } from '../../../state/cultures/cultures';
import { useAppSelector } from '../../../state/store';

// Типы данных
type Props = {};

// Заголовки таблицы
const headers = ['Культуры', 'Расчетное значение площадь', 'Процентное соотношение площадь'];

// Компонент
export const Step1Output = (props: Props) => {
  // Получаем данные о культурах и ресурсах земли из состояния Redux
  const culturesState = useAppSelector(state => state.cultures);
  const landResources = useAppSelector(state => state.landResources);

  // Расчет процентного соотношения
  const calculatePercentage = (cultureKey: string) => {
    const cultureSquare = culturesState[cultureKey as keyof typeof cultures]?.square || 0;
    const totalSquare = landResources.arableLand;

    if (cultureKey === 'hayImprovedHayfieldsAndPastures' || cultureKey === 'haylageImprovedHayfieldsAndPastures') {
      const improvedTotal = landResources.hayfieldsAndPastureImproved;
      return (cultureSquare / improvedTotal) * 100;
    } else if (cultureKey === 'haylageNaturalHayfieldsAndPastures' || cultureKey === 'greenFodderNaturalHayfieldsAndPastures') {
      const naturalTotal = landResources.hayfieldsAndPastureNatural;
      return (cultureSquare / naturalTotal) * 100;
    } else {
      return (cultureSquare / totalSquare) * 100;
    }
  };

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
              <TableCell>{Math.round(calculatePercentage(key))}%</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
