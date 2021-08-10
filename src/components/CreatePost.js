import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';


const CreatePost = ({token}) => {
    const history = useHistory();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [location, setLocation] = useState('On Request');
    const [willDeliver, setWillDeliver] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const data = await callApi({
            url: `/posts`,
            method: 'POST',
            body:{
                post: {
                  title: title,
                  description: description,
                  price: price,
                  location: location,
                  willDeliver: willDeliver,
                }
            }, 
              token
        });
    

            history.push('/posts');
            window.location.reload()
        console.log(data)
    };

    
    return (
        <>
            <h2>Create New Post</h2>
            <form onSubmit={handleSubmit}>
                <div id ="TextField">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Price"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                ></input>
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                ></input>
                <input
                    type="checkbox"
                    value={willDeliver}
                    onChange={(event) => setWillDeliver(event.target.value)}
                ></input>
                </div>
                <button type="submit">Post!</button>
            </form>
            <button>
                <Link to="/">Home</Link>
            </button>
        </>
    );
};


export default CreatePost;