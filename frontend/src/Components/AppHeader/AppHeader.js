import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import Avatar from '@mui/material/Avatar';
import PixIcon from '@mui/icons-material/Pix';
import MenuItem from '@mui/material/MenuItem';
import { NavLink } from "react-router-dom";
import Link from '@mui/material/Link';
import Container from "@mui/material/Container";
import { useContext } from 'react';
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const drawerWidth = 240;
const settingsToRoute = [
  {
    isLoggedIn: true,
    name: 'Profile',
    path: './account'
  }, 
  {
    isLoggedIn: true,
    name: 'Logout',
    path: './logout'
  }, 
  {
    isLoggedIn: false,
    name: 'SignIn',
    path: './signin'
  }, 
  {
    isLoggedIn: false,
    name: 'SignUp',
    path: './signup'
  }
];

export default function AppHeader(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (event) => {
    setAnchorElUser(null);
    console.log('event ' + event.target.innerText);
    const settingItem = settingsToRoute.find(item => item.name === event.target.innerText);
    navigate(settingItem ? settingItem.path : './');
  };

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const navList = authCtx.isLoggedIn ?
  [
    { 
      to: '/',
      name: 'Home'
    },
    { 
      to: '/incomes',
      name: 'Incomes'
    },
    { 
      to: '/expenses',
      name: 'Expenses'
    },
    { 
      to: '/dashboard',
      name: 'Dashboard'
    },
    { 
      to: '/savings',
      name: 'Savings'
    },
    // { 
    //   to: '/editinformation',
    //   name: 'EditInformation'
    // },
    // { 
    //   to: '/logout',
    //   name: 'Logout'
    // }
  ] : 
  [
    // { 
    //   to: '/signin',
    //   name: 'SignIn'
    // },
    // { 
    //   to: '/signup',
    //   name: 'SignUp'
    // }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        SpendSmart
      </Typography>
      <Divider />
      <List>
        {/* {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))} */}

        {navList.map((item) => (
          <ListItem key={item.to} disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <Link href={item.to}>
                <ListItemText primary={item.name} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}       
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" color="primary">
      <Container maxWidth="xl">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          {/* <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography> */}

          <PixIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            SpendSmart
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {navList.map(({ to, name }) => (
              <Button key={name}>
                <NavLink key={to} to={to} style={({ isActive }) => ({color: isActive ? '#ff895d' : '#fff'})}>
                  {name}
                </NavLink>
              </Button>
            ))}
          </Box>

          {/* Avatar and settings start here*/}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt={authCtx.accountDetails.accountName} src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settingsToRoute.filter(item => item.isLoggedIn === authCtx.isLoggedIn).map((item) => (
                <MenuItem key={item.name} value={item.name} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{item.name}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/* Avatar and settings end*/}

        </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
  
    </Box>
  );
}

AppHeader.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   * aaaa
   */
  window: PropTypes.func,
};
