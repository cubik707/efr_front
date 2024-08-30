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
} from './InputData.styles'
import { PATH } from '../../App'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Step1 } from './Step1'

type Props = {

};

const steps = [
    'Наличие земельных ресурсов',
    'Прогнозные параметры развития растениеводства',
    'Прогрозные параметры развития животноводства',
    'Возможность приобритения кормов',
    'Договорные поставки, включая государственный заказ',
    'Цена реализации и себестоимости производства 1 ц продукции'
];

export const InputData = (props: Props) => {
    const [activeStep, setActiveStep] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Получаем последний шаг, на котором остановились
        const lastStep = parseInt(localStorage.getItem('lastInputStep') || '0', 10);
        setActiveStep(lastStep);
    }, []);

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            navigate(PATH.OUTPUT_DATA);
        } else {
            const nextStep = activeStep + 1;
            setActiveStep(nextStep);
            localStorage.setItem('lastInputStep', nextStep.toString());
        }
    };

    const handleBack = () => {
        const prevStep = activeStep - 1;
        setActiveStep(prevStep);
        localStorage.setItem('lastInputStep', prevStep.toString());
    };

    const [error, setError] = useState('')
    const [result, setResult] = useState<number[] | null>(null);

    const testFunc = async () => {
        try {
            const response = await axios.post("http://localhost:5000/calculate");
            if(response.data){
                console.log(response.data);
                setResult((response.data));
            }

        } catch (error: any) {
            console.error("Error calculating sum:", error);
            if(error.response.data){
                setError(error.response.data)
            }

        }
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
                {activeStep === 0 && <Step1 />}
            </Box>
            <Box sx={buttonContainerSx}>
                <Button variant="outlined" disabled={true}>Найти оптимальные параметры</Button>
                <Box sx = {navigationButtonsContainerSx}>
                    <Button variant="text"
                            startIcon={<KeyboardArrowLeftIcon />}
                            onClick={handleBack}
                            disabled={activeStep === 0}>Назад</Button>
                    <Button variant="contained"
                            endIcon={<KeyboardArrowRightIcon />}
                            onClick={handleNext}
                            disabled={false}>Далее</Button>
                </Box>
            </Box>
            <Button onClick={testFunc}>Вжух</Button>
            {result !== null && <h2>Result: {result}</h2>}
            {error}
        </Box>
    );
};