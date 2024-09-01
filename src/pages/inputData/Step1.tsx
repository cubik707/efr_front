// @flow
import * as React from 'react'
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { buttonContainerSx, containerSx, navigationButtonsContainerSx } from './InputData.styles'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight'
import { setLandResourcesData } from '../../state/landResources/landResources-thunk'
import { useAppDispatch } from '../../state/store'
import { LandResourcesType } from '../../state/landResources/landResources-reducer'
import { handleError } from '../../utils/handleErrors'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

export type StepsProps = {
  activeStep: number
  onBack: () => void
  onNext: () => void
};

const headers = ['Показатели', 'Наличие']

// Validation schema for Formik
const validationSchema = Yup.object({
  arableLand: Yup.number().required('Это поле обязательно'),
  hayfieldsAndPastureImproved: Yup.number().required('Это поле обязательно'),
  hayfieldsAndPastureNatural: Yup.number().required('Это поле обязательно'),
});

export const Step1 = (props: StepsProps) => {
  const dispatch = useAppDispatch();

  const initialValues: LandResourcesType = {
    arableLand: 0,
    hayfieldsAndPastureImproved: 0,
    hayfieldsAndPastureNatural: 0,
  };

  const handleNextStep = async (values: LandResourcesType) => {
    try {
      await dispatch(setLandResourcesData(values));
      props.onNext();
    } catch (error: any) {
      handleError(error, dispatch)
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleNextStep}
    >
      {({ isValid, dirty }) => (
        <Form>
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
                      <Field
                        name="arableLand"
                        as="input"
                        type="number"
                      />
                      <ErrorMessage name="arableLand" component="div" style={{ color: 'red' }} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Сенокосы и пастбища улучшенные, га</TableCell>
                    <TableCell>
                      <Field
                        name="hayfieldsAndPastureImproved"
                        as="input"
                        type="number"
                      />
                      <ErrorMessage name="hayfieldsAndPastureImproved" component="div" style={{ color: 'red' }} />
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Сенокосы и пастбища естественные, га</TableCell>
                    <TableCell>
                      <Field
                        name="hayfieldsAndPastureNatural"
                        as="input"
                        type="number"
                      />
                      <ErrorMessage name="hayfieldsAndPastureNatural" component="div" style={{ color: 'red' }} />
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
                <Button
                  variant="contained"
                  endIcon={<KeyboardArrowRightIcon />}
                  type="submit"
                  disabled={!isValid || !dirty}
                >Далее</Button>
              </Box>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  )
}
