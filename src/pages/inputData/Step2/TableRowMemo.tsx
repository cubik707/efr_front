// Определение типа строки
import { CultureNames } from '../../../state/cultures/cultures-reducer'
import React from 'react'
import { Box, IconButton, TableCell, TableRow, TextField } from '@mui/material'
import { AddBox } from '@mui/icons-material'
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox'
import { CultureSelect } from './CultureSelect'

export type RowType = {
  culture: CultureNames | ''
  yield: number | ''
  fodder: number | ''
  commodity: number | ''
  seeds: number | ''
}

export const TableRowMemo: React.FC<{
  row: RowType
  rowIndex: number
  handleInputChange: (index: number, field: keyof RowType, value: string) => void
  handleAddRow: () => void
  handleDeleteRow: (index: number) => void
  getError: (rowIndex: number, field: keyof RowType) => string | undefined
  isTouched: (rowIndex: number, field: keyof RowType) => boolean
  isAddRowDisabled: () => boolean
  isFodderFieldDisabled: (culture: CultureNames) => boolean
  isCommodityFieldDisabled: (culture: CultureNames) => boolean
  getSelectedCultures: () => string[]
}> = React.memo(
  ({
     row,
     rowIndex,
     handleInputChange,
     handleAddRow,
     handleDeleteRow,
     getError,
     isTouched,
     isAddRowDisabled,
     isFodderFieldDisabled,
     isCommodityFieldDisabled,
     getSelectedCultures,
   }) => (
    <TableRow key={rowIndex}>
      <TableCell style={{ width: 'auto', whiteSpace: 'nowrap' }}>
        <Box display="flex" alignItems="center">
          {rowIndex === rowIndex ? (
            <IconButton
              color="primary"
              onClick={handleAddRow}
              size="small"
              disabled={isAddRowDisabled()}
            >
              <AddBox />
            </IconButton>
          ) : (
            <IconButton
              color="secondary"
              onClick={() => handleDeleteRow(rowIndex)}
              size="small"
            >
              <IndeterminateCheckBoxIcon />
            </IconButton>
          )}
          <CultureSelect
            value={row.culture}
            onChange={(value) => handleInputChange(rowIndex, 'culture', value)}
            error={Boolean(isTouched(rowIndex, 'culture') && getError(rowIndex, 'culture'))}
            selectedCultures={getSelectedCultures()}
            helperText={isTouched(rowIndex, 'culture') && getError(rowIndex, 'culture')}
          />
        </Box>
      </TableCell>
      <TableCell>
        <Box>{Number(row.yield).toFixed(1)}</Box>
      </TableCell>
      <TableCell>
          {isFodderFieldDisabled(row.culture as CultureNames) ? (
            <Box>{row.fodder || '0'}</Box>
          ) : (
            <TextField
              name={`rows[${rowIndex}].fodder`}
              value={row.fodder}
              onChange={(e) => handleInputChange(rowIndex, 'fodder', e.target.value)}
              error={Boolean(isTouched(rowIndex, 'fodder') && getError(rowIndex, 'fodder'))}
              helperText={isTouched(rowIndex, 'fodder') && getError(rowIndex, 'fodder')}
              fullWidth
            />
          )}
        </TableCell>
        <TableCell>
          {isCommodityFieldDisabled(row.culture as CultureNames) ? (
            <Box>{row.commodity || '0'}</Box>
          ) : (
            <TextField
              name={`rows[${rowIndex}].commodity`}
              value={row.commodity}
              onChange={(e) => handleInputChange(rowIndex, 'commodity', e.target.value)}
              error={Boolean(isTouched(rowIndex, 'commodity') && getError(rowIndex, 'commodity'))}
              helperText={isTouched(rowIndex, 'commodity') && getError(rowIndex, 'commodity')}
              fullWidth
              sx={{
                "& .Mui-disabled": {
                  color: "rgba(0, 0, 0, 0.7)", // Тёмный текст
                  backgroundColor: "rgba(124,124,124,0.1)", // Тёмный фон
                },
              }}
            />
          )}
        </TableCell>
      <TableCell>{row.seeds}</TableCell>
    </TableRow>
  ),
  (prevProps, nextProps) =>
    prevProps.row === nextProps.row && prevProps.rowIndex === nextProps.rowIndex
)