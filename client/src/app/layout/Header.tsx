import { AppBar, Switch, Toolbar, Typography } from '@mui/material'


interface Props  {
darkMode: boolean;
handleThemeChange: () => void;
}

const Header = ({darkMode,handleThemeChange} :Props) => {
  return (
    <AppBar position='static' sx={{mb:4}}>
        <Toolbar>
        <Switch checked={darkMode} onChange={handleThemeChange} />
            <Typography variant='h6'>
                Test App
            </Typography>
        </Toolbar>
    </AppBar>
  )
}

export default Header