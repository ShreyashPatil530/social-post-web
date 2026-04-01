import { Card, CardHeader, CardContent, CardMedia, CardActions, Avatar, Typography, IconButton, Box } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline, Share } from '@mui/icons-material';
import { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../services/api';
import CommentSection from './CommentSection';

const PostCard = ({ post }) => {
    const { user } = useContext(AuthContext);
    const [likes, setLikes] = useState(post.likes || []);
    const [showComments, setShowComments] = useState(false);
    const [postData, setPostData] = useState(post);

    const isLiked = user ? likes.includes(user.username) : false;
    const username = post.username || 'Anonymous';
    const initial = username[0].toUpperCase();

    const handleLike = async () => {
        if (!user) return alert('Please login to like posts');
        try {
            const { data } = await api.post(`/posts/${post._id}/like`);
            setLikes(data.likes);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Card sx={{ 
            bgcolor: '#242526', 
            color: '#fff', 
            mb: 4, 
            borderRadius: '16px',
            border: '1px solid #3e4042',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 8px 30px rgba(0,0,0,0.4)',
                borderColor: '#4e5052'
            }
        }}>
            <CardHeader
                avatar={<Avatar sx={{ bgcolor: '#007fff', fontWeight: 'bold' }}>{initial}</Avatar>}
                title={<Typography fontWeight="700" sx={{ fontSize: '1rem' }}>{username}</Typography>}
                subheader={<Typography variant="caption" sx={{ color: '#b0b3b8' }}>{new Date(post.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}</Typography>}
            />
            
            <CardContent sx={{ pt: 1 }}>
                <Typography variant="body1" sx={{ fontSize: '1.05rem', lineHeight: 1.5, color: '#e4e6eb' }}>
                    {post.text}
                </Typography>
            </CardContent>

            {post.image && post.image.trim() !== '' && (
                <CardMedia
                    component="img"
                    image={post.image}
                    alt="Post content"
                    sx={{ 
                        maxHeight: '550px', 
                        objectFit: 'contain', 
                        bgcolor: '#121212',
                        borderTop: '1px solid #3e4042',
                        borderBottom: '1px solid #3e4042'
                    }}
                />
            )}

            <CardActions sx={{ px: 2, py: 1, borderTop: '1px solid #3e4042' }}>
                <Box display="flex" alignItems="center" mr={3}>
                    <IconButton onClick={handleLike} sx={{ color: isLiked ? '#ff4b2b' : '#b0b3b8' }}>
                        {isLiked ? <Favorite /> : <FavoriteBorder />}
                    </IconButton>
                    <Typography variant="body2">{likes.length}</Typography>
                </Box>
                
                <Box display="flex" alignItems="center">
                    <IconButton onClick={() => setShowComments(!showComments)} sx={{ color: '#b0b3b8' }}>
                        <ChatBubbleOutline />
                    </IconButton>
                    <Typography variant="body2">{postData.comments.length}</Typography>
                </Box>
            </CardActions>

            {showComments && (
                <CommentSection post={postData} setPost={setPostData} />
            )}
        </Card>
    );
};

export default PostCard;
