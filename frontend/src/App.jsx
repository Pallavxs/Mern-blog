import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [postData, setPostData] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [editPost, setEditPost] = useState(null)

  function fetchPost() {
    axios.get("http://localhost:3000/api/notes")
      .then((res) => {
        setPostData(res.data.post)
      })
  }

  useEffect(()=>{
    fetchPost()
  },[])

  function formHandle(){
    if(editPost){
      axios.patch(`http://localhost:3000/api/notes/${editPost}`,{
      title,
      description
    })
    .then(()=>{
      fetchPost()
      setEditPost(null)
      setTitle('')
      setDescription('')
    })
    } else {
      axios.post('http://localhost:3000/api/notes',{title,description})
      .then((res)=>{
        fetchPost()
        setTitle('')
        setDescription('')
      })
    }
  }

  function deleteHandler(_id){
    axios.delete(`http://localhost:3000/api/notes/${_id}`)
    .then((res)=>{
      console.log(res)
      fetchPost()
    })
  }

  function editHandler(post){
    setEditPost(post._id)
    setTitle(post.title)
    setDescription(post.description)
  }
  
  return (
    <>
    <form className="create-form" onSubmit={(e)=>{
      e.preventDefault()
      formHandle()

    }}>

      <input type="text" value={title} className='placeholder' required placeholder='Enter title' onChange={(e)=>{setTitle(e.target.value)}} />
      <input type="text" value={description} className='placeholder' required placeholder='Enter description' onChange={(e)=>setDescription(e.target.value)} />
      <button className='btn'>{editPost ? "Update Post" : "Create Post"}</button>
    </form>

    <div className="notes">
      {postData.map((post)=> (
          <div className='note' key={post._id}>
            <h1>{post.title}</h1>
            <h1>{post.description}</h1>
            <button className='btn' onClick={()=>deleteHandler(post._id)}>Delete</button>
            <button className='btn' onClick={()=>editHandler(post)}>Edit</button>
          </div>
      ))}
    </div>
    </>

  )
}

export default App