import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { useStoreContext } from "../../api/context/StoreContext";
import { getCookie } from "../util/util";
import agent from "../../api/agent";
import { LoadingButton } from "@mui/lab";
import LoadingComponents from "./LoadingComponents";

// const productsar = [
//   { name: "product1", price: 100.0 },
//   { name: "product2", price: 200.0 },
//   { name: "product3", price: 300.0 },
//   { name: "product4", price: 400.0 },
// ];

function App() {
  const {setBasket} = useStoreContext();
  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    const buyerId = getCookie("buyerId");
    if(buyerId){
      agent.Basket.get()
      .then(response => setBasket(response))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[setBasket])

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


if(loading) return <LoadingComponents message = "Initializing"/>

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
