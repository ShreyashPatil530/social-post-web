import { AppBar, Toolbar, Typography, Button, Container, Box, Avatar } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <AppBar position="sticky" sx={{ 
            bgcolor: 'rgba(24, 25, 26, 0.8)', 
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid #333',
            boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
            zIndex: 1100
        }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '70px' }}>
                    <Typography
                        variant="h5"
                        component={Link}
                        to="/"
                        sx={{
                            fontWeight: 900,
                            color: '#007fff',
                            textDecoration: 'none',
                            letterSpacing: '-1px',
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.2s',
                            '&:hover': { transform: 'scale(1.02)' }
                        }}
                    >
                        TASK<span style={{ color: '#fff' }}>PLANET</span>
                    </Typography>

                    <Box display="flex" alignItems="center" gap={2}>
                        {user ? (
                            <>
                                <Button 
                                    component={Link} 
                                    to="/" 
                                    sx={{ 
                                        color: '#fff', 
                                        fontWeight: 600,
                                        '&:hover': { color: '#007fff' }
                                    }}
                                >
                                    Home
                                </Button>
                                <Button 
                                    onClick={handleLogout} 
                                    sx={{ 
                                        color: '#ff4b2b', 
                                        fontWeight: 600,
                                        '&:hover': { bgcolor: 'rgba(255, 75, 43, 0.1)' }
                                    }}
                                >
                                    Logout
                                </Button>
                                <Avatar sx={{ bgcolor: '#007fff', ml: 1, width: 36, height: 36, fontWeight: 'bold' }}>
                                    {user.username[0].toUpperCase()}
                                </Avatar>
                            </>
                        ) : (
                            <>
                                <Button component={Link} to="/login" sx={{ color: '#fff', fontWeight: 600 }}>Login</Button>
                                <Button 
                                    component={Link} 
                                    to="/signup" 
                                    variant="contained" 
                                    sx={{ 
                                        borderRadius: '24px', 
                                        fontWeight: 'bold',
                                        px: 3,
                                        boxShadow: '0 4px 14px rgba(0, 127, 255, 0.4)'
                                    }}
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar;
