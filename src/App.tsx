import React from 'react';
import {Route, Routes} from "react-router";
import {InputData} from "./pages/InputData";
import {Container, createTheme, ThemeProvider} from "@mui/material";

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
                  <Route path={'/'} element={<InputData/>}/>
              </Routes>
          </Container>
      </ThemeProvider>
  );
}

export default App;
