import mongoose from 'mongoose'
const { Schema, model } = mongoose;

const commentSchema = new Schema({
    username: { type: String, required: false },
    content: { type: String, required: false },
    createdAt: { type: Date, default: Date.now },
})

const postSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    date: { type: Date, default: Date.now },
    comments: [commentSchema],                      
  });

const Post = model('Post', postSchema)

export { Post };
