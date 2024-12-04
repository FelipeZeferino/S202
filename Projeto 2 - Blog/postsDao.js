import { Post } from "./models/postModel.js";

export class postsDAO {
    async createPost(newPost) {
        try {
            const post = new Post(newPost);
            await post.save();
            console.log('Post criado com sucesso: ', post);
            return post;
        } catch (error) {
          console.error(error)
        }
      }

      async addCommentToPost(id, comment) {
        try {
            const post = await Post.findById(id);
    
            if (!post) {
                console.log(`Post with ID ${id} not found.`);
                return null;
            }
    
            post.comments.push(comment);
    
            const updatedPost = await post.save();
    
            console.log("Comment added:", updatedPost);
            return updatedPost;
        } catch (error) {
            console.error("Error adding comment:", error);
        }
    }
    
    

      async readAllPosts() {
        try {
          const posts = await Post.find({});
      
          return posts;
        } catch (error) {
          console.error("Error reading all posts:", error);
          throw error;
        }
      }

    async readPostByTitle(title) {
      try {
        const post = await Post.find({ title: title });
        if (post) {
        console.log(`Post com o título ${title}: `, post);
        } else {
        console.log(`Nenhum post encontrado com o título ${title}`);
        }
        return post;
      } catch (error) {
        console.error("Error reading post by title:", error);
        throw error;
      }
    }

    async readAuthorPosts(authorName) {
      try {
        const posts = await Post.find({ author: authorName });
        console.log(`Posts do autor ${authorName}: `, posts);
        return posts[0]._id
      } catch (error) {
        console.error(error);
      }
    }

    async updatePostById(post_id, newBody) {
        try {
            const updatedPost = await Post.findByIdAndUpdate(post_id, { $set: newBody }, { new: true });
            return updatedPost;
        } catch (error) {
            console.error(error)
        }
    }


    async deletePostById(post_id) {
      try {
        const result = await Post.findByIdAndDelete(post_id);
        return result;
      } catch (error) {
        console.error(error);
      }
    }

    async deleteAllPostsFromAuthor(authorName) {
        try {
            const result = await Post.deleteMany({ author: authorName });

            return result.deletedCount;
        } catch (error) {
            console.error(error);
        }
    }
}


