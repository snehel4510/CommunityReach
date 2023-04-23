import User from "../models/User.js";
import Comm from "../models/Comm.js";
import Post from "../models/Post.js";

/* READ */
export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

export const getUserComms = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const comms = await Promise.all(
      user.communities.map((id) => Comm.findById(id))
    );
    const formattedComms = comms.map(
      ({ _id, name, createdBy, coverPic, about }) => {
        return { _id, name, createdBy, coverPic, about };
      }
    );
    res.status(200).json(formattedComms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


// get all the user's bookmarked posts
export const getUserBooks = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    const Books = await Promise.all(
      user.bookmarks.map((id) => Post.findById(id))
    );
    const formattedBooks = Books.map(
      ({  _id,username,commName,description,picturePath,likes,bookmarks,comments }) => {
        return {  _id,username,commName,description,picturePath,likes,bookmarks,comments };
      }
    );
    res.status(200).json(formattedBooks);

  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};


/* UPDATE */
export const addRemoveComms = async (req, res) => {
  try {
    const { uid, commId } = req.params;
    const user = await User.findById(uid);
    const comm = await Comm.findById(commId);
    if (user.communities.includes(commId)) {  // remove
      user.communities = user.friends.filter((id) => id !== commId);
      comm.members = comm.members.filter((id) => id !== uid);
    } else {  //add
      user.communities.push(commId);
      comm.members.push(uid);
    }
    await user.save();
    await comm.save();

    const comms = await Promise.all(
      user.communities.map((id) => Comm.findById(id))
    );
    const formattedComms = comms.map(
      ({ _id, name, createdBy, coverPic, about }) => {
        return { _id, name, createdBy, coverPic, about };
      }
    );

    res.status(200).json(formattedComms);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// edit user profile, user can edit their own profile only
// export const editUser = async (req, res) => {
//   try{
//     const { uid } = req.params;
//     const { name, email, password, about, profilePic, location } = req.body;

//   }
//   catch(err){
//     res.status(404).json({ message: err.message });
//   }
// }