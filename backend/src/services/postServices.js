const Post = require("../models/Post");
const calculateReadTime = require("../utils/readTime");
const { deleteCloudinaryImage, uploadImage } = require("./cloudinaryService");

const { validateCreatePostInput, validateObjectId, validateUpdatePostInput } = require("../validators/post.validators");
const buildCoverImageData = async (file) => {
    if (!file) return undefined;

    const uploadResult = await uploadImage(file, "aman-blog/posts");

    if (!uploadResult?.url || !uploadResult?.public_id) {
        throw new Error("Image upload failed. Please try again.");
    }

    return uploadResult;
};



const createPost = async (postData, userId, file) => {
    const { title, excerpt, content, tags = [], category } = postData;

    let parsedTags = tags;

if (typeof parsedTags === "string") {
  parsedTags = parsedTags.trim();

  try {
    parsedTags = JSON.parse(parsedTags);
  } catch {
    parsedTags = parsedTags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
  }
}

    validateCreatePostInput({ title, excerpt, content, tags: parsedTags, category });
    validateObjectId(userId);

    const baseSlug = title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");


    let slug = baseSlug;
    let counter = 1;

    while (await Post.exists({ slug })) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }
    const readTime = calculateReadTime(content);
    const coverImage = await buildCoverImageData(file);
    const post = await Post.create({
        title,
        slug,
        excerpt,
        content,
        category,
        tags: parsedTags,
        author: userId,
        readTime,
        ...(coverImage ? { coverImage } : {}),
    });

    return post;
};


const getAllPosts = async ({
    search,
    category,
    page = 1,
    limit = 10,
}) => {
    page = Number(page) || 1;
    limit = Number(limit) || 10;

    const skip = (page - 1) * limit;

    const query = {};


    const searchValue = typeof search === "string" ? search.trim() : "";

if (searchValue) {
    query.$or = [
        { title: { $regex: searchValue, $options: "i" } },
        { excerpt: { $regex: searchValue, $options: "i" } },
        { content: { $regex: searchValue, $options: "i" } },
        { tags: { $regex: searchValue, $options: "i" } },
    ];
}


    if (category?.trim()) {
        query.category = category;
    }

    const [posts, total] = await Promise.all([
        Post.find(query)
            .populate("author", "name")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean(),

        Post.countDocuments(query),
    ]);

    return {
        posts,

        pagination: {
            total,
            page,
            limit,
            totalPages: Math.ceil(total / limit),
            hasNextPage: page < Math.ceil(total / limit),
            hasPrevPage: page > 1,
        },
    };
};

const getPostBySlug = async (slug) => {
   

    const post = await Post.findOne({ slug }).populate("author", "name email");
    if (!post) {
        throw new Error("Post not found");

    }
    return post;
};




const incrementPostView = async (postId) => {
     validateObjectId(postId);
    const post = await Post.findByIdAndUpdate(postId,
        {
            $inc: { views: 1 },
        }, { new: true, });
    if (!post) {
        throw new Error("Post not found");
    }
    return post.views;
};


const updatePost = async (postId, userId, updateData, file) => {


    if (typeof updateData.tags === "string") {
  try {
    updateData.tags = JSON.parse(updateData.tags);
  } catch {
    updateData.tags = updateData.tags
      .split(",")
      .map(tag => tag.trim())
      .filter(Boolean);
  }
}
    validateObjectId(postId);
    validateObjectId(userId);

    validateUpdatePostInput(updateData, !!file);
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.author.toString() !== userId.toString()) {
        throw new Error("Not authorized to update this post");
    }

    if (updateData.title) {
        post.title = updateData.title;

        const baseSlug = updateData.title
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, "")
            .replace(/\s+/g, "-");
        let slug = baseSlug;
        let counter = 1;
        while (await Post.exists({
            slug, _id: { $ne: postId },
        })) {
            slug = `${baseSlug}-${counter}`;
            counter++;
        }
        post.slug = slug;
    }


    if (updateData.content) {
        post.content = updateData.content;
        const words = updateData.content
            .split(/\s+/).length;
        post.readTime = `${Math.max(1, Math.ceil(words / 200))} min read`;
    }

    if (file) {
        if (post.coverImage?.public_id) {
            await deleteCloudinaryImage(post.coverImage.public_id);
        }
        post.coverImage = await buildCoverImageData(file);
    }

    if (updateData.category) {
        post.category = updateData.category;
    }
    if (updateData.tags) {
        post.tags = updateData.tags;
    }

    await post.save();

    return post;
};

const deletePost = async (postId, userId) => {
    validateObjectId(postId);
    validateObjectId(userId);

    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.author.toString() !== userId.toString()) {
        throw new Error("Not authorized to delete this post");
    }

    if (post.coverImage?.public_id) {
        await deleteCloudinaryImage(post.coverImage.public_id);
    }

    await Post.findByIdAndDelete(postId);

    return true;
};
const toggleReaction = async (postId, userId, action) => {
    validateObjectId(postId);
    validateObjectId(userId);

    const post = await Post.findById(postId);
    if (!post) {
        throw new Error("Post not found");
    }

    const uid = userId.toString();
    const hasLiked = post.likes.some((id) => id.toString() === uid);
    const hasDisliked = post.dislikes.some((id) => id.toString() === uid);

    if (action === "like") {
        if (hasLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== uid);
        } else {
            post.likes.push(userId);
            if (hasDisliked) {
                post.dislikes = post.dislikes.filter((id) => id.toString() !== uid);
            }
        }
    } else if (action === "dislike") {
        if (hasDisliked) {
            post.dislikes = post.dislikes.filter((id) => id.toString() !== uid);
        } else {
            post.dislikes.push(userId);
            if (hasLiked) {
                post.likes = post.likes.filter((id) => id.toString() !== uid);
            }
        }
    }

    await post.save();

    return {
        likesCount: post.likes.length,
        dislikesCount: post.dislikes.length,
        liked: post.likes.some((id) => id.toString() === uid),
        disliked: post.dislikes.some((id) => id.toString() === uid),
    };
};

const toggleLikePost = (postId, userId) => toggleReaction(postId, userId, "like");
const toggleDislikePost = (postId, userId) => toggleReaction(postId, userId, "dislike");

const getPostById = async (postId) => {
    validateObjectId(postId);
    const post = await Post.findById(postId).populate("author", "name email");
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
};
module.exports = {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePost,
    deletePost,
    toggleLikePost,
    toggleDislikePost,
    getPostById,
};