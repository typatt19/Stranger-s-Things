import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { callApi } from '../api';


const EditPost = ({token, posts}) => {
    const history = useHistory();
    const {postId} = useParams();
    if (posts.length === 0) return null;

    let postToRender = posts.find((post) => postId === post._id);
    console.log("EditPosts", posts)
    console.log("EditPosts", postId)



    const [title, setTitle] = useState(postToRender.title);
    const [description, setDescription] = useState(postToRender.description);
    const [price, setPrice] = useState(postToRender.price);
    const [location, setLocation] = useState(postToRender.location);
    const [willDeliver, setWillDeliver] = useState(postToRender.willDeliver);

    const handleSubmit = async (event) => {
        event.preventDefault();


        const data = await callApi({
            url: `/posts/${postToRender._id}`,
            method: 'PATCH',
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
            <h2>Edit Post</h2>
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
                <button type="submit">Sumbit Edit</button>
            </form>
            <button>
                <Link to="/">Home</Link>
            </button>
        </>
    );
};

export default EditPost;