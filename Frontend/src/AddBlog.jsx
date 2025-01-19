import React, { useState } from "react";
import axios from "axios";
import "./AddBlog.css";


function AddBlog() {
    const [formData, setFormData] = useState({
        title: "",
        author: "",
        content: "",
        category: "",
        createdAt: "",
    });
    const [successMessage, setSuccessMessage] = useState("");

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("http://localhost:3000/blog/new", formData);
            console.log("Blog added:", res.data);
            setSuccessMessage("Blog successfully added!");
            setFormData({ title: "", author: "", content: "", category: "", createdAt: "" });
            
        } catch (err) {
            console.error("Error adding blog:", err);
            setSuccessMessage("Failed to add blog. Please try again.");
        }
    };

    return (
        <div className="add-blog-container">
            <h1 className="add-blog-title">Add a New Blog</h1>
            <form onSubmit={handleFormSubmit} className="add-blog-form">
                <div className="form-group">
                    <label>
                        Title: 
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Author: 
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleInputChange}
                            required
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Content: 
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleInputChange}
                            required
                        ></textarea>
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Category: 
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <div className="form-group">
                    <label>
                        Created At: 
                        <input
                            type="date"
                            name="createdAt"
                            value={formData.createdAt}
                            onChange={handleInputChange}
                        />
                    </label>
                </div>
                <button type="submit" className="submit-button">Add Blog</button>
            </form>
            {successMessage && <p className="success-message">{successMessage}</p>}
        </div>
    );
}

export default AddBlog;
