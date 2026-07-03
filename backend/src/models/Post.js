
const mongoose = require("mongoose");
const postSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, "Title is required"],
            trim: true,
            minlength: 5,
            maxlength: 80,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },

        excerpt: {
            type: String,
            required: [true, "excerpt is required"],
            maxlength: 170,
        },

        content: {
            type: String,
            required: true,
            minlength: 150,

        },

        author: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },

        category: {
            type: String,
            required: true,
            trim: true,
        },

        coverImage: {
            url: {
                type: String,
                default: "",
            },
            public_id: {
                type: String,
                default: "",
            },
        },

        tags: {
            type: [String],
            default: [],
        },

        views: {
            type: Number,
            default: 0,
        },

        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
        ],

        commentsCount: {
            type: Number,
            default: 0,
        },
        readTime: {
            type: String,
            required: true,

        },

    },
    {
        timestamps: true,
    }
);

const Post = mongoose.model("Post", postSchema);
module.exports = Post;


