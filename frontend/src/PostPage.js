import React, { useContext } from "react";
import { useParams, Link } from "react-router-dom";
import DataContext from "./context/DataContext";

const PostPage = () => {
  const { id } = useParams();
  const { posts, handleDelete } = useContext(DataContext);

  const post = posts.find((post) => post.id.toString() === id);

  const username = localStorage.getItem("username");

  if (!post) {
    return (
      <main className="PostPage">
        <h2>Post Not Found</h2>
        <p>Well, that's disappointing.</p>
        <Link to="/">Visit Our Homepage</Link>
      </main>
    );
  }

  return (
    <main className="PostPage">
      <article className="post">
        <h2>{post.title}</h2>

        <p className="PostUser">
          <strong>Posted by:</strong> {post.username}
        </p>

        <p className="PostDate">
          {new Date(post.created_at).toLocaleString()}
        </p>

        <p className="PostBody">{post.body}</p>

        {post.username ===username && (
          <div className="PostButtons">
            <Link to={`/edit/${post.id}`}>
              <button className="editButton">Edit</button>
            </Link>

            <button
              className="deleteButton"
              onClick={() => handleDelete(post.id)}
            >
              Delete
            </button>
          </div>
        )}
      </article>
    </main>
  );
};

export default PostPage;