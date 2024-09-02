import { Select, MenuItem, FormControl, FormHelperText } from '@mui/material';

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
  const cultures = [
    { value: 'winterGrains', label: 'Зерновые озимые' },
    { value: 'springGrains', label: 'Зерновые яровые' },
    { value: 'pulses', label: 'Зернобобовые' },
    { value: 'rape', label: 'Рапс' },
    { value: 'hayGrassHay', label: 'Сено многолетних трав' },
    { value: 'haylageGrassHay', label: 'Сенаж многолетних трав' },
    { value: 'greenFodderGrassHay', label: 'Зеленый корм многолетних трав' },
    { value: 'hayImprovedHayfieldsAndPastures', label: 'Сено улучшенных сенокосов и пастбищ' },
    { value: 'haylageImprovedHayfieldsAndPastures', label: 'Сенаж улучшенных сенокосов и пастбищ' },
    { value: 'haylageNaturalHayfieldsAndPastures', label: 'Сенаж естественных сенокосов и пастбищ' },
    { value: 'greenFodderNaturalHayfieldsAndPastures', label: 'Зеленый корм естественных сенокосов и пастбищ' },
  ];

  const filteredCultures = cultures.filter(
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
        {filteredCultures.map((culture) => (
          <MenuItem key={culture.value} value={culture.value}>
            {culture.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && <FormHelperText>{String(helperText)}</FormHelperText>}
    </FormControl>
  );
};
