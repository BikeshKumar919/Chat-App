import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
export const sendMessage = async (req, res) => {
    try {
        const {message}=req.body;
        const senderId=req.user._id;
        const receiverId=req.params.id;
        let conversation=await Conversation.findOne({participants:{$all :[senderId,receiverId]}});
        if(!conversation){
            conversation=await Conversation.create({participants:[senderId,receiverId]});
        }
        const newMessage=await Message({senderId,receiverId,message});
        if(newMessage)
        {
            conversation.message.push(newMessage._id);
            //await conversation.save();
            //await newMessage.save();
            await Promise.all([conversation.save(),newMessage.save()]);//save both conversation and message parallely
            res.status(200).json(newMessage);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMessage = async (req, res) => {
    const {id:receiverId}=req.params;
    const senderId=req.user._id;
    try {
        const conversation=await Conversation.findOne({participants:{$all :[senderId,receiverId]}}).populate("message");
        if(!conversation){
            return res.status(200).json([]);
        }
        res.status(200).json(conversation.message);
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }
}