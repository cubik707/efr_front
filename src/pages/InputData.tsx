// @flow
import * as React from 'react';
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UniTable from "../components/UniTable";
import {
    buttonContainerSx,
    containerSx,
    navigationButtonsContainerSx,
    tableContainerSx,
    titleSx
} from "./InputData.styles";

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

const headers = ['Показатели', 'Наличие'];
const rows = [
    ['Пашня, га', '*ввести значение*'],
    ['Сенокосы и пастбища улучшенные, га', '*ввести значение*'],
    ['Сенокосы и пастбища естественные, га', '*ввести значение*'],
    // Добавьте больше строк по необходимости
];

export const InputData = (props: Props) => {
    return (
        <Box sx={containerSx}>
            <Stepper activeStep={1} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Typography variant="h2" gutterBottom sx={titleSx}>
                Наличие земельных ресурсов
            </Typography>
            <Box sx={tableContainerSx}>
                <UniTable headers={headers} rows={rows} />
            </Box>
            <Box sx={buttonContainerSx}>
                <Button variant="outlined">Найти оптимальные параметры</Button>
                <Box sx = {navigationButtonsContainerSx}>
                    <Button variant="text" startIcon={<KeyboardArrowLeftIcon />}>Назад</Button>
                    <Button variant="contained" endIcon={<KeyboardArrowRightIcon />}>Далее</Button>
                </Box>
            </Box>
        </Box>
    );
};