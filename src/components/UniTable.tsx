import React from 'react';
import {
    Box,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField
} from '@mui/material';
import {tableDataItemType} from "../pages/inputData/tableInputData";
import {AddBox} from "@mui/icons-material";


type UniversalTablePropsType = tableDataItemType & {
    onAddRow?: () => void;
};

//todo: добавить кнопку удаления добавленной строки

const UniTable = ({ headers, rows, isRowsAdd, onAddRow }: UniversalTablePropsType) => {

    const handleAddRow = () => {
        if (onAddRow) {
            onAddRow();
        }
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
                                    <Box display="flex" alignItems="center">
                                        {cellIndex === 0 && isRowsAdd && rowIndex === rows.length - 1 && (
                                            <IconButton color="primary" onClick={handleAddRow} size="small" style={{ marginRight: 8 }}>
                                                <AddBox />
                                            </IconButton>
                                        )}
                                        {typeof cell === 'string' && cell.includes('input') ? (
                                            <TextField
                                                variant="outlined"
                                                size="small"
                                                placeholder={cell.replace('input', '').trim()}
                                                fullWidth
                                            />
                                        ) : (
                                            cell
                                        )}
                                    </Box>
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
