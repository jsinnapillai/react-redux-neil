import { Button, Menu, MenuItem } from '@mui/material';
import React from 'react'
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { signOut } from '../../features/account/acountSlice';
import { clearBasket } from '../../features/Basket/BasketSlice';

export const SignedInMenu = () => {
    const dispatch = useAppDispatch();
    const {user}  = useAppSelector(state => state.account)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button color='inherit'
        sx={{typography:'h6'}}
          onClick={handleClick}
        >
          {user?.email}
        </Button>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My Orders</MenuItem>
          <MenuItem onClick={()=> {
            dispatch(signOut())
            dispatch(clearBasket())
        }
          }>Logout</MenuItem>
        </Menu>
      </>
    );
}
