import inquirer from 'inquirer';
import { newPostQuestions } from './utils/consts.js';

function newPost() {
    inquirer.prompt(newPostQuestions)
        .then((newPost) => {
            newPost.title = newPost.title.trim();
            newPost.comments = [];
            newPost.author = '';
            newPost.date = new Date().toISOString();

            if (!newPost.content.trim()) {
                console.log('Error: Content cannot be empty.');
                return;
            }

            console.log('Blog Post Details:');
            console.log(`Title: ${newPost.title}`);
            console.log(`Content: ${newPost.content}`);
            console.log(`Publish: ${newPost.publish}`);
            
            return newPost;
        })
        .then(post => {
            if (post) {
                console.log('Processar post para o blog -> mongoose.connect etc', post);
            }
        })
        .catch((err) => {
            console.error('An error occurred:', err);
        });
}

newPost();



