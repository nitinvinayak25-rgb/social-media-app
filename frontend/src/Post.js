import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <article className="Post">
      <Link to={`/post/${post.id}`}>
        <h2>{post.title}</h2>
        <p className="PostDate">
          {new Date(post.time).toLocaleString()}
        </p>
      </Link>

      <p className="PostBody">
        {post.body.length <= 25
          ? post.body
          : `${post.body.slice(0, 25)}...`}
      </p>
    </article>
  );
};

export default Post;
