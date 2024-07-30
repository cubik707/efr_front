// @flow
import {MenuItem, Select} from '@mui/material';
import React from "react";

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
            ['Культура','Урожайность прогнозная, ц/га ','в т.ч. на корм', 'в т.ч. на товар','в т.ч. на семена',],
        rows: [
            [
                <Select key="culture-select" defaultValue="" displayEmpty sx={{ minWidth: 271 }}>
                    <MenuItem value="">
                        <em>Выбрать культуру</em>
                    </MenuItem>
                    <MenuItem value="winterGrains">Зерновые озимые</MenuItem>
                    <MenuItem value="springGrains">Зерновые яровые</MenuItem>
                    <MenuItem value="pulses">Зернобобовые</MenuItem>
                    <MenuItem value="rape">Рапс</MenuItem>
                    <MenuItem value="hayGrassHay">Сено многолетних трав</MenuItem>
                    <MenuItem value="haylageGrassHay">Сенаж многолетних трав</MenuItem>
                    <MenuItem value="greenFodderGrassHay">Зеленый корм многолетних трав</MenuItem>
                    <MenuItem value="hayImprovedHayfieldsAndPastures">Сено улучшенных сенокосов и пастбищ</MenuItem>
                    <MenuItem value="haylageImprovedHayfieldsAndPastures">Сенаж улучшенных сенокосов и пастбищ</MenuItem>
                    <MenuItem value="haylageNaturalHayfieldsAndPastures">Сенаж естественных сенокосов и пастбищ</MenuItem>
                    <MenuItem value="greenFodderNaturalHayfieldsAndPastures">Зеленый корм естественных сенокосов и пастбищ</MenuItem>
                </Select>,
                'input',
                'input',
                'input',
                'input'
            ]
        ],
    },
    {
        headers: ['Вид животных', 'Продуктивность (базовая), ц', 'Поголовье, гол.', 'Расход ц КЕ на 1 ц продукции'],
        rows: [
            ['Коровы', 'input', "input", "input", "input"],
            ['Молодняк КРС', 'input', "input", "input", "input"],
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
