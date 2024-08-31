// @flow
import * as React from 'react'
import { useState } from 'react'
import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from './InputData.styles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { setLandResourcesData } from '../../state/landResources/landResources-thunk'
import { useAppDispatch } from '../../state/store'
import { LandResourcesType } from '../../state/landResources/landResources-reducer'
import { handleError } from '../../utils/handleErrors'

type Props = {
  activeStep: number
  onBack: () => void
  onNext: () => void
};

const headers = ['Показатели', 'Наличие']


export const Step1 = (props: Props) => {
  const dispatch = useAppDispatch();

  const [formData, setFormData] = useState<LandResourcesType>({
    arableLand: 0,
    hayfieldsAndPastureImproved: 0,
    hayfieldsAndPastureNatural: 0,
  });
  type LandResourcesField = keyof LandResourcesType;

  const handleInputChange = (field: LandResourcesField, value: string) => {
    setFormData(prevState => ({
      ...prevState,
      [field]: Number(value)
    }));
  };

  const handleNextStep = async () => {
    try {
      await dispatch(setLandResourcesData(formData));
      props.onNext();
    } catch (error: any) {
      handleError(error, dispatch)
    }
  };

  return (
    <Box sx={containerSx}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {headers.map((header, index) => (
                <TableCell key={index} style={{ whiteSpace: 'nowrap' }}>
                  {header}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>Пашня, га</TableCell>
              <TableCell>
                <TextField
                  value={formData.arableLand}
                  onChange={(e) => handleInputChange('arableLand', e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сенокосы и пастбища улучшенные, га</TableCell>
              <TableCell>
                <TextField
                  value={formData.hayfieldsAndPastureImproved}
                  onChange={(e) => handleInputChange('hayfieldsAndPastureImproved', e.target.value)}
                />
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Сенокосы и пастбища естественные, га</TableCell>
              <TableCell>
                <TextField
                  value={formData.hayfieldsAndPastureNatural}
                  onChange={(e) => handleInputChange('hayfieldsAndPastureNatural', e.target.value)}
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={buttonContainerSx}>
        <Button variant="outlined" disabled={true}>Найти оптимальные параметры</Button>
        <Box sx={navigationButtonsContainerSx}>
          <Button variant="text"
                  startIcon={<KeyboardArrowLeftIcon />}
                  onClick={props.onBack}
                  disabled={props.activeStep === 0}>Назад</Button>
          <Button variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                  onClick={handleNextStep}
                  disabled={false}>Далее</Button>
        </Box>
      </Box>
    </Box>
  )
}