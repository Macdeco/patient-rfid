import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";



export const getPosts = async (req, res) =>{
    try {
        const postMessages = await  PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({message : error.messager});
        
    }
}

export const createPost = async (req, res) =>{
    const post = req.body ;
    const newPost = new PostMessage({ ...post, medecinTraitant: req.userId, createdAt: new Date().toISOString() })
    try {
       await newPost.save();
       res.status(200).json(newPost);
    } catch (error) {
        res.status(409).json({message : error.message});
        
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const {  nom, prenom, dateDeNaissance, profession, adresse, medecinTraitant, telephone, email} = req.body;
    
    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

    const updatedPost = { nom, prenom, dateDeNaissance, profession, adresse, medecinTraitant, telephone, email, _id: id };

    await PostMessage.findByIdAndUpdate(id, updatedPost, { new: true });

    res.json(updatedPost);
}

export const deletePost = async (req, res) =>{
    const {id} = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post with id');
    
    await PostMessage.findByIdAndRemove(id);


    res.json({message : ' Post deleted succesfully'});

}