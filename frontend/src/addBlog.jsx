
import React, { useState, useEffect } from 'react';
import BlogList from './blogList';
import axios from 'axios';

function AddBlog() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [currentEditIndex, setCurrentEditIndex] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    photo: '',
    description: '',
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    const response = await axios.get('http://localhost:5000/blogs');
    setBlogs(response.data);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    setFormData({ name: '', photo: '', description: '' });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEdit) {
      await axios.put(`http://localhost:5000/blogs/${currentEditIndex}`, formData);
    } else {
      await axios.post('http://localhost:5000/blogs', formData);
    }
    fetchBlogs();
    setFormData({ name: '', photo: '', description: '' });
    handleCloseModal();
  };

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/blogs/${id}`);
    fetchBlogs();
  };

  const handleUpdate = (id) => {
    const blog = blogs.find(blog => blog._id === id);
    setFormData(blog);
    setIsEdit(true);
    setCurrentEditIndex(id);
    handleOpenModal();
  };

  return (
    <div className="App">
      <button onClick={handleOpenModal}>Add Blog</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>&times;</span>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Name:</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </div>
              <div>
                <label>Photo:</label>
                <input type="file" name="photo" onChange={handleFileChange} required />
              </div>
              <div>
                <label>Description:</label>
                <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>
              </div>
              <button type="submit">{isEdit ? 'Update' : 'Submit'}</button>
            </form>
          </div>
        </div>
      )}

      <BlogList blogs={blogs} onDelete={handleDelete} onUpdate={handleUpdate} />
    </div>
  );
}

export default AddBlog;
