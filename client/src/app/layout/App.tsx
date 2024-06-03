import { useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import { getCookie } from "../util/util";
import agent from "../../api/agent";
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { setBasket } from "../../features/Basket/BasketSlice";
 
 
function App() {
  const dispatch = useAppDispatch();

  const [loading,setLoading] = useState(true);


  useEffect(()=>{
    const buyerId = getCookie("buyerId");
    if(buyerId){
      agent.Basket.get()
      .then(response => dispatch(setBasket(response)))
      .catch(error => console.log(error))
      .finally(() => setLoading(false))
    }
    else{
      setLoading(false);
    }
  },[dispatch])

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
