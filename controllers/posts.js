import Post from "../models/Post.js";
import Posts from "../models/Post.js";
import User from "../models/User.js";

// CREATE

export const createPost = async (req, res, next) => {
  try {
    const [userId, description, picturePath] = req.body;
    const user = User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.userPicturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await post.find();
    res.status(201).json(post);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

// READ

export const getFeedPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userPosts = await Post.findById({ userId });
    res.status(200).json(userPosts);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// UPDATE

export const likePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};
