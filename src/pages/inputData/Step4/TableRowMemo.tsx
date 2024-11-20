import * as React from 'react'
import { TableCell, TableRow, TextField } from '@mui/material'
import { feedNamesInRussian } from './Step4'

type RowType = {
  feedName: string
  volume: number | ''
  price: number | ''
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleBlur: (e: React.FocusEvent<HTMLInputElement>) => void
  touched: boolean
  errors: any
}

const TableRowMemo: React.FC<RowType> = React.memo(
  ({ feedName, volume, price, handleChange, handleBlur, touched, errors }) => (
    <TableRow>
      <TableCell>{feedNamesInRussian[feedName as keyof typeof feedNamesInRussian]}</TableCell>
      <TableCell>
        <TextField
          fullWidth
          name={`${feedName}.volume`}
          value={volume}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched && Boolean(errors?.volume)}
          helperText={touched && errors?.volume}
        />
      </TableCell>
      <TableCell>
        <TextField
          fullWidth
          name={`${feedName}.price`}
          value={price}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched && Boolean(errors?.price)}
          helperText={touched && errors?.price}
        />
      </TableCell>
    </TableRow>
  ),
  (prevProps, nextProps) =>
    prevProps.feedName === nextProps.feedName && prevProps.volume === nextProps.volume && prevProps.price === nextProps.price
)

export default TableRowMemo
