import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api';
import { Container, Typography, TextField, Card, CardContent, CircularProgress, Grid } from '@mui/material';

const PostList = ({ darkMode }) => {
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const getPosts = async () => {
            try {
                const postsData = await fetchPosts();
                setPosts(postsData);
                setFilteredPosts(postsData);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        getPosts();
    }, []);

    useEffect(() => {
        const results = posts.filter(post =>
            post.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPosts(results);
    }, [searchTerm, posts]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen" style={{ position: 'relative', zIndex: 9999 }}>
                <CircularProgress style={{ color: darkMode ? '#ffffff' : '#000000' }} />
            </div>
        );
    }

    return (
        <Container className="scrollbar mt-8">
            <Typography variant="h4" gutterBottom className="text-center">
                Posts
            </Typography>
            <div className="mb-4">
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="mb-4"
                />
            </div>
            <Grid container spacing={3}>
                {filteredPosts.map(post => (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={post.id}>
                        <Card className="h-full flex flex-col" style={{ boxShadow: darkMode ? '0 8px 16px rgba(255,255,255,0.2)' : '0 8px 16px rgba(0,0,0,0.2)' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    {post.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    {post.body}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default PostList;
