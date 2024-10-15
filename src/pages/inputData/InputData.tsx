// @flow
import * as React from 'react'
import { useEffect, useState } from 'react'
import {
  Box,
  Button,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material'
import { containerSx, tableContainerSx, titleSx } from './InputData.styles'
import { PATH } from '../../App'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Step1 } from './Step1/Step1'
import { Step2 } from './Step2/Step2'
import { Step3 } from './Step3/Step3'
import { Step4 } from './Step4/Step4'
import { Step5 } from './Step5/Step5'
import { Step6 } from './Step6/Step6'

type Props = {}

const steps = [
  'Наличие земельных ресурсов',
  'Прогнозные параметры развития растениеводства',
  'Прогнозные параметры развития животноводства',
  'Возможность приобретения кормов',
  'Договорные поставки, включая государственный заказ',
  'Цена реализации и себестоимости производства 1 ц продукции',
]

export const InputData = (props: Props) => {
  const [activeStep, setActiveStep] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    // Получаем последний шаг, на котором остановились
    const lastStep = parseInt(localStorage.getItem('lastInputStep') || '0', 10)
    setActiveStep(lastStep)
  }, [])

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      navigate(PATH.OUTPUT_DATA)
    } else {
      const nextStep = activeStep + 1
      setActiveStep(nextStep)
      localStorage.setItem('lastInputStep', nextStep.toString())
    }
  }

  const handleBack = () => {
    const prevStep = activeStep - 1
    setActiveStep(prevStep)
    localStorage.setItem('lastInputStep', prevStep.toString())
  }

  return (
    <Box sx={containerSx}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
      >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Typography
        variant='h2'
        gutterBottom
        sx={titleSx}
      >
        {steps[activeStep]}
      </Typography>
      <Box sx={tableContainerSx}>
        {activeStep === 0 && (
          <Step1
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {activeStep === 1 && (
          <Step2
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {activeStep === 2 && (
          <Step3
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {activeStep === 3 && (
          <Step4
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {activeStep === 4 && (
          <Step5
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {activeStep === 5 && (
          <Step6
            activeStep={activeStep}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
      </Box>
    </Box>
  )
}
