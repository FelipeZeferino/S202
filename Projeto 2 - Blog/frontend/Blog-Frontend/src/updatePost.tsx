import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios';

type Post = {
    title: string;
    content: string;
    author: string;
    date: string;
    _id: string;
  };

export default function UpdatePost() {
  const [post, setPost] = useState<Post | null>(null);
  const { id } = useParams();
  async function getPostById(id: string | undefined) {
    if (!id) return; // Prevent calling the API if id is undefined
    try {
      const apiResponse = await axios.get(`http://localhost:3000/post/${id}`);
      setPost(apiResponse.data); // Update state with fetched post data
    } catch (error) {
      console.error('Error fetching post:', error);
      // Handle error (e.g., set error state)
    }
  }

  useEffect(() => {
    getPostById(id); // Fetch the post on component mount
  }, [id]);

  if (!post) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }

  const handleUpdatePost = async () => {
    const content = (document.getElementById('postContent') as HTMLTextAreaElement).value;
    try {
      await axios.patch(`http://localhost:3000/posts/${id}/post`, { content });
      alert('Post updated successfully');
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <div>
      <h1>Update Post</h1>
      <h2>{post.title}</h2>
      <p><strong>Author:</strong> {post.author}</p>
      <p><strong>Date:</strong> {new Date(post.date).toLocaleDateString()}</p>
      <textarea id="postContent" defaultValue={post.content}></textarea>
      <button onClick={handleUpdatePost}>Atualizar</button>
    </div>
  );
}
