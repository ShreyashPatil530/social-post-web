import { Box, Typography, TextField, Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, Divider } from '@mui/material';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';

const CommentSection = ({ post, setPost }) => {
    const { user } = useContext(AuthContext);
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim() || !user) return;

        setLoading(true);
        try {
            const { data } = await api.post(`/posts/${post._id}/comment`, { comment });
            setPost(data);
            setComment('');
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box sx={{ p: 2, bgcolor: '#1c1e21', borderBottomLeftRadius: '12px', borderBottomRightRadius: '12px' }}>
            <Divider sx={{ mb: 2, borderColor: '#3e4042' }} />
            
            <List sx={{ maxHeight: '300px', overflowY: 'auto' }}>
                {post.comments.map((c, i) => (
                    <ListItem key={i} alignItems="flex-start" sx={{ px: 0 }}>
                        <ListItemAvatar>
                            <Avatar sx={{ width: 32, height: 32, bgcolor: '#555', fontSize: '0.8rem' }}>{c.username[0].toUpperCase()}</Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                            primary={
                                <Typography variant="body2" fontWeight="bold" sx={{ color: '#e4e6eb' }}>
                                    {c.username}
                                </Typography>
                            }
                            secondary={
                                <Typography variant="body2" sx={{ color: '#b0b3b8' }}>
                                    {c.comment}
                                </Typography>
                            }
                        />
                    </ListItem>
                ))}
            </List>

            {user ? (
                <Box component="form" onSubmit={handleComment} display="flex" gap={1} mt={2}>
                    <Avatar sx={{ width: 32, height: 32 }}>{user.username[0].toUpperCase()}</Avatar>
                    <TextField
                        fullWidth
                        size="small"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                color: '#fff',
                                bgcolor: '#3a3b3c',
                                borderRadius: '20px',
                                '& fieldset': { border: 'none' },
                            },
                            '& input::placeholder': { color: '#b0b3b8' }
                        }}
                    />
                    <Button 
                        type="submit" 
                        disabled={loading || !comment.trim()} 
                        sx={{ color: '#007fff', fontWeight: 'bold' }}
                    >
                        Post
                    </Button>
                </Box>
            ) : (
                <Typography variant="body2" sx={{ color: '#b0b3b8', mt: 1, textAlign: 'center' }}>
                    Login to comment
                </Typography>
            )}
        </Box>
    );
};

export default CommentSection;
