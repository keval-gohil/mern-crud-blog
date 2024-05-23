// src/BlogList.jsx
import React from 'react';

function BlogList({ blogs, onDelete, onUpdate }) {
  return (
    <div style={{display: "flex", gap: "2rem", flexWrap: "wrap"}}>
      {blogs.length > 0 ? (
        blogs.map((blog) => (
          <div key={blog._id} className="blog-item">
            <h2>{blog.name}</h2>
            <img src={blog.photo} alt={blog.name} style={{ width: '100px', height: '100px' }} />
            <p>{blog.description}</p>
            <button onClick={() => onDelete(blog._id)}>Delete</button>
            <button onClick={() => onUpdate(blog._id)}>Update</button>
          </div>
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
}

export default BlogList;
