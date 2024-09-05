// @flow
import * as React from 'react'
import { useEffect, useState } from 'react'
import { Box, Button, Step, StepLabel, Stepper, Typography } from '@mui/material'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import {
  buttonContainerSx,
  containerSx,
  navigationButtonsContainerSx,
  tableContainerSx,
  titleSx,
} from './OutputData.styles'
import { tableData } from './tableOutputData'
import { useNavigate } from 'react-router'
import { PATH } from '../../App'
import { fetchCultureData } from '../../state/cultures/cultures-thunk'
import { useAppDispatch, useAppSelector } from '../../state/store'
import { CultureStateType } from '../../state/cultures/cultures-reducer'
import { Step1Output } from './Step1Output/Step1Output'
import { Step2Output } from './Step2Output/Step2Output'

type Props = {};

const steps = [
    'Размер и структура посевных площадей',
    'Оптимальный рацион кормления КРС',
    'Приобретение кормов',
    'Финансовые результаты'
];

export const OutputData = (props: Props) => {
    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState(tableData);
    const navigate = useNavigate();

  const culturesData = useAppSelector<CultureStateType>(state => state.cultures)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchCultureData())
  }, [])

  useEffect(() => {
    const updatedData = [...tableData]
    updatedData[0] = {
      ...updatedData[0],
      rows: Object.entries(culturesData).map(([name, culture]) => [
        name,
        culture.square,
        '',
      ]),
    }

    setData(updatedData)
    console.log(data[0])
  }, [culturesData])

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        activeStep === 0
            ? navigate(PATH.INPUT_DATA)
            : setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };


    return (
        <Box sx={containerSx}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Typography variant="h2" gutterBottom sx={titleSx}>
                {steps[activeStep]}
            </Typography>
            <Box sx={tableContainerSx}>
              {activeStep === 0 && <Step1Output/>}
              {activeStep === 1 && <Step2Output/>}
            </Box>
            <Box sx={buttonContainerSx}>
                <Box sx={navigationButtonsContainerSx}>
                    <Button variant="outlined" disabled={true}>Выгрузить PDF</Button>
                    <Button variant="outlined" disabled={true}>Найти решение с измененными параметрами</Button>
                </Box>
                <Box sx={navigationButtonsContainerSx}>
                    <Button variant="text"
                            startIcon={<KeyboardArrowLeftIcon/>}
                            onClick={handleBack}
                            disabled={false}>Назад</Button>
                    <Button variant="contained"
                            endIcon={<KeyboardArrowRightIcon/>}
                            onClick={handleNext}
                            disabled={activeStep === steps.length - 1}>Далее</Button>
                </Box>
            </Box>
        </Box>
    );
};