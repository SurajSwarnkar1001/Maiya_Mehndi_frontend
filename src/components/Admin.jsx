import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import API_URL from '../config/api.js';
import './Admin.css';

const Admin = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();

        const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
        const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

        if (email === adminEmail && password === adminPassword) {
            setIsAuthenticated(true);
        } else {
            alert('Invalid credentials');
        }
    };

    const [images, setImages] = useState([]);
    const [imageTitle, setImageTitle] = useState('');

    const fetchImages = async () => {
        try {
            const response = await fetch(`${API_URL}/api/images`);
            const data = await response.json();
            setImages(data);
        } catch (error) {
            console.error('Error fetching images:', error);
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            fetchImages();
        }
    }, [isAuthenticated]);

    const handleUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!imageTitle.trim()) {
            alert('Please enter a title for the image');
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('title', imageTitle);
        formData.append('category', 'General');

        setUploading(true);
        setMessage('');

        try {
            const response = await fetch(`${API_URL}/api/images`, {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                setMessage('Image uploaded successfully!');
                setImageTitle(''); // Clear title field
                e.target.value = ''; // Clear file input
                fetchImages(); // Refresh list
            } else {
                setMessage('Upload failed.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Error uploading image.');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this image?')) return;

        try {
            const response = await fetch(`${API_URL}/api/images?id=${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setImages(images.filter(img => img._id !== id));
            } else {
                alert('Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting image:', error);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="admin-login">
                <motion.form
                    className="login-form"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    onSubmit={handleLogin}
                >
                    <h2>Admin Login</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </motion.form>
            </div>
        );
    }

    return (
        <div className="admin-dashboard">
            <div className="container">
                <h1>Admin Dashboard</h1>
                <p>Welcome back! Manage your Mehndi designs here.</p>

                <div className="upload-section">
                    <h2>Upload New Design</h2>
                    <div className="form-group">
                        <label htmlFor="imageTitle">Design Title *</label>
                        <input
                            id="imageTitle"
                            type="text"
                            placeholder="e.g., Bridal Mehndi, Party Design, Festival Special"
                            value={imageTitle}
                            onChange={(e) => setImageTitle(e.target.value)}
                            className="title-input"
                        />
                    </div>
                    <div className="upload-box">
                        <p>Click to Upload Image</p>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            disabled={uploading}
                        />
                    </div>
                    {uploading && <p>Uploading...</p>}
                    {message && <p className="message">{message}</p>}
                </div>

                <div className="manage-section">
                    <div className="section-header">
                        <h2>Images</h2>
                        <span className="count-badge">{images.length} items</span>
                    </div>
                    <div className="admin-grid">
                        {images.map((img) => (
                            <div className="admin-card" key={img._id}>
                                <div className="card-image-wrapper">
                                    <img src={img.base64Data || img.imageUrl} alt={img.title} />
                                </div>
                                <div className="card-content">
                                    <h3>{img.title || 'Untitled'}</h3>
                                    <span className="category-tag">{img.category || 'General'}</span>
                                    <button onClick={() => handleDelete(img._id)} className="delete-btn">
                                        Delete Design
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;
