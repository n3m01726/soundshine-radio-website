import React, { useEffect, useState } from "react";
import { fetchPosts } from "../api/posts";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Chargement des posts...</div>;
  if (error) return <div style={{ color: "red" }}>Erreur : {error}</div>;
  if (!posts.length) return <div>Aucun post trouvé.</div>;

  return (
    <div>
      <h3>Posts du site</h3>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <b>{post.title}</b> <br />
            <small>{post.content?.slice(0, 80)}...</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostList;
