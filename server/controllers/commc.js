import Post from "../models/Post.js";
import User from "../models/User.js";
import Comm from "../models/Comm.js";

/* CREATE */
export const createComm = async (req, res) => {
    try{
        const { name,userId,coverPic,about } = req.body;
        const user = await User.findById(userId);
        const newComm = new Comm({
            name,
            userId,
            createdBy: user.name,
            coverPic,
            about,
            members: [userId],
            posts: [],
        });
        await newComm.save();
        const cid = newComm._id;
        user.communities.push(cid);
        await user.save();
        const comms = await Comm.find();
        res.status(201).json(comms);
    } catch (err) {
    res.status(409).json({ message: err.message });
  }
};

// get all communities
export const getAllComms = async (req, res) => {
    try {
        const comms = await Comm.find();
        res.status(200).json(comms);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// get a community by id
export const getComm = async (req, res) => {
    try {
        const { id } = req.params;
        const comm = await Comm.findById(id);
        res.status(200).json(comm);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// get all members of a community
export const getCommMembers = async (req, res) => {
    try {
        const { id } = req.params;
        const comm = await Comm.findById(id);
        const members = await User.find({ _id: { $in: comm.members } });
        res.status(200).json(members);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// get all posts of a community
export const getCommPosts = async (req, res) => {
    try {
        const { id } = req.params;
        const comm = await Comm.findById(id);
        const posts = await Post.find({ _id: { $in: comm.posts } });
        res.status(200).json(posts);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

// edit a community, but only if the user is the creator
export const editComm = async (req, res) => {
    try {
        const { cid } = req.params;
        const { userId } = req.body;
        const comm = await Comm.findById(cid);
        if (comm.userId != userId) {
            res.status(403).json({ message: "not authorized" });
        } else {
            const updatedComm = await Comm.findByIdAndUpdate({_id:cid}, {...req.body}, {new: true})
            res.status(200).json(updatedComm);
        }
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};
