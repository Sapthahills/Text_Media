import './App.css';
import {Routes,Route,useNavigate} from 'react-router-dom';
import Home from './component/Home';
import Nav from './component/Nav';
import Header from './component/Header';
import { useEffect, useState } from 'react';
import NewPost from './component/NewPost';
import { format } from 'date-fns';
import About from './component/About';
import Missing from './component/Missing';
import PostPage from './component/PostPage';
import api from "./api/posts";
import Footer from './component/Footer';

function App() {
  const [posts,setPosts]=useState([]);

  const[search,setSearch]=useState('');
  const[searchResults,setSearchResults]=useState([]);
  const[postTitle,setPostTitle]=useState('');
  const[postBody,setPostBody]=useState('');

  useEffect(()=>{
    const filterdResults=posts.filter(post=>((post.body).toLowerCase()).includes(search.toLowerCase())
    ||((post.title).toLowerCase()).includes(search.toLowerCase()));

    setSearchResults(filterdResults.reverse())
  },[posts,search])


  useEffect(()=>{
    const fetchPosts=async()=>{
      try{
        const response=await api.get('/posts');
        setPosts(response.data);
      }
      catch(err){
        if(err.response){
          console.log(err.response.data)
        }
        else{
          console.log(`Error:${err.message}`)
        }
      }
    }
    fetchPosts();
  },[])

const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      const id=posts.length?posts[posts.length-1].id+1:1;
      const datetime= format(new Date(),'MMMM dd, yyyy pp');
      const newPost={id,title:postTitle,datetime,body:postBody};

      const response=await api.post("/posts",newPost);
      const allPost=[...posts,response.data];
      setPosts(allPost);
      setPostBody('');
      setPostTitle('');
      navigate('/')
    }
    catch(err){
      if(err.response){
        console.log(err.response.data)
      }
      else{
        console.log(`Error:${err.message}`)
      }
    }
  }
  const handleDelete=async(id)=>{
    try{
      await api.delete(`/posts/${id}`)
      const postsList=posts.filter(post=>post.id!==id)
      setPosts(postsList);
      navigate('/');
    }
    catch(err){
      if(err.response){
        console.log(err.response.data)
      }
      else{
        console.log(`Error:${err.message}`)
      }
    }
  }
  return (
    <div className="App">
      <Header title="Text Media"/>
      <Nav
      search={search}
      setSearch={setSearch}/>
      <Routes>
       <Route path='/' element={<Home posts={searchResults}/>} />
         <Route path='/post'> 
         <Route index element={<NewPost
      handleSubmit={handleSubmit}
      postBody={postBody}
      postTitle={postTitle}
      setPostBody={setPostBody}
      setPostTitle={setPostTitle}
      />}/> 
      <Route path=':id'element={<PostPage posts={posts}
       handleDelete={handleDelete}/>}/>
</Route>
       <Route path='/about' element={<About/>}/> 
       <Route path='*' element={ <Missing/>}/> 
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
