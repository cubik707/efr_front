// @flow
import {MenuItem, Select} from '@mui/material';
import React from "react";

type TableCellData = string | number | React.ReactNode;
export type TableRowData = TableCellData[];

export type tableDataItemType = {
    headers: string[],
    rows: TableRowData[],
    isRowsAdd: boolean
}

export const tableData: tableDataItemType[] = [
    {
        headers: ['Показатели', 'Наличие'],
        rows: [
            ['Пашня, га', 'input'],
            ['Сенокосы и пастбища улучшенные, га', 'input'],
            ['Сенокосы и пастбища естественные, га', 'input']
        ],
        isRowsAdd: false,
    },
    {
        headers:
            ['Культура','Урожайность прогнозная, ц/га ','в т.ч. на корм', 'в т.ч. на товар','в т.ч. на семена',],
        rows: [
            [
                <Select key="culture-select" defaultValue="" displayEmpty sx={{ minWidth: 271 }}>
                    <MenuItem value="">
                        <em>Выбрать культуру</em>
                    </MenuItem>
                    <MenuItem value="winterGrains">Озимые зерновые</MenuItem>
                    <MenuItem value="springGrains">Яровые зерновые</MenuItem>
                    <MenuItem value="pulses">Зернобобовые</MenuItem>
                    <MenuItem value="rape">Рапс</MenuItem>
                    <MenuItem value="corn">Кукуруза</MenuItem>
                </Select>,
                'input',
                'input',
                'input',
                'input'
            ]
        ],
        isRowsAdd: true,
    },
    {
        headers: ['Показатели', 'Наличие'],
        rows: [
            ['Пашня, га', 'input'],
            ['Сенокосы и пастбища улучшенные, га', 'input'],
            ['Сенокосы и пастбища естественные, га', 'input']
        ],
        isRowsAdd: false,
    },
    {
        headers: ['Показатели', 'Наличие'],
        rows: [
            ['Пашня, га', 'input'],
            ['Сенокосы и пастбища улучшенные, га', 'input'],
            ['Сенокосы и пастбища естественные, га', 'input']
        ],
        isRowsAdd: false,
    },
    {
        headers: ['Показатели', 'Наличие'],
        rows: [
            ['Пашня, га', 'input'],
            ['Сенокосы и пастбища улучшенные, га', 'input'],
            ['Сенокосы и пастбища естественные, га', 'input']
        ],
        isRowsAdd: false,
    },
    {
        headers: ['Показатели', 'Наличие'],
        rows: [
            ['Пашня, га', 'input'],
            ['Сенокосы и пастбища улучшенные, га', 'input'],
            ['Сенокосы и пастбища естественные, га', 'input']
        ],
        isRowsAdd: false,
    },
];
