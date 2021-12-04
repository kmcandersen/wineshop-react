import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopContext from './../context/shopContext';
import { ReactComponent as Logo } from '../assets/wineshop-logo.svg';
import collectionIds from '../config/collectionIds.js';
import customTheme from './../styles/theme.js';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  logoRegular: {
    flexGrow: 1,
    height: '40px',
    width: '170px',
  },
  logoSmall: {
    flexGrow: 1,
    height: '30px',
    width: '128px',
  },
  navItemContainer: {
    display: 'flex',
    flexContainer: 'row',
    justifyContent: 'center',
  },
};

export default function Navbar() {
  const { state, toggleCart } = useContext(ShopContext);
  const { checkout, isCartOpen } = state;

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // changes cart button appearance
  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsScreen = useMediaQuery('(max-width:400px)');

  const calcCartBadgeQty = () => {
    let total = checkout.lineItems.reduce((acc, item) => {
      return acc + item.quantity;
    }, 0);
    if (total) {
      return total;
    } else {
      return null;
    }
  };
  const cartQty = checkout.lineItems && calcCartBadgeQty();

  return (
    <AppBar
      position='fixed'
      sx={{ height: '9vh', backgroundColor: customTheme.palette.white.main }}
    >
      <Toolbar sx={{ ...styles.container }}>
        <div>
          <Logo
            onClick={() => {
              navigate(`/`);
            }}
            style={
              xsScreen ? { ...styles.logoSmall } : { ...styles.logoRegular }
            }
          />
        </div>
        <Box sx={{ ...styles.navItemContainer }}>
          <div>
            <Button
              id='basic-button'
              aria-controls='basic-menu'
              aria-haspopup='true'
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              Browse{' '}
              <span style={{ paddingTop: '5px' }}>
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </span>
            </Button>
            <Menu
              id='basic-menu'
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate(`/products`);
                  handleClose();
                }}
              >
                All wines
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/collections/reds`, {
                    state: { collId: collectionIds.reds },
                  });
                  handleClose();
                }}
              >
                Reds
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/collections/whites`, {
                    state: { collId: collectionIds.whites },
                  });
                  handleClose();
                }}
              >
                Whites
              </MenuItem>
              <MenuItem
                onClick={() => {
                  navigate(`/collections/roses`, {
                    state: { collId: collectionIds.roses },
                  });
                  handleClose();
                }}
              >
                Rosés
              </MenuItem>
            </Menu>
          </div>
          {smScreen ? (
            <IconButton
              aria-label={!isCartOpen && 'Open Cart'}
              onClick={() => toggleCart(true)}
              sx={{ ml: `${xsScreen ? '5px' : '20px'}` }}
            >
              <Badge badgeContent={cartQty} color='secondary'>
                <ShoppingCartIcon
                  sx={{ color: customTheme.palette.mediumGrayText.main }}
                />
              </Badge>
            </IconButton>
          ) : (
            <Button
              variant='text'
              startIcon={
                <ShoppingCartIcon
                  sx={{ color: customTheme.palette.mediumGrayText.main }}
                />
              }
              aria-label={!isCartOpen && 'Open Cart'}
              onClick={() => toggleCart(true)}
              sx={{ ml: '40px' }}
            >
              <Typography variant='button'>CART</Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
