import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { client } from '../api/client';

export default function Home() {
    const githubConfig = {
        gitClientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
        gitRedirUrl: process.env.REACT_APP_GITHUB_CALLBACK_URL,
        gitAuthUrl: 'https://github.com/login/oauth/authorize',
    };
    const { gitAuthUrl, gitClientId, gitRedirUrl } = githubConfig;

    async function createPost() {
        try {
            const res = await client.post('/post', {
                title: '제목',
                content: '내용',
                userId: 8,
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }
    useEffect(() => {
        createPost();
    }, []);

    return (
        <div className="home__container">
            <h2 className="home__header">Login</h2>

            <Link to={`${gitAuthUrl}?client_id=${gitClientId}&redirect_uri=${gitRedirUrl}`}>Github Login</Link>
        </div>
    );
}
