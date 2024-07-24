import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField} from '@mui/material';
import {tableDataItemType} from "../pages/inputData/tableInputData";


type UniversalTablePropsType = tableDataItemType

const UniTable = ({ headers, rows, isRowsAdd }: UniversalTablePropsType) => {

    const handleAddRow = () => {
        // Логика для добавления строки
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        {headers.map((header, index) => (
                            <TableCell key={index} style={{whiteSpace: 'nowrap' }}>
                                {header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row, rowIndex) => (
                        <TableRow key={rowIndex}>
                            {row.map((cell, cellIndex) => (
                                <TableCell key={cellIndex} style={{ width: 'auto', whiteSpace: 'nowrap' }}>
                                    {typeof cell === 'string' && cell.includes('input') ? (
                                        <TextField variant="outlined" fullWidth size="small" placeholder={cell.replace('input', '').trim()} />
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

export default UniTable;
