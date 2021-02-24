import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find().sort({_id:-1}).limit(100);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message});
    }
}

export const updatePost = async (req,res) => {
    const { id: id } = req.params;
    const post = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("No such post with this id.");
    const updatedPost = await PostMessage.findByIdAndUpdate(id, post, { new: true });
    res.json(updatedPost);
}

export const deletePost = async (req,res) => {
    const { id: id } = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("NO post exist with this id.");
    await PostMessage.findByIdAndRemove(id);
    res.json({ message: 'Post deleted Successfully !!!'});
}

export const likePost = async (req,res) => {
    const { id: id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("NO post exist with this id.");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(id, { likecount: post.likecount + 1 }, { new: true });
    res.json(updatedPost);
}

export const getSinglePost = async (req, res) => {
    const { id } = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send("NO post exist with this id.");
    try {
        const postMessages = await PostMessage.findById(id);
        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({ message: error.message});
    }
}

