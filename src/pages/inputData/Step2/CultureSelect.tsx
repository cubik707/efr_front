import { Select, MenuItem } from '@mui/material';

type CultureSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export const CultureSelect: React.FC<CultureSelectProps> = ({ value, onChange }) => {
  return (
    <Select
      value={value}
      onChange={(e) => onChange(e.target.value)}
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
      <MenuItem value="hayImprovedHayfieldsAndPastures">Сено улучшенных сенокосов и пастбищ</MenuItem>
      <MenuItem value="haylageImprovedHayfieldsAndPastures">Сенаж улучшенных сенокосов и пастбищ</MenuItem>
      <MenuItem value="haylageNaturalHayfieldsAndPastures">Сенаж естественных сенокосов и пастбищ</MenuItem>
      <MenuItem value="greenFodderNaturalHayfieldsAndPastures">Зеленый корм естественных сенокосов и пастбищ</MenuItem>
    </Select>
  );
};