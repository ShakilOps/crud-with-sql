import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import "./AddEdit.css";

const initialState = {
    name : '',
    email : '',
    contact : '',
}

const AddEdit = () => {
    const [state, setState] = useState(initialState);
    const {name, email, contact} = state;
    const history = useHistory();
    const {id} = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${id}`)
        .then((res) =>  setState({ ...res.data[0]}))
    },[id])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(!name || !email || !contact) {
            toast.error('Please enter all the values')
        } else {
            if(!id){
                axios.post("http://localhost:5000/api/post", {
                    name,
                    email,
                    contact,
                }).then(() => {
                    setState({name: "", email: "", contact: ""});
                }).catch((err) => toast.error(err.response.data));
                toast.success("Contact added successfully")
            }else{
                axios.put(`http://localhost:5000/api/update/${id}`, {
                name,
                email,
                contact,
            }).then(() => {
                setState({name: "", email: "", contact: ""});
            }).catch((err) => toast.error(err.response.data));
            toast.success("Contact updated successfully")
            }
            
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setState({ ...state, [name]: value})
    }

  return (
    <div style={{marginTop: '100px'}}>
        <form style={{
            margin: 'auto',
            padding: '15px',
            maxWidth: '400px',
            alignContent: 'center',
        }} onSubmit={handleSubmit}
        >
            <label htmlFor="name">Name</label>
            <input 
            type="text"
            id="name"
            name="name"
            placeholder='Your Name...'
            value={name || ''}
            onChange={handleInputChange}
             />

            <label htmlFor="email">Email</label>
            <input 
            type="email"
            id="email"
            name="email"
            placeholder='Your email...'
            value={email || ''}
            onChange={handleInputChange}
             />

            <label htmlFor="contact">Contact</label>
            <input 
            type="text"
            id="contact"
            name="contact"
            placeholder='Your contact No...'
            value={contact || ''}
            onChange={handleInputChange}
             />
            <input type="submit" value={ id ? "Update" : "Save"} />
            <Link to="/">
                <input type="button" value='Go Back'/>
            </Link>
        </form>
    </div>
  )
}

export default AddEdit