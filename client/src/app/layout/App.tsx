import { useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

// const productsar = [
//   { name: "product1", price: 100.0 },
//   { name: "product2", price: 200.0 },
//   { name: "product3", price: 300.0 },
//   { name: "product4", price: 400.0 },
// ];

function App() {
  const [darkmode,setDarkMode] = useState(false);
  const palletType = darkmode?'dark':'light'
  const theme = createTheme({
    palette:{
      mode:palletType,
      background:{
        default: palletType ==="light" ? '#eaeaea' : '#121212'
      }
    }
  });
  

const handleThemeChange = () => {
  setDarkMode(!darkmode);
}

  return (
    <>
    <ThemeProvider theme={theme}>
      <ToastContainer position="bottom-right"  hideProgressBar theme="colored" />
    <CssBaseline/>
       <Header darkMode={darkmode} handleThemeChange={handleThemeChange}/>
       <Container>
        <Outlet/>
        </Container>
     
        </ThemeProvider>
    </>
  );
}

export default App;
