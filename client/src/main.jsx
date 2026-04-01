import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#007fff',
        },
        background: {
            default: '#18191a',
            paper: '#242526',
        },
        text: {
            primary: '#e4e6eb',
            secondary: '#b0b3b8',
        },
    },
    typography: {
        fontFamily: '"Outfit", "Inter", sans-serif',
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
