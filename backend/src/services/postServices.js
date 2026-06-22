const Post = require("../models/Post");
const calculateReadTime = require("../utils/readTime");
const createPost = async (postData, userId) => {
    const { title, excerpt, content, coverImage, tags = [], category } = postData;


    if (!title || !content || !excerpt) {
        throw new Error("Fields are are required");
    }


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
    const post = await Post.create({
        title,
        slug,
        excerpt,
        content,
        coverImage,
        category,
        tags,
        author: userId,
        readTime,
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

    // Search
    if (search?.trim()) {
        query.$or = [
            { title: { $regex: search.trim(), $options: "i" } },
            { excerpt: { $regex: search.trim(), $options: "i" } },
            { content: { $regex: search.trim(), $options: "i" } },
            { tags: { $regex: search.trim(), $options: "i" } },
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
    const post = await Post.findByIdAndUpdate(postId,
        {
            $inc: { views: 1 },
        }, { new: true, });
    if (!post) {
        throw new Error("Post not found");
    }
    return post.views;
};


const updatePost = async (postId, userId, updateData) => {
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
          while ( await Post.exists({ 
            slug, _id: { $ne: postId }, 
        }) ) { slug = `${baseSlug}-${counter}`; 
        counter++; 
    } 
    post.slug = slug; 
}
    

   if (updateData.content) { 
    post.content = updateData.content;
     const words = updateData.content
     .split(/\s+/).length; 
     post.readTime = `${Math.max( 1, Math.ceil(words / 200) )} min read`; 
    }

    if (updateData.coverImage) { 
        post.coverImage = updateData.coverImage;
     } 
     if (updateData.category)
         {
             post.category = updateData.category; }
              if (updateData.tags) 
                { post.tags = updateData.tags; }

    await post.save();

    return post;
};

const deletePost = async (postId, userId) => {
    const post = await Post.findById(postId);

    if (!post) {
        throw new Error("Post not found");
    }

    if (post.author.toString() !== userId.toString()) {
        throw new Error("Not authorized to delete this post");
    }

    // Delete post
    await Post.findByIdAndDelete(postId);

    return true;
};
const toggleLikePost = async ( postId, userId ) => 
    { const post = await Post.findById(postId);
         if (!post) { throw new Error("Post not found"); 

         }
          const alreadyLiked = post.likes.some( (id) => id.toString() === userId.toString() );
           if (alreadyLiked)
             { 
                post.likes = post.likes.filter( (id) => id.toString() !== userId.toString() );
             }
              else
                 { 
                    post.likes.push(userId);
                 } 
                 await post.save();
                  return   { likesCount: post.likes.length, 
                    liked: !alreadyLiked, }; };
module.exports = {
    createPost,
    getAllPosts,
    getPostBySlug,
    updatePost,
    deletePost,
    toggleLikePost,
};
