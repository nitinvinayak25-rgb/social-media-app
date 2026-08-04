import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import EditPost from "./EditPost";
import Missing from "./Missing";
import Login from "./login";


import DataContext,{DataProvider} from "./context/DataContext";

function AppContent() {
    const { username } = useContext(DataContext);
    console.log("username:", username);

    return (
        <>
            <Header title="MESSENGER SOCIAL MEDIA" />

            {username && <Nav />}

            <Routes>
                {!username ? (
                    <Route path="*" element={<Login />} />
                ) : (
                    <>
                        <Route path="/" element={<Home />} />
                        <Route path="/post" element={<NewPost />} />
                        <Route path="/post/:id" element={<PostPage />} />
                        <Route path="/edit/:id" element={<EditPost />} />
                        <Route path="/about" element={<About />} />
                        <Route path="*" element={<Missing />} />
                    </>
                )}
            </Routes>

            {username && <Footer />}
        </>
    );
}

function App() {
    return (
            <div className="App">
                <AppContent />
            </div>
        
    );
}

export default App;