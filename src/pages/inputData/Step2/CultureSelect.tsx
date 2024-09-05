import { FormControl, FormHelperText, MenuItem, Select } from '@mui/material'
import { culturesArray } from './inputCultures'

type CultureSelectProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false | undefined;
  selectedCultures: string[];
};

export const CultureSelect: React.FC<CultureSelectProps> = ({
                                                              value,
                                                              onChange,
                                                              onBlur,
                                                              error,
                                                              helperText,
                                                              selectedCultures,
                                                            }) => {

  const filteredCultures = culturesArray.filter(
    (culture) => culture.value === value || !selectedCultures.includes(culture.value)
  );

  return (
    <FormControl fullWidth error={error}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        displayEmpty
        sx={{ minWidth: 271 }}
      >
        <MenuItem value="">
          <em>Выбрать культуру</em>
        </MenuItem>
        {filteredCultures.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{String(helperText)}</FormHelperText>}
    </FormControl>
  );
};