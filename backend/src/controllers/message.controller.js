import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.js";

export const getUsersForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-email -password -createdAt -updatedAt");

        res.status(200).json(filteredUsers);
    } catch (error) {
        console.log("Error in getUsersForSidebar controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const getMessages = async (req, res) => {
    try {
        const { id: otherId } = req.params;
        const myId = req.user._id;

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: otherId },
                { senderId: otherId, receiverId: myId }
            ]
        });

        res.status(200).json(messages);
    } catch (error) {
        console.log("Error in getMessages controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

export const sendMessages = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user._id;

        let imageUrl;
        if (image) {
            // upload image to cloudinary
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageUrl = uploadResponse.secure_url;
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imageUrl
        });

        await newMessage.save();

        // real time functionality (socket.io)
        const receiverSocketId = getReceiverSocketId(receiverId);

        // console.log("sendMessgaes -----" + receiverId + "_____________" + receiverSocketId);

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage)
        }
        // console.log(`Emitting to: ${receiverSocketId}`, newMessage);

        res.status(201).json(newMessage);
    } catch (error) {
        console.log("Error in sendMessages controller: ", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

// export const getUserById = async (req, res) => {
//     try {
//         const { userId } = req.params;
//         const user = await User.findById(userId).select("-email -password -createdAt -updatedAt");
//         if (!user) return res.status(404).json({ message: "User not found" });
//         res.status(200).json(user);
//     } catch (error) {
//         console.log("Error in getNewUser controller:", error.message);
//         res.status(500).json({ message: "Internal Server Error" });
//     }
// }