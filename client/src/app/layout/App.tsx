import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";

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
    <CssBaseline/>
       <Header darkMode={darkmode} handleThemeChange={handleThemeChange}/>
       <Container>
        <Catalog />
        </Container>
     
        </ThemeProvider>
    </>
  );
}

export default App;
