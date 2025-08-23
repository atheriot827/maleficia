import React from "react";

const posts = [
  { title: "First Blog Post", content: "This is my first blog post." },
  { title: "Another Post", content: "More thoughts and updates." }
];

const Blog = () => (
  <div className="p-8">
    <h1 className="text-2xl font-bold mb-4">Blog</h1>
    <ul>
      {posts.map((post, idx) => (
        <li key={idx} className="mb-4">
          <h2 className="text-xl">{post.title}</h2>
          <p>{post.content}</p>
        </li>
      ))}
    </ul>
  </div>
);

export default Blog;