import React from 'react'
import { Navigate, Route, Routes } from 'react-router'
import { InputData } from './pages/inputData/InputData'
import { Container, createTheme, ThemeProvider } from '@mui/material'
import { Error404 } from './pages/Error404'
import { OutputData } from './pages/outputData/OutputData'
import { green, orange } from '@mui/material/colors'

export const PATH = {
  INPUT_DATA: '/input',
  OUTPUT_DATA: '/output',
}

const inputTheme = createTheme({
  palette: {
    primary: {
      main: green[500],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#02542D',
    },
  },
})

const outputTheme = createTheme({
  palette: {
    primary: {
      main: orange[500],
      contrastText: '#FFFFFF',
    },
    // secondary: {
    //     main: '#FFA500'
    // }
  },
})

function App() {
  return (
    <Container maxWidth='lg'>
      <Routes>
        <Route
          path={'/'}
          element={<Navigate to={PATH.INPUT_DATA} />}
        />
        <Route
          path={PATH.INPUT_DATA}
          element={
            <ThemeProvider theme={inputTheme}>
              <InputData />
            </ThemeProvider>
          }
        />
        <Route
          path={PATH.OUTPUT_DATA}
          element={
            <ThemeProvider theme={outputTheme}>
              <OutputData />
            </ThemeProvider>
          }
        />
        <Route
          path={'/page/error'}
          element={<Error404 />}
        />
        <Route
          path={'/*'}
          element={<Navigate to={'/page/error'} />}
        />
      </Routes>
    </Container>
  )
}

export default App
