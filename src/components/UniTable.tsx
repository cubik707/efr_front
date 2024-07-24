import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TextField } from '@mui/material';

const cellWidths = [490, 271, 159, 120];
const rowHeights = [56, 29];

type TableCellData = string | number | React.ReactNode;
type TableRowData = TableCellData[];

type UniversalTablePropsType = {
    headers: string[];
    rows: TableRowData[]
}

const UniversalTable = ({ headers, rows }: UniversalTablePropsType) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} style={{ width: cellWidths[index] }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex} style={{ height: rowIndex < rowHeights.length ? rowHeights[rowIndex] : rowHeights[rowHeights.length - 1] }}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} style={{ width: cellWidths[cellIndex % cellWidths.length] }}>
                                    {typeof cell === 'string' && cell.includes('*ввести значение*') ? (
                                        <TextField variant="outlined" fullWidth size="small" placeholder={cell.replace('*ввести значение*', '').trim()} />
                                    ) : (
                                        cell
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default UniversalTable;
