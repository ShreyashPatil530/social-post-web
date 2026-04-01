import { Card, Box, Avatar, TextField, Button, IconButton } from '@mui/material';
import { Image } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CreatePost = ({ onPostCreated }) => {
    const { user } = useContext(AuthContext);
    const [text, setText] = useState('');
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!text.trim() && !image.trim()) return;
        
        setLoading(true);
        try {
            const { data } = await api.post('/posts/create', { text, image });
            onPostCreated(data);
            setText('');
            setImage('');
        } catch (err) {
            console.error(err);
            alert('Failed to create post. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <Card sx={{ 
            bgcolor: '#242526', 
            p: 3, 
            mb: 4, 
            borderRadius: '16px', 
            border: '1px solid #3e4042',
            boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
        }}>
            <form onSubmit={handleSubmit}>
                <Box display="flex" gap={2} mb={2}>
                    <Avatar sx={{ 
                        bgcolor: '#007fff', 
                        width: 48, 
                        height: 48,
                        fontSize: '1.2rem',
                        fontWeight: 'bold'
                    }}>
                        {user.username[0].toUpperCase()}
                    </Avatar>
                    <TextField
                        fullWidth
                        multiline
                        rows={2}
                        placeholder={`What's on your mind, ${user.username}?`}
                        variant="standard"
                        InputProps={{ 
                            disableUnderline: true, 
                            sx: { 
                                color: '#fff', 
                                fontSize: '1.1rem',
                                '&::placeholder': { color: '#b0b3b8', opacity: 1 }
                            } 
                        }}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </Box>
                
                {image && image.trim() !== '' && (
                    <Box mt={2} mb={2} borderRadius="12px" overflow="hidden" border="1px solid #3e4042">
                        <img 
                            src={image} 
                            alt="Preview" 
                            style={{ width: '100%', maxHeight: '400px', objectFit: 'contain', display: 'block', backgroundColor: '#000' }} 
                            onError={(e) => e.target.style.display = 'none'}
                        />
                    </Box>
                )}

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={3} pt={2} borderTop="1px solid #3e4042">
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                        <TextField
                            placeholder="Paste Image URL..."
                            size="small"
                            fullWidth
                            variant="outlined"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    color: '#fff',
                                    bgcolor: '#1c1e21',
                                    borderRadius: '24px',
                                    px: 2,
                                    '& fieldset': { borderColor: '#3e4042' },
                                    '&:hover fieldset': { borderColor: '#007fff' },
                                    '&.Mui-focused fieldset': { borderColor: '#007fff' },
                                },
                                '& .MuiInputBase-input': { py: 1 }
                            }}
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </Box>
                    <Button 
                        type="submit" 
                        variant="contained" 
                        disabled={loading || (!text.trim() && !image.trim())}
                        sx={{ 
                            borderRadius: '24px', 
                            textTransform: 'none', 
                            px: 4, 
                            py: 1,
                            fontWeight: 'bold',
                            fontSize: '1rem',
                            boxShadow: '0 4px 14px rgba(0, 127, 255, 0.4)',
                            '&:hover': {
                                bgcolor: '#0066cc',
                                boxShadow: '0 6px 20px rgba(0, 127, 255, 0.6)',
                            },
                            '&:disabled': {
                                bgcolor: '#3a3b3c',
                                color: '#777'
                            }
                        }}
                    >
                        {loading ? 'Posting...' : 'Post'}
                    </Button>
                </Box>
            </form>
        </Card>
    );
};

export default CreatePost;
