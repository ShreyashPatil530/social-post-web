import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { CssBaseline, Box } from '@mui/material';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Feed from './pages/Feed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AppRoutes = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return null;

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: '#18191a' }}>
            <Navbar />
            <Routes>
                <Route path="/" element={<Feed />} />
                <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
            </Routes>
            <ToastContainer theme="dark" position="bottom-right" />
        </Box>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <CssBaseline />
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
};

export default App;
