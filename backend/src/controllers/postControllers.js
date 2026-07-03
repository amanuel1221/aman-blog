
const postService = require("../services/postServices");


const createPost = async (req, res) => {
  try {
    const post = await postService.createPost(
      req.body,
      req.user._id,
      req.file
    );

    res.status(201).json({
      success: true,
      message: "Post created successfully",
      post,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};


const getAllPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || "";

    const result = await postService.getAllPosts(search, page, limit);
    
    const posts = result.posts || result; 
    const hasPosts = Array.isArray(posts) ? posts.length > 0 : false;
    
    if (!hasPosts) {
      return res.status(200).json({
        success: true,
        message: "No posts found",
        posts: [],
        total: 0,
        page,
        totalPages: 0,
      });
    }

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getPostBySlug = async (req, res) => {
  try {
    const post = await postService.getPostBySlug(
      req.params.slug
    );

    res.status(200).json({
      success: true,
      post,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message,
    });
  }
};


const incrementPostView = async (req, res) => {
     try { const views = await postService.incrementPostView( req.params.id ); 
        res.status(200).json({ success: true, views, }); 
    }
     catch (error) { 
        res.status(404).json({ success: false, message: error.message, });
     } };

const updatePost = async (req, res) => {
  try {
    const post = await postService.updatePost(
      req.params.id,
      req.user._id,
      req.body,
      req.file
    );

    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      post,
    });
  } catch (error) {
    if (
      error.message === "Not authorized to update this post"
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Post not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const deletePost = async (req, res) => {
  try {
    await postService.deletePost(
      req.params.id,
      req.user._id
    );

    res.status(200).json({
      success: true,
      message: "Post deleted successfully",
    });
  } catch (error) {
    if (
      error.message === "Not authorized to delete this post"
    ) {
      return res.status(403).json({
        success: false,
        message: error.message,
      });
    }

    if (error.message === "Post not found") {
      return res.status(404).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const toggleLikePost = async (req, res) => {
     try { const result = await postService.toggleLikePost( req.params.id, req.user._id ); 
        res.status(200).json({
             success: true, 
             message: result.liked ? "Post liked" : "Post unliked", ...result, });
             } 
             catch (error) { 
                res.status(400).json({ success: false, message: error.message, });
             } };

module.exports = {
  createPost,
  getAllPosts,
  getPostBySlug,
incrementPostView,
  updatePost,
  deletePost,
   toggleLikePost,

};