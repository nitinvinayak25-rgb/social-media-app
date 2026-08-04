import { createContext,useState, useEffect } from "react";
import api from "../api/Posts";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";
import { useNavigate } from "react-router-dom";



const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const [posts, setPosts] = useState([]);
    const [username, setUsername] = useState(localStorage.getItem("username") || "");
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [postTitle, setPostTitle] = useState("");
    const [postBody, setPostBody] = useState("");
    const [editTitle, setEditTitle] = useState("");
    const [editBody, setEditBody] = useState("");
    const navigate = useNavigate();
    const {width}=useWindowSize();
    const {data,fetchError,isLoading} = useAxiosFetch("https://social-media-app-1-45hb.onrender.com/posts");

    useEffect( () => {
    setPosts(data || []);
    },[data]);

  useEffect(() => {
    if (username) {
        localStorage.setItem("username", username);
    }
}, [username]);

    useEffect(() => {
        const filteredResults = posts.filter(
          (post) =>
            post.body.toLowerCase().includes(search.toLowerCase()) ||
            post.title.toLowerCase().includes(search.toLowerCase())
        );
    
    setSearchResults([...filteredResults].reverse());
    }, [posts, search])

  const handleSubmit = async (e) => {
  e.preventDefault();

  const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

  console.log("Context username:", username);
  console.log("LocalStorage username:", localStorage.getItem("username"));

  const newPost = {
    id,
    title: postTitle,
    body: postBody,
    username,
    created_at: new Date().toISOString(),
  };

  console.log("Context username:", username);
  console.log(newPost);

  try {
    const response = await api.post("/posts", newPost);

    setPosts([...posts, response.data]);

    setPostTitle("");
    setPostBody("");

    navigate("/");
  } catch (err) {
    console.error(err);
  }
};

  const handleEdit = async (id) => {

  const post = posts.find((p) => p.id === id);

    const updatedPost={
      id,
      title:editTitle,
      body:editBody,
      username: post.username,
    };
    try{
      const response = await api.put(`/posts/${id}`,updatedPost)
      setPosts(posts.map(post =>post.id===id ? {...response.data}:post));
      setEditTitle("");
      setEditBody("");

      navigate("/");
    } catch(err){
      console.log(`Error:${err.message}`);
    }
  }

  const handleDelete =async (id) => {
    try{
      await api.delete(`/posts/${id}`)
    
    const postsList = posts.filter((post) => post.id !== id);
    setPosts(postsList);
    navigate("/");
    }catch (err) {
      console.log(`Error: ${err.message}`);
    }
  };

    useEffect(() => {
  console.log("Posts updated:", posts);
  }, [posts]);



    
    return (
        <DataContext.Provider value={{
            width,search,setSearch,
            searchResults,fetchError,isLoading,
            handleSubmit,postTitle,postBody,setPostBody,setPostTitle,
            setSearchResults, posts,handleEdit,setEditTitle,editBody,
            setEditBody,editTitle,handleDelete,username,setUsername,handleSubmit

        }}> 
            {children}
        </DataContext.Provider>    
    );
}

export default DataContext
