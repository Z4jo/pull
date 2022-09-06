import './App.css';
import { ThemeProvider } from '@emotion/react';
import {createTheme} from "@mui/material/styles";
import FocusSession from './components/FocusSession';
import AppBar from './components/AppBar';
import Data from './components/Data';
import Chart from './components/Chart';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





const theme=createTheme({
  palette :{
    primary: { 
      main: '#1976d2'
    },
    secondary:
    {
      main:  '#f50057'
    }

  }
})

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <AppBar></AppBar> 
        <Routes>
          <Route path='/' element={<FocusSession/>}/>
          <Route path='/chart' element={<Chart/>}/>
          <Route path='/tables' element={<Data/>}/>
          <Route path='*' element={<FocusSession/>}></Route>
        </Routes>
    </ThemeProvider>
    </Router>
  );
}

export default App;
