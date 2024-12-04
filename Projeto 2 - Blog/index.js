import { postsDAO } from './postsDao.js';
import bodyParser from 'body-parser';
import express from 'express';
import { port, uri } from './utils/consts.js';
import mongoose from 'mongoose';
import cors from 'cors'

const app = express();

const postsDao = new postsDAO("Blogposts", "Posts");


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

async function startServer() {
    try {
        await mongoose.connect(uri);
        console.log('Connected to MongoDB');
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`);
        });

    } catch (error) {
        mongoose.connection.close();
        console.error('Error connecting to MongoDB:', error);
    }
}

app.get('/', async (req, res) => {
    try{
        let posts = await postsDao.readAllPosts();
        console.log(posts);
        res.send(JSON.stringify(posts));
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar posts', error });
        console.error(error);
    }
})

app.get('/post/:id', async (req, res) => {
    try {
        const postId = req.params.id;
        if (!postId) {
            return res.status(404).send('Post not found');
        }
        let posts = await postsDao.readPostById(postId);

        res.status(200).send(JSON.stringify(posts));
    } catch (error) {
        res.status(500).send({ message: 'Erro ao buscar posts', error });
        console.error(error);
    }
})

app.patch('/posts/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const { comment } = req.body;

        const updatedPost = await postsDao.addCommentToPost(id, comment);

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding comment', error });
    }
});


app.patch('/posts/:id/post', async (req, res) => {
    try {
        const { id } = req.params;
        const content = req.body;

        const updatedPost = await postsDao.updatePostById(id, content);

        console.log(updatedPost)

        if (!updatedPost) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Atualizado com sucesso!', post: updatedPost });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Error adding comment', error });
    }
});

app.post('/newPost', async (req, res) => {
    try{
        if (!req.body || !req.body.content) {
            return res.status(400).send('Post data is required');
          }
          const newPost = {
            title: req.body.title || 'untitled post',
            content: req.body.content,
            author: req.body.author || 'Unauthored post',
            date: Date.now(),
            comments: []
          }
          const finalPost = await postsDao.createPost(newPost);
          return res.status(200).json({ message: 'post criado com sucesso', post: finalPost });
    } catch(error) {
        console.error(error);
        res.status(500).send({ message: 'Erro ao criar novo post', error });
    }
})

app.delete('/post/:id', async (req, res) => {
    const { id } = req.params;
    try{
        let status = await postsDao.deletePostById(id);
        if(status)
            res.status(200).send({ message: 'post deletado com sucesso!', status });
        else throw new Error('Post não encontrado');
    } catch(error) {
        res.status(500).send({ message: `${error}` });
    }
})

startServer();


// teste
// .createPost()
// .catch(console.error);

// const postAuthor = 'João'
// const post_id = '6744a6cf35235dcfb4b357b8'
// const updatedPostBody = { content: 'teste123' }

// console.log('create post');
// teste
// .createPost()
// .then(() => console.log('Read all posts'))
// .then(() => teste.readAllPosts())
// .then(() => console.log('Read por autor'))
// .then(() => teste.readAuthorPosts(postAuthor))
// .then(() => teste.readPostByTitle('Primeiro Post'))
// .then((id) => teste.updatePostById(id, updatedPostBody))
// .then(() => console.log('Update Post by id'))
// .then(() => teste.updatePostById(post_id ,updatedPostBody))
// .then(() => console.log('delete posts from author'))
// .then(() => teste.deleteAllPostsFromAuthor(postAuthor))