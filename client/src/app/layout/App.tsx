import { useCallback, useEffect, useState } from "react";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'
import LoadingComponents from "./LoadingComponents";
import { useAppDispatch } from "../store/configureStore";
import { fetchBasketItemAsync } from "../../features/Basket/BasketSlice";
import { fetchCurrentUser } from "../../features/account/acountSlice";
 
 
function App() {
  const dispatch = useAppDispatch();

  const [loading,setLoading] = useState(true);

  const initApp = useCallback( async () => {
    try {
      await dispatch(fetchCurrentUser);
      await dispatch(fetchBasketItemAsync);
 
      
    } catch (error) {
      
    }

  },[dispatch])


  useEffect(()=>{
    initApp().then(() => setLoading(false));
  },[])

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
