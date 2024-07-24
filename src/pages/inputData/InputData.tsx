// @flow
import * as React from 'react';
import {Box, Button, Step, StepLabel, Stepper, Typography} from "@mui/material";
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UniTable from "../../components/UniTable";
import {
    buttonContainerSx,
    containerSx,
    navigationButtonsContainerSx,
    tableContainerSx,
    titleSx
} from "./InputData.styles";
import {useState} from "react";
import {tableData} from "./tableInputData";

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
    const [data, setData] = useState(tableData);

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleAddRow = () => {
        const updatedData = [...data];
        const currentTable = updatedData[activeStep];

        if (currentTable.isRowsAdd) {
            const newRow = [...currentTable.rows[currentTable.rows.length - 1]]; // Клонируем последнюю строку
            updatedData[activeStep].rows.push(newRow); // Добавляем новую строку

            setData(updatedData); // Обновляем состояние с новыми данными
        }
    };

    const { headers, rows, isRowsAdd } = data[activeStep];
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
                <UniTable headers={headers} rows={rows} isRowsAdd={isRowsAdd} onAddRow={handleAddRow}/>
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
                            disabled={activeStep === steps.length - 1}>Далее</Button>
                </Box>
            </Box>
        </Box>
    );
};