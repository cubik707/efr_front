import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const cellWidths = [490, 271, 159, 120];
const rowHeights = [56, 29];

type TableCellData = string | number | React.ReactNode;
type TableRowData = TableCellData[];

type UniversalTablePropsType = {
    rows: TableRowData[]
}

const UniversalTable = ({ rows }: UniversalTablePropsType) => {
    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {cellWidths.map((width, index) => (
                            <TableCell key={index} style={{ width }}>
                                Header {index + 1}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex} style={{ height: rowIndex < rowHeights.length ? rowHeights[rowIndex] : rowHeights[rowHeights.length - 1] }}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} style={{ width: cellWidths[cellIndex % cellWidths.length] }}>
                                    {cell}
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
