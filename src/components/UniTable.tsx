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
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';


type UniversalTablePropsType = tableDataItemType & {
    onAddRow?: () => void;
    onDeleteRow?: (index: number) => void;
};


const UniTable = ({ headers, rows, isRowsAdd, onAddRow, onDeleteRow }: UniversalTablePropsType) => {

    const handleAddRow = () => {
        if (onAddRow) {
            onAddRow();
        }
    };

    const handleDeleteRow = (rowIndex: number) => {
        if (onDeleteRow) {
            onDeleteRow(rowIndex);
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
                                        {cellIndex === 0 && isRowsAdd && (
                                            rowIndex === rows.length - 1 ? (
                                                <IconButton color="primary" onClick={handleAddRow} size="small" style={{ marginRight: 8 }}>
                                                    <AddBox />
                                                </IconButton>
                                            ) : (
                                                <IconButton color="secondary" onClick={() => handleDeleteRow(rowIndex)} size="small" style={{ marginRight: 8 }}>
                                                    <IndeterminateCheckBoxIcon />
                                                </IconButton>
                                            )
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
