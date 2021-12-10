import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  AppBar,
  Badge,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
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

  // browse menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
  const badgeQty = checkout.lineItems && calcCartBadgeQty();

  const theme = useTheme();
  const smScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const xsScreen = useMediaQuery('(max-width:400px)');

  return (
    <AppBar
      position='fixed'
      sx={{ height: '9vh', backgroundColor: customTheme.palette.white.main }}
    >
      <Container maxWidth='lg'>
        <Toolbar sx={styles.container}>
          <Link to={`/`} style={{ textDecoration: 'none' }}>
            <Logo
              style={
                xsScreen ? { ...styles.logoSmall } : { ...styles.logoRegular }
              }
            />
          </Link>
          <Box sx={styles.navItemContainer}>
            <div>
              <Button
                id='basic-button'
                aria-controls='basic-menu'
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                Browse{' '}
                <span style={{ paddingTop: customTheme.spacing(1) }}>
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

            <IconButton
              aria-label={!isCartOpen && 'Open Cart'}
              onClick={() => toggleCart(true)}
              sx={{
                ml: `${
                  xsScreen
                    ? customTheme.spacing(1)
                    : smScreen
                    ? customTheme.spacing(4)
                    : customTheme.spacing(8)
                }`,
              }}
            >
              <Badge badgeContent={badgeQty} color='secondary'>
                <ShoppingCartIcon
                  sx={{ color: customTheme.palette.mediumGrayText.main }}
                />
              </Badge>
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
