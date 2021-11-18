import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Button, Toolbar, Typography } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShopContext from './../context/shopContext';
import { ReactComponent as Logo } from '../assets/wineshop-logo.svg';
import customTheme from './../styles/theme.js';

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  logo: {
    width: '100%',
    height: '40px',
  },
};

export default function Navbar() {
  const { state, toggleCart } = useContext(ShopContext);
  const { isCartOpen } = state;

  return (
    <AppBar
      position='fixed'
      sx={{ height: '9vh', backgroundColor: customTheme.palette.white.main }}
    >
      <Toolbar sx={{ ...styles.container }}>
        <div>
          <Link to='/'>
            <Logo style={{ ...styles.logo }} />
          </Link>
        </div>
        <div>
          <Link style={{ textDecoration: 'none' }} to='products'>
            <Button variant='text'>
              <Typography variant='button'>BROWSE</Typography>
            </Button>
          </Link>
          <Button
            variant='text'
            startIcon={
              <ShoppingCartIcon
                sx={{ color: customTheme.palette.mediumGray.main }}
              />
            }
            aria-label={!isCartOpen && 'Open Cart'}
            onClick={() => toggleCart(true)}
            sx={{ ml: '40px' }}
          >
            <Typography variant='button'>CART</Typography>
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
}

// const styles = {
//     container: {
//       display: 'flex',
//       alignItems: 'center',
//       flex: 1,
//     },
//     navlink: {
//       color: 'white',
//       fontWeight: 'bold',
//     },
//     logoGroup: {
//       fontFamily: `'Righteous', sans-serif`,
//       fontSize: '1.8rem',
//       letterSpacing: '1.5px',
//       color: 'white',
//       display: 'flex',
//       width: '90%',
//     },
//     logoIcon: {
//       height: '28px',
//       width: '28px',
//       color: 'white',
//       margin: `4px 3px 0 0`,
//     },
//   };

//   const Navbar = () => {
//     return (
//       <AppBar position='fixed' style={{ height: '9vh' }}>
//         <Toolbar>
//           <div style={{ ...styles.container }}>
//             <div
//               style={{
//                 ...styles.logoGroup,
//               }}
//             >
//               <Link
//                 to='/'
//                 style={{
//                   ...styles.logoGroup,
//                 }}
//               >
//                 <CameraIcon style={{ ...styles.logoIcon }} />
//                 PETPIX
//               </Link>
//             </div>
//             <div>
//               <NavLink
//                 to='cats'
//                 className={({ isActive }) => (isActive ? 'nav-active' : '')}
//                 style={{ ...styles.navlink }}
//               >
//                 CATS
//               </NavLink>
//               <NavLink
//                 to='dogs'
//                 className={({ isActive }) => (isActive ? 'nav-active' : '')}
//                 style={{ ...styles.navlink, marginLeft: '30px' }}
//               >
//                 DOGS
//               </NavLink>
//             </div>
//           </div>
//         </Toolbar>
//       </AppBar>
//     );
//   };
