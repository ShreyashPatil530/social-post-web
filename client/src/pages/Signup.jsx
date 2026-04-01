import { Container, Box, Typography, TextField, Button, Card, Link as MuiLink } from '@mui/material';
import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import { toast } from 'react-toastify';

const Signup = () => {
    const [formData, setFormData] = useState({ username: '', email: '', password: '' });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await api.post('/auth/signup', formData);
            login(data);
            toast.success('Account created!');
            navigate('/');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Signup failed');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box mt={8} display="flex" flexDirection="column" alignItems="center">
                <Card sx={{ p: 4, width: '100%', bgcolor: '#242526', color: '#fff', borderRadius: '12px', border: '1px solid #3e4042' }}>
                    <Typography variant="h4" fontWeight="800" textAlign="center" gutterBottom>
                        TASKPLANET
                    </Typography>
                    <Typography variant="body1" textAlign="center" color="#b0b3b8" mb={3}>
                        Sign up to share your tasks and connect with others.
                    </Typography>
                    
                    <form onSubmit={handleSubmit}>
                        <TextField
                            fullWidth
                            label="Username"
                            variant="outlined"
                            margin="normal"
                            sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#3e4042' } }, '& .MuiInputLabel-root': { color: '#b0b3b8' } }}
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Email"
                            variant="outlined"
                            margin="normal"
                            sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#3e4042' } }, '& .MuiInputLabel-root': { color: '#b0b3b8' } }}
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            variant="outlined"
                            margin="normal"
                            sx={{ '& .MuiOutlinedInput-root': { color: '#fff', '& fieldset': { borderColor: '#3e4042' } }, '& .MuiInputLabel-root': { color: '#b0b3b8' } }}
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        />
                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            sx={{ mt: 3, py: 1.2, fontWeight: 'bold', borderRadius: '8px' }}
                        >
                            Sign Up
                        </Button>
                    </form>

                    <Box mt={4} textAlign="center">
                        <Typography variant="body2" color="#b0b3b8">
                            Have an account? <MuiLink component={Link} to="/login" sx={{ color: '#007fff', fontWeight: 'bold', textDecoration: 'none' }}>Log In</MuiLink>
                        </Typography>
                    </Box>
                </Card>
            </Box>
        </Container>
    );
};

export default Signup;
