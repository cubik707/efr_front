// @flow
import * as React from 'react';
import {useState} from 'react';
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
import {tableData} from "./tableInputData";
import {PATH} from "../../App";
import {useNavigate} from "react-router";

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
    const navigate = useNavigate();

    const handleNext = () => {
        activeStep === steps.length - 1
            ? navigate(PATH.OUTPUT_DATA)
            : setActiveStep((prevActiveStep) => prevActiveStep + 1);

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
            console.log(updatedData[activeStep].rows)
        }
    };

    const handleDeleteRow = (rowIndex: number) => {
        const updatedData = [...data];
        const currentTable = updatedData[activeStep];

        if (currentTable.isRowsAdd) {
            currentTable.rows = currentTable.rows.filter((_, index) => index !== rowIndex); // Фильтруем строки, исключая ту, что соответствует rowIndex

            setData(updatedData); // Обновляем состояние с новыми данными
            console.log(updatedData[activeStep].rows)
        }
    };

    // const [error, setError] = useState('')
    // const [a, setA] = useState<number>(0);
    // const [b, setB] = useState<number>(0);
    // const [result, setResult] = useState<number[] | null>(null);
    //
    // const testFunc = async () => {
    //     try {
    //         const response = await axios.post("http://localhost:5000/calculate", {
    //             a,
    //             b,
    //         });
    //         console.log(response.data);
    //         setResult((response.data));
    //     } catch (error: any) {
    //         console.error("Error calculating sum:", error);
    //         if(error.response.data){
    //             setError(error.response.data)
    //         }
    //
    //     }
    // };

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
                <UniTable
                    headers={headers}
                    rows={rows}
                    isRowsAdd={isRowsAdd}
                    onAddRow={handleAddRow}
                    onDeleteRow={handleDeleteRow}
                />
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
            {/*<Button onClick={testFunc}>Вжух</Button>*/}
            {/*{result !== null && <h2>Result: {result}</h2>}*/}
            {/*{error}*/}
        </Box>
    );
};