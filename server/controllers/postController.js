const Post = require('../models/Post');

exports.createPost = async (req, res) => {
    try {
        const { text, image } = req.body;
        
        if (!text && !image) {
            return res.status(400).json({ message: 'Post must have text or image' });
        }

        const post = await Post.create({
            userId: req.user._id,
            username: req.user.username,
            text,
            image
        });

        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getFeed = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        
        const total = await Post.countDocuments();

        res.json({
            posts,
            page,
            pages: Math.ceil(total / limit),
            total
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const username = req.user.username;
        if (post.likes.includes(username)) {
            // Unlike
            post.likes = post.likes.filter(u => u !== username);
        } else {
            // Like
            post.likes.push(username);
        }

        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.commentOnPost = async (req, res) => {
    try {
        const { comment } = req.body;
        const post = await Post.findById(req.params.id);
        
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = {
            username: req.user.username,
            comment,
            createdAt: new Date()
        };

        post.comments.push(newComment);
        await post.save();
        
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
