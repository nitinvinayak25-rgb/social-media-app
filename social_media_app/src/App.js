import { Routes, Route } from "react-router-dom";

import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";
import Home from "./Home";
import About from "./About";
import NewPost from "./NewPost";
import PostPage from "./PostPage";
import Missing from "./Missing";
import EditPost from "./EditPost.js";

import { DataProvider } from "./context/DataContext.js";

  function App() {
  return (
    <DataProvider>
    <div className="App">
      <Header title="MESSENGER SOCIAL MEDIA" />
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post" element={<NewPost />} />
        <Route path="/post/:id" element={<PostPage />} />
        <Route path="/edit/:id" element={<EditPost />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<Missing />} />
      </Routes>

      <Footer />
       </div>
      </DataProvider>
   
  );
}

export default App;