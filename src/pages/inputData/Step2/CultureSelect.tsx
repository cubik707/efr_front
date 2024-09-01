import { Select, MenuItem, FormControl, FormHelperText } from '@mui/material';

type CultureSelectProps = {
  value: string;
  onChange: (value: string) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: boolean;
  helperText?: string | false | undefined;
};

export const CultureSelect: React.FC<CultureSelectProps> = ({
                                                              value,
                                                              onChange,
                                                              onBlur,
                                                              error,
                                                              helperText,
                                                            }) => {
  return (
    <FormControl fullWidth error={error}>
      <Select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur} // добавляем onBlur
        displayEmpty
        sx={{ minWidth: 271 }}
      >
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
        <MenuItem value="hayImprovedHayfieldsAndPastures">
          Сено улучшенных сенокосов и пастбищ
        </MenuItem>
        <MenuItem value="haylageImprovedHayfieldsAndPastures">
          Сенаж улучшенных сенокосов и пастбищ
        </MenuItem>
        <MenuItem value="haylageNaturalHayfieldsAndPastures">
          Сенаж естественных сенокосов и пастбищ
        </MenuItem>
        <MenuItem value="greenFodderNaturalHayfieldsAndPastures">
          Зеленый корм естественных сенокосов и пастбищ
        </MenuItem>
      </Select>
      {helperText && <FormHelperText>{String(helperText)}</FormHelperText>}
    </FormControl>
  );
};
