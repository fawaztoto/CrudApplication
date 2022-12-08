import React, {useState, useEffect} from 'react'
import {useNavigate, useParams, Link} from "react-router-dom"
import "./AddEdit.css"
import axios from 'axios'
import { toast } from "react-toastify"


const intialState = {
name: "",
email: "",
contact: "",
};

function AddEdit() {
      const [state, setState] = useState(intialState)

      const {name, email, contact} = state;

      const navigate = useNavigate() 

      const {id} = useParams()

      useEffect(()=>{
         axios.get(`http://localhost:5000/api/get/${id}`).then((resp) => setState({...resp.data[0]}))
      },[id])
    
      const handleSubmit = (e) =>{
        e.preventDefault()
        if(!name || !email || !contact){
            toast.error("please provide vlaue into each input field")
        } else{
            if(!id){

                axios.post("http://localhost:5000/api/post",{
                    name,
                    email,
                    contact
                }).then(() => {
                    setState({name: "", email: "", contact: ""})
                }).catch((err) => toast.error(err.response.data))
                toast.success("Contact Added Successfully")
            } else {
                axios.put(`http://localhost:5000/api/update/${id}`,{
                    name,
                    email,
                    contact
                })
                .then(() => {
                    setState({name: "", email: "", contact: ""})
                }).catch((err) => toast.error(err.response.data))
                toast.success("Contact Updated Successfully")
            }
           
            setTimeout(() =>
              navigate("/")
            , 500)
        }
      }

      const handleInputChange = (e) => {
        const {name, value} = e.target
        setState({...state, [name]: value})
      }

  return (
    <div style={{marginTop: "100px"}}>
        <form style ={{
           margin: "auto",
           padding: "15px",
           maxWidth: "400px",
           alignContent: "center"
        }}
        onSubmit={handleSubmit}
        >
           <label htmlFor="name">Name</label>
           <input 
           type="text"
           id="name"
           name="name"
           placeholder='your Name ...'
           value={name || ""}
           onChange={handleInputChange}
           />

          <label htmlFor="email">email</label>
           <input
           type="email"
           id="email"
           name="email"
           placeholder='your email ...'
           value={email || ""}
           onChange={handleInputChange}
           />

         <label htmlFor="contact">contact</label>
           <input 
           type="number"
           id="contact"
           name="contact"
           placeholder='your contact No ...'
           value={contact || ""}
           onChange={handleInputChange}
           />
        

        <input type="submit" value={id ? "Update" : "Save"}></input>
        <Link to="/">
        <input type="button" value="Go Back" />                
        </Link>
        </form>
       
    </div>
  )
}

export default AddEdit