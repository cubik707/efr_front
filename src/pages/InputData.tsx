// @flow
import * as React from 'react';
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UniTable from "../components/UniTable";



type Props = {

};

const steps = [
    'Наличие земельных ресурсов',
    'Прогнозные параметры развития\n' +
    'растениеводства',
    'Прогрозные параметры развития\n' +
    'животноводства',
    'Возможность приобритения кормов',
    'Договорные поставки,\n' +
    'включая государственный заказ',
    'Цена реализации и себестоимости\n' +
    'производства 1 ц продукции'
];

const rows = [
    ['Cell 1', 'Cell 2', 'Cell 3', 'Cell 4'],
    ['Cell 5', 'Cell 6', 'Cell 7', 'Cell 8'],
    // Добавьте больше строк по необходимости
];

export const InputData = (props: Props) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <div>
                <Typography variant="h3" gutterBottom>
                    Наличие земельных ресурсов
                </Typography>
                <UniTable rows={rows}/>
                <Button variant="outlined">Найти оптимальные параметры</Button>
                <Button variant="text" startIcon={<KeyboardArrowLeftIcon />}>Назад</Button>
                <Button variant="contained" endIcon={<KeyboardArrowRightIcon />}>Далее</Button>
            </div>
        </Box>
    );
};