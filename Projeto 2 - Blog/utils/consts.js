export const uri = "mongodb+srv://root:root@cluster0.z2xg2.mongodb.net/Blogposts?retryWrites=true&w=majority&appName=Cluster0";
export const port = 3000;
export const newPostQuestions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your blog post?',
    },
    {
        type: 'editor',
        name: 'content',
        message: 'Write your blog post content:',
    },
    {
        type: 'confirm',
        name: 'publish',
        message: 'Do you want to publish this post?',
        default: false,
    },
];