import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import logoTransp from '../../images/logoTransp.png';
import { useNavigate } from 'react-router-dom';

const pageName = ['Página Inicial', 'Sobre', 'Adicionar um Livro', 'Lista de Livros Disponíveis'];

function ResponsiveAppBar({onNavigate}) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [selectedPage, setSelectedPage] = React.useState('');

  const navigate = useNavigate();

    const handlePaths = (page) => {
      let route = '';
    if (page === 'Página Inicial') {
      route = '/';
    } 
    if (page === 'Sobre' ){
      route = '/sobre';
    }
    if (page === 'Adicionar um Livro') {
      route = '/cadastrar';
    }
    if (page === 'Lista de Livros Disponíveis') {
      route = '/livros';
    }
    handleNavigation(route)
  }

  const handleNavigation = (path) => {
        navigate(path);
        if (onNavigate) onNavigate(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#fffdff' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}>
            <img src={logoTransp} alt="Logo" style={{ height: 40 }} />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pageName.map((page) => (
                <MenuItem 
                  key={page}
                  onClick={() => handlePaths(page)}
                  >
                  <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pageName.map((page) => (
              <Button
                key={page}
                onClick={() => {handlePaths(page); setSelectedPage(page);}}
                sx={{ my: 2, color: '#1976d2', display: 'block', backgroundColor: selectedPage === page ? '#ffeeff' : 'inherit',}}
              >
                {page}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;