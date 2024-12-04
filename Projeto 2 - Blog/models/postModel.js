import mongoose from 'mongoose'
const { Schema, model } = mongoose;
// import { uri } from '../utils/consts.js'

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



// mongoose.connect(uri)
//     .then(() => console.log('Connected to MongoDB'))
//     .catch(err => console.error('Failed to connect to MongoDB', err))
//     .finally(() => mongoose.connection.close());
  