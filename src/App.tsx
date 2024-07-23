import React from 'react';
import {Route, Routes} from "react-router";
import {InputData} from "./pages/InputData";

function App() {
  return (
   <Routes>
     <Route path={'/'} element={<InputData/>}/>
   </Routes>
  );
}

export default App;
