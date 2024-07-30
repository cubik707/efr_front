import React from 'react';
import {Navigate, Route, Routes} from "react-router";
import {InputData} from "./pages/inputData/InputData";
import {Container, createTheme, ThemeProvider} from "@mui/material";
import {Error404} from "./pages/Error404";
import {OutputData} from "./pages/outputData/OutputData";

export const PATH = {
    INPUT_DATA: '/input',
    OUTPUT_DATA: '/output'
}

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#14AE5C',
                contrastText: '#FFFFFF',
            },
            secondary: {
                main: '#02542D'
            }
        },
    })
  return (
      <ThemeProvider theme={theme}>
          <Container maxWidth="lg">
              <Routes>
                  <Route path={'/'} element={<Navigate to={PATH.INPUT_DATA}/>}/>
                  <Route path={'/input'} element={<InputData/>}/>
                  <Route path={'/output'} element={<OutputData/>}/>
                  <Route path={"/page/error"} element={<Error404/>}/>
                  <Route path={"/*"} element={<Navigate to={"/page/error"}/>}/>
              </Routes>
          </Container>
      </ThemeProvider>
  );
}

export default App;
