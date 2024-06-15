import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
 
import { Rootstate, useAppSelector } from "../store/configureStore";
import { SignedInMenu } from "./SignedInMenu";

const midlinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightlinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];

const navStyles = {
    color: "inherit",
    textDecoration: "none" ,
    typography: "h6",
    "&:hover": {
      color: "grey.500",
    },
    "&.active": {
        color:"text.secondary"
    }
}

interface Props {
  darkMode: boolean;
  handleThemeChange: () => void;
}

const Header = ({ darkMode, handleThemeChange }: Props) => {
  const {basket} = useAppSelector((state:Rootstate) => state.basket)
  const {user} = useAppSelector((state:Rootstate) => state.account)

const itemCount = basket?.items.reduce((sum,item) => sum + item.quantity,0)


  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar sx={{display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <Box   display="flex" alignItems="center" >
        <Typography
          variant="h6"
          component={NavLink}
          to="/"
          sx={navStyles}
        >
          Test App
        </Typography>

        <Switch checked={darkMode} onChange={handleThemeChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midlinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        
        <Box  display="flex" alignItems="center">
        <IconButton component={Link} to="/basket" size="large" edge="start" color="inherit" sx={{ mr: 2 }}>
          <Badge badgeContent={itemCount} color="secondary">
            <ShoppingCart />
          </Badge>
        </IconButton>
        {user ? (<SignedInMenu />)
        : (        <List sx={{ display: "flex" }}>
          {rightlinks.map(({ title, path }) => (
            <ListItem
              component={NavLink}
              to={path}
              key={path}
              sx={navStyles}
            >
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        )
         }


        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
