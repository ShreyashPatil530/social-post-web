import { Container, Box, CircularProgress, Typography, Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import PostCard from '../components/PostCard';
import CreatePost from '../components/CreatePost';
import api from '../services/api';
import { AuthContext } from '../context/AuthContext';

const Feed = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const { user } = useContext(AuthContext);

    const fetchPosts = async (p = 1) => {
        try {
            const { data } = await api.get(`/posts/feed?page=${p}&limit=5`);
            if (p === 1) {
                setPosts(data.posts);
            } else {
                setPosts(prev => [...prev, ...data.posts]);
            }
            setHasMore(data.page < data.pages);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts(1);
    }, []);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    const loadMore = () => {
        const nextPage = page + 1;
        setPage(nextPage);
        fetchPosts(nextPage);
    };

    return (
        <Container maxWidth="sm" sx={{ py: 6 }}>
            {user && (
                <Box mb={4}>
                    <Typography variant="h4" fontWeight="800" sx={{ color: '#fff', mb: 1 }}>
                        Hello, {user.username}!
                    </Typography>
                    <Typography variant="body1" sx={{ color: '#b0b3b8' }}>
                        See what's happening in your network today.
                    </Typography>
                </Box>
            )}

            {user && <CreatePost onPostCreated={handlePostCreated} />}
            
            {loading && page === 1 ? (
                <Box display="flex" flexDirection="column" alignItems="center" mt={10}>
                    <CircularProgress sx={{ color: '#007fff', mb: 2 }} />
                    <Typography sx={{ color: '#b0b3b8' }}>Fetching your feed...</Typography>
                </Box>
            ) : (
                <>
                    {posts.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                            {posts.map(post => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </Box>
                    ) : (
                        <Box sx={{ textAlign: 'center', py: 10, bgcolor: '#242526', borderRadius: '16px', border: '1px border #3e4042' }}>
                            <Typography variant="h6" sx={{ color: '#fff', mb: 1 }}>No posts yet</Typography>
                            <Typography variant="body2" sx={{ color: '#b0b3b8' }}>Be the first one to share something with the community!</Typography>
                        </Box>
                    )}
                    
                    {hasMore && (
                        <Box display="flex" justifyContent="center" mt={4} mb={6}>
                            <Button 
                                onClick={loadMore} 
                                variant="outlined"
                                sx={{ 
                                    color: '#007fff', 
                                    borderColor: '#007fff',
                                    borderRadius: '24px',
                                    fontWeight: 'bold',
                                    px: 4,
                                    '&:hover': {
                                        bgcolor: 'rgba(0, 127, 255, 0.1)',
                                        borderColor: '#007fff'
                                    }
                                }}
                                disabled={loading}
                            >
                                {loading ? 'Loading...' : 'Load More Posts'}
                            </Button>
                        </Box>
                    )}
                </>
            )}
        </Container>
    );
};

export default Feed;
