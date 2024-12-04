import { postType } from './types/postType';

const Blog = ({ posts }: { posts: postType[] }) => {
  return (
    <div className="container">
      <h1>My Blog</h1>
      <a id="newPostBtn" href="/new">
        New Post
      </a>
      <ul id="postsList">
        {posts?.map((post) => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <small>{post.date}</small>
            <p>{post.content}</p>
            <small>By: {post.author}</small>
            <a className="edit" href={`/edit/${post.id}`}>
              Edit
            </a>
            <a className="delete" href={`/api/posts/delete/${post.id}`}>
              Delete
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Blog;
