const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: function() {
            return !this.image; // Required if image is not present
        }
    },
    image: {
        type: String,
        required: function() {
            return !this.text; // Required if text is not present
        }
    },
    likes: [{
        type: String // Storing usernames for simplicity as requested
    }],
    comments: [{
        username: {
            type: String,
            required: true
        },
        comment: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', postSchema);
