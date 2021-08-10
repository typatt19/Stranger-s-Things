import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { callApi } from '../api';

const Register = ({ setToken, action }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isLogin = action === 'login';
    const title = isLogin ? 'Login' : 'Register';
    const oppositeAction = isLogin ? 'register' : 'login';
    const oppositeTitle = isLogin ? 'Register' : 'Login';
    const history = useHistory();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = await callApi({
            url: `users/${action}`,
            body: { user: { username, password } },
            method: 'POST',
        });


        let token

        try { 
           token = data.data.token
           if (token) {
               localStorage.setItem( 'st-token', token );
               setToken(token);
               history.push('/');
               return token
           } 
       } catch (error) {
           window.alert("Wrong Username or Password!")
       }
   
        
    };


    return (
        <>
            <h2>{title}</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="username"
                    required
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                ></input>
                <div id ="TextField">
                <input
                    type="password"
                    placeholder="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                ></input>
                <button type="submit">{title}</button>
                </div>
            </form>
            <button>
                <Link to={`/${oppositeAction}`}>{oppositeTitle}</Link>
            </button>
            <button>
                <Link to="/">Home</Link>
            </button>
            
        </>
    );
};


export default Register;