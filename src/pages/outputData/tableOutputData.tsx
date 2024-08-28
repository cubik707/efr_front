// @flow
import React from 'react'

type TableCellData = string | number | React.ReactNode;
export type TableRowData = TableCellData[];

export type tableDataItemType = {
    headers: string[],
    rows: TableRowData[],
}

export const tableData: tableDataItemType[] = [
    {
        headers: ['Культуры', 'Расчетное значение площадь', 'Расчетное значение площадь %'],
        rows: [
            ['Значения из В2', 'данные', 'данные']
        ],
    },
    {
        headers:
          ['Виды кормов',
              'ц (Коров)',
              'ц.к.ед (Коров)',
              'ц (КРС)',
              'ц.к.ед (КРС)',
              'Структура кормов% (Коров)',
              'Структура кормов% (КРС)',
          ],
        rows: [
            [
                'значения из B2',
                'данные',
                'данные',
                'данные',
                'данные',
                'данные',
                'данные',
            ]
        ],
    },
    {
        headers: ['Вид корма', 'Значение', 'Доля от возможного объема %'],
        rows: [
            ['из В4', 'данные', "данные", "данные", "данные"],
        ],
    },
    {
        headers: ['Вид корма', 'Объем, ц', 'Цена, руб.'],
        rows: [
            ['Концентраты', 'input', "input"],
            ['Силос', 'input', "input"],
            ['Зеленый корм', 'input', "input"],
            ['Сено', 'input', "input"],
            ['Сенаж', 'input', "input"],
            ['Солома', 'input', "input"],
        ],
    },
    {
        headers: ['Вид продукции', 'Договорные поставки, ц'],
        rows: [
            ['Культуры из В2', 'input'],
        ],
    },
    {
        headers: ['Вид продукции', 'Цена реализации за ц, руб.', 'Себестоимость за 1ц, руб.'],
        rows: [
            ['Культуры из В2', 'input', 'input'],
        ],
    },
];
