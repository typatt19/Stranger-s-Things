import React from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { callApi } from '../api';
import MessageForm from './MessageForm';




const Post = ({posts, post, token}) => {
    const { postId } = useParams();
    const history = useHistory();

    if (posts.length === 0) return null;

    let postToRender;

    if (post) {
        postToRender = post;
    } else {
        postToRender = posts.find((post) => postId === post._id);
    }

        
        const onDelete = async (event) => {
            event.preventDefault();
    
    
            const data = await callApi({
                url: `/posts/${postToRender._id}`,
                method: 'DELETE',
                token,
            });
        
    
                history.push('/posts');
                window.location.reload()
        }

        console.log("post", postToRender)
         return (
        
        <>
        
            <h2><u>{postToRender.title}</u></h2>
            {postToRender.author.username
            ? 
            <div><b style ={{fontSize:"23px"}}>Submitted by:</b> {postToRender.author.username }</div>
            :
            null
            }
            <div><b style ={{fontSize:"23px"}}>Description:</b> {postToRender.description}</div>
            <div><b style ={{fontSize:"23px"}}>Price:</b> {postToRender.price}</div>
            <div><b style ={{fontSize:"23px"}}>Location:</b> {postToRender.location}</div>
            <div><b style ={{fontSize:"23px"}}>Delivers:</b> {postToRender.willDeliver ? 'Yes' : 'No'}</div>
            {!post ? <Link to="/posts">Back to all posts</Link> : null}
            {postToRender.isAuthor 
            ? 
            <>
            {postToRender.messages.map ((message) => {
                return (
                <div>
                    <div><b style ={{fontSize:"23px"}}>Sender:</b> {message.fromUser.username} </div>
                    <div><b style ={{fontSize:"23px"}}>Message:</b> {message.content}</div>
                </div>
                )
            
            }

            )
            } 
            <button>
            <Link to={"/EditPost/" + postToRender._id}>Edit Post</Link>
            </button>
            <button onClick={onDelete}>Delete Post</button> 
            </>
            : 
            <>
            <MessageForm postID = {postToRender._id} token = {token}/>
            </>
} 
  </>       
    );
};


export default Post;