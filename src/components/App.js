import React, { useEffect, useState } from 'react';
import { Link, Route } from 'react-router-dom';
import { callApi } from '../api';
import { Register } from './';
import Post from './Post';
import Posts from './Posts';
import CreatePost from './CreatePost';
import EditPost from './EditPost';
import MessageForm from './MessageForm';

/*
Routes:
/ - home
/register - register
/login - login
/posts - all posts
    /posts/{id} - single post 
Plan:
- fetch all posts
- set up route for displaying all posts
- write a component to display posts
- set up route for displaying a single post
*/

const fetchUserData = async (token) => {
    const { data } = await callApi({
        url: '/users/me',
        token,
    });

    return data;
};

const fetchPosts = async (token) => {
    const {
        data: { posts },
    } = await callApi({
        url: '/posts',
        token,
    });

    return posts;
};

const App = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState({});
    const [posts, setPosts] = useState([]);

    const isLoggedIn = userData.username !== undefined;

    const onLogOutClick = () => {
        localStorage.removeItem('st-token');
        setToken('');
        setUserData({});
    };

    useEffect(async () => {
        if (posts.length === 0) {
            const fetchedPosts = await fetchPosts(token);
            setPosts(fetchedPosts);
        }
    });

    useEffect(async () => {
        if (!token) {
            setToken(localStorage.getItem('st-token'));
            return;
        }
        const data = await fetchUserData(token);
        setUserData(data);
    }, [token]);
    console.log("userData", userData)
    console.log("isLoggedIn", isLoggedIn)


    return (
        <>
        {!isLoggedIn ?
            <h1>Welcome! <br></br>Please <a href= "/login"> sign in</a> or <a href="/register">create an account</a>.</h1>
            : ""}
            <Route exact path="/">
                {isLoggedIn ? (
                    <>
                        <div id ="Greeting">Hello, {userData.username}</div>
                        <button onClick={onLogOutClick}>Log Out</button>
                        <button>
                    <Link to="/CreatePost">Create A New Post</Link>
                        </button>
                    </>
                ) : (
                    <>
                        <button>
                            <Link to="/register">Register</Link>
                        </button>
                        <button>
                            <Link to="/login">Login</Link>
                        </button>
                    </>
                )}
                <button>
                    <Link to="/posts">View All Posts</Link>
                </button>

                

                {isLoggedIn 
                ?
                    <>
                    <h1>My Messages</h1>
                    {userData.messages.map ((message) => {
                        return (
                        message.fromUser._id === userData._id
                        ?    
                        <div key= {message._id}>
                            <div>Sender: {message.fromUser.username} </div>
                            <div>Message: {message.content}</div>
                        </div>
                        :
                        null
                    )})
                        }   
                        </> 
                : 
                null
                }
                
                
                {isLoggedIn ?
                <>
                <h1>My Posts</h1>
                    {userData.posts.map ((post) => {
                        return (    
                        <Post post = {post}  token = {token} posts={posts}
                         />
                        
                        )
                })
                }   
                </> : null
                }

                {/* {isLoggedIn ?
                <>
                <h1>My Messages</h1>
                    {userData.messages.map ((message) => {
                        message.fromUser._id === userData._id
                        ?    
                            <div key= {message._id}>
                            <div>Sender: {message.fromUser.username} </div>
                            <div>Message: {message.content}</div>
                        </div>
                        :
                        null
                        })
                }   
                </> : null
                } */}


            </Route>
            <Route exact path="/posts">
            <button> <Link to="/">Home</Link></button>
            <button> <Link to="/CreatePost">Create New Post</Link></button>
            {isLoggedIn ? <button onClick={onLogOutClick}>Log Out</button> :null}
            <h1>Below are all recent posts</h1>
                <Posts posts={posts} token={token} />
            </Route>
            <Route path="/posts/:postId">
                <Post posts={posts} />
            </Route>
            <Route path="/register">
                <Register action="register" setToken={setToken} />
            </Route>
            <Route path="/login">
                <Register action="login" setToken={setToken} />
            </Route>
            <Route path="/CreatePost">
                <CreatePost action="post" token={token} />
            </Route>
            <Route path="/EditPost/:postId">
                <EditPost posts={posts} token={token} />
            </Route>
        </>
    );
};


export default App
