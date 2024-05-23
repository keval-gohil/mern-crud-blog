// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Atlas connection
const uri = 'mongodb+srv://iwd256853:iwd256853@crud-blog.9ckk2we.mongodb.net/addCrud?retryWrites=true&w=majority&appName=crud-blog';
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Blog Schema
const blogSchema = new mongoose.Schema({
  name: String,
  description: String,
});

const Blog = mongoose.model('Blog', blogSchema);

// Routes
app.get('/blogs', async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

app.post('/blogs', async (req, res) => {
  const newBlog = new Blog(req.body);
  await newBlog.save();
  res.json(newBlog);
});

app.delete('/blogs/:id', async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Blog deleted' });
});

app.put('/blogs/:id', async (req, res) => {
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedBlog);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
