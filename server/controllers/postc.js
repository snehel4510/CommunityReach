import Post from "../models/Post.js";
import User from "../models/User.js";
import Comm from "../models/Comm.js";

/* CREATE */
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath, commName } = req.body;
    const user = await User.findById(userId);
    const comm = await Comm.findOne({ name: commName });
    if (!comm) {
      return res.status(404).json({ message: "Community not found" });
    }
    const cid = comm._id;
    if (!user.communities.includes(cid)) {
        user.communities.push(cid);
        comm.members.push(userId);
    }
    const newPost = new Post({
      userId,
      username: user.name,
      commId : comm._id,
      commName,
      description,
      picturePath,
      likes: {},
      bookmarks: {},
      comments: [],
    });
    await newPost.save();
    const pid = newPost._id;
    comm.posts.push(pid);
    await user.save();
    await comm.save();
    const posts = await Post.find();
    res.status(201).json(posts);
  } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

/* READ */
export const getFeedPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts); 
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getCommPosts = async (req, res) => {
  try {
    const { commId } = req.params;
    const posts = await Post.find({ commId });
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

/* UPDATE */
export const bookPost = async (req, res) => {
  try {
    const { pid } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(pid);
    const user = await User.findById(userId);
    const isBooked = post.bookmarks.get(userId);

    if (isBooked) {
      post.bookmarks.delete(userId);
      user.bookmarks = user.bookmarks.filter((id) => id !== pid);
    } else {
      post.bookmarks.set(userId, true);
      user.bookmarks.push(pid);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      pid,
      { bookmarks: post.bookmarks },
      { new: true }
    );
    await user.save();
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const { pid } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(pid);
    const isLiked = post.likes.get(userId);
    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }
    const updatedPost = await Post.findByIdAndUpdate(
      pid,
      { likes: post.likes },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// edit a post, only the auothor can edit
export const editPost = async (req, res) => {
  try {
    const { pid } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(pid);
    if (post.userId !== userId) {
      return res.status(403).json({ message: "not authorized" });
    }
    const updatedPost = await Post.findByIdAndUpdate({_id:pid}, {...req.body}, {new: true})
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};