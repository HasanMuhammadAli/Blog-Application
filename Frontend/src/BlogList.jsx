import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BlogList.css";

function BlogList() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);  // To manage modal visibility
    const [currentBlog, setCurrentBlog] = useState(null);  // To store the blog being updated
    const [updatedTitle, setUpdatedTitle] = useState("");  // For the updated title
    const [updatedContent, setUpdatedContent] = useState("");  // For the updated content
    const [updatedCategory, setUpdatedCategory] = useState("");  // For the updated category

    // Fetch all blogs
    const fetchBlogs = async () => {
        try {
            const res = await axios.get("http://localhost:3000/blogs");
            setBlogs(res.data);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching blogs:", err);
            setError("Failed to fetch blogs. Please try again.");
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    // Delete a blog
    const deleteBlog = async (id) => {
        try {
            await axios.delete(`http://localhost:3000/blog/delete/${id}`);
            fetchBlogs();  // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting blog: ", error);
        }
    };

    // Handle the Update button click
    const handleUpdateClick = (blog) => {
        setCurrentBlog(blog);
        setUpdatedTitle(blog.title);  // Pre-fill the form fields with the current blog data
        setUpdatedContent(blog.content);
        setUpdatedCategory(blog.category || "");
        setShowModal(true);  // Show the modal
    };

    // Handle the form submission for updating the blog
    const handleUpdateSubmit = async () => {
        try {
            const updatedData = {
                title: updatedTitle,
                content: updatedContent,
                category: updatedCategory,
            };

            // Send the PATCH request to update the blog
            await axios.patch(`http://localhost:3000/blog/update/${currentBlog._id}`, updatedData);
            fetchBlogs();  // Refresh the list after updating
            setShowModal(false);  // Close the modal
        } catch (err) {
            console.error("Error updating blog:", err);
        }
    };

    return (
        <div className="blog-list-container">
            <h1 className="blog-list-title">Blog List</h1>
            {loading ? (
                <p className="loading-message">Loading blogs...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : blogs.length === 0 ? (
                <p className="no-blogs-message">No blogs found.</p>
            ) : (
                <ul className="blog-list">
                    {blogs.map((blog) => (
                        <li key={blog._id} className="blog-item">
                            <div className="blog-header">
                                <h3>{blog.title}</h3>
                                <button
                                    className="delete-button"
                                    onClick={() => deleteBlog(blog._id)}>
                                    Delete
                                </button>
                                <button
                                    className="update-button"
                                    onClick={() => handleUpdateClick(blog)}>
                                    Update
                                </button>
                            </div>
                            <p><strong>Author:</strong> {blog.author}</p>
                            <p>{blog.content}</p>
                            <p><strong>Category:</strong> {blog.category || "Uncategorized"}</p>
                            <p>
                                <small>
                                    <strong>Created At:</strong> {isNaN(new Date(blog.createdAt).getTime())
                                        ? "Date not declared"
                                        : new Date(blog.createdAt).toLocaleDateString()}
                                </small>
                            </p>
                        </li>
                    ))}
                </ul>
            )}

            {/* Modal for updating blog */}
            {showModal && (
                <div className="update-modal">
                    <div className="modal-content">
                        <h2>Update Blog</h2>
                        <form onSubmit={(e) => { e.preventDefault(); handleUpdateSubmit(); }}>
                            <label>
                                Title:
                                <input
                                    type="text"
                                    value={updatedTitle}  // Bind the input to the updatedTitle state
                                    onChange={(e) => setUpdatedTitle(e.target.value)}  // Update the state on change
                                />
                            </label>
                            <label>
                                Content:
                                <textarea
                                    value={updatedContent}  // Bind the textarea to the updatedContent state
                                    onChange={(e) => setUpdatedContent(e.target.value)}  // Update the state on change
                                />
                            </label>
                            <label>
                                Category:
                                <input
                                    type="text"
                                    value={updatedCategory}  // Bind the input to the updatedCategory state
                                    onChange={(e) => setUpdatedCategory(e.target.value)}  // Update the state on change
                                />
                            </label>
                            <div className="modal-actions">
                                <button 
                                    type="submit">
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default BlogList;
