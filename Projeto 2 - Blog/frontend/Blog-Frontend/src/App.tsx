import { useEffect, useState } from 'react'
import './App.css'
import Blog from '.'
import axios from 'axios';
import { postType } from './types/postType';

function App() {
  const [posts, setPosts] = useState<postType[]>([]);

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

  function openUpdatePost(id) {
    
  }

  useEffect(() => {
    fetchPosts()
  });

  return (
    <>
    <h1>Felipe</h1>
    <div className="container">
      <h1>My Blog</h1>
      <div id="postsList">
        {posts?.map((post) => (
          <div>
            <h2>{post.title}</h2>
            <small>{new Date(post.date).toLocaleDateString()}</small>
            <button className='updateButton' onClick={openUpdatePost(post.id)}>Update</button>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
            <div className="comments-section">
              <h3>Comments:</h3>
              <div>
                {post.comments?.length > 0 ? (
                  post.comments.map((comment) => (
                    <p>
                      <strong>{comment.username}:</strong> {comment.content}{' '}
                    </p>
                  ))
                ) : (
                  <div>No comments yet.</div>
                )}
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
