import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Post from './Post';

const styles = {
    searchContainer: {
        display: 'flex',
        justifyContent: 'center',
        padding: '16px',
        alignItems: 'center',
    },
    searchInput: {
        margin: '0 16px',
    },
};

const postMatches = (post, searchTerm) => {
    const searchTermLower = searchTerm.toLowerCase();

    const {
        description,
        location,
        title,
        author: { username },
        price,
    } = post;

    const toMatch = [description, location, title, username, price];
    for (const field of toMatch) {
        if (field.toLowerCase().includes(searchTermLower)) {
            return true;
        }
    }

    return false;
};

const Posts = ({ posts }) => {
    const [searchQuery, updateSearchQuery] = useState('');

    const postsToDisplay =
        searchQuery.length > 0
            ? posts.filter((post) => postMatches(post, searchQuery))
            : posts;

    return (
        <>
        <b style ={{fontSize:"28px"}}><h2>Posts</h2></b>
            <div style={styles.searchContainer}>
                <input
                    type="text"
                    placeholder="Search Post"
                    style={styles.searchInput}
                    value={searchQuery}
                    onChange={(event) => {
                        updateSearchQuery(event.target.value);
                    }}
                />
            </div>

            {postsToDisplay.map((post) => (
                <div key={post._id} style={{ border: '1px solid black' }}>
                    <Post posts={posts} post={post} />
                    <button>
                        <Link to={`/posts/${post._id}`}>View Post</Link>
                    </button>
                </div>
            ))}
        </>
    );
};

export default Posts;