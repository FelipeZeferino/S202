import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios';
import { postType } from './types/postType';
import { Link } from 'react-router-dom';

function App() {
  const [posts, setPosts] = useState<postType[]>([]);
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  async function fetchPosts() {
    try {
      const response = await axios.get('http://localhost:3000');
  
      if (response && response.data && Array.isArray(response.data)) {
        setPosts(response.data);
      } else {
        console.error('Unexpected response format:', response);
        setPosts([]);
      }
    } catch (error: unknown) {
      console.error(error);
      setPosts([]);
    }
  }

  const handleSubmit = (e: React.FormEvent, id:string, commentObject: { username: string; content: string }) => {
    e.preventDefault();
    postComment(id, commentObject);
    setUsername("");
    setContent("");
  };


  async function deletePost(id: string) {
    try {
      const isConfirmed = window.confirm("Are you sure you want to delete this post?");
      if (!isConfirmed) return;
  
      const response = await axios.delete(`http://localhost:3000/post/${id}`);
      
      if (response.status === 200) {
        alert("Post deleted successfully!");
        fetchPosts();
      } else {
        alert(`Failed to delete the post. Status: ${response.status}`);
      }
    } catch (error: unknown) {
      console.error("Error deleting the post:", error);
      alert("An error occurred while trying to delete the post.");
    }
  }
  
async function postComment(postId: string, comment: { username: string; content: string }) {
  try {
    if (!comment.username || !comment.content) {
      alert("Username and comment content are required!");
      return;
    }

    const response = await axios.patch(`http://localhost:3000/posts/${postId}/comments`, comment);

    if (response.status === 201) {
      alert("Comment added successfully!");
      fetchPosts();
    } else {
      alert(`Failed to post comment. Status: ${response.status}`);
    }
  } catch (error: unknown) {
    console.error("Error posting comment:", error);
    alert("An error occurred while trying to post the comment.");
  }
}


  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <>
    <h1>Felipe</h1>
    <div className="container">
      <h1>My Blog</h1>
      <div id="postsList">
        {posts?.map((post) => (
          <div>
            <h2>{post.title}</h2>
            <p>{post._id}</p>
            <small>{new Date(post.date).toLocaleDateString()}</small>
            <Link to={`/updatePost/${post._id}`} className="update-link">Update Post</Link>
            <button className='delete-button' onClick={() => deletePost(post._id)}>Delete</button>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
            <div className="comments-section">
              <h3>Comments:</h3>
              <div>
                {post.comments?.length > 0 ? (
                  post.comments.map((comment) => (
                    <>
                    <p>
                      <strong>{comment?.username}:</strong> {comment?.content}{' '}
                    </p>
                    </>
                  ))
                ) : (
                  <div>
                    No comments yet.
                    <div>
                    </div>
                  </div>
                )}
                    <form onSubmit={(e) => handleSubmit(e, post._id, { username, content })}>
                      <input
                        type="text"
                        placeholder="Your name"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                      />
                      <textarea
                        placeholder="Your comment"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                      />
                      <button type="submit">Post Comment</button>
                    </form>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
