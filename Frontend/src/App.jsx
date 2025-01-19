import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import BlogList from "./BlogList";
import AddBlog from "./AddBlog";
import Navbar from "./Navbar";

function App() {
    return (
        <Router>
            <Navbar />
            <div className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/blogs" element={<BlogList />} />
                    <Route path="/add-blog" element={<AddBlog />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
