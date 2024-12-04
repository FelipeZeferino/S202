import { useState } from "react";

export function CommentForm({ postId }: { postId: string }, postComment: (postId: string, comment: { username: string, content: string }) => void) {
    const [username, setUsername] = useState("");
    const [content, setContent] = useState("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      postComment(postId, { username, content });
      setUsername("");
      setContent("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
    );
  }
  