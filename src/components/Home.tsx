import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    const githubConfig = {
        gitClientId: process.env.REACT_APP_GITHUB_CLIENT_ID,
        gitRedirUrl: process.env.REACT_APP_GITHUB_CALLBACK_URL,
        gitAuthUrl: 'https://github.com/login/oauth/authorize',
    };
    const { gitAuthUrl, gitClientId, gitRedirUrl } = githubConfig;

    async function createPost() {
        try {
            const res = await axios.post('http://localhost:8080/api/v1/post/create', {
                title: '2번째 제목',
                content: '2번째 내용',
            });
            console.log(res);
        } catch (e) {
            console.error(e);
        }
    }

    return (
        <div className="home__container">
            <h2 className="home__header">Login</h2>

            <Link to={`${gitAuthUrl}?client_id=${gitClientId}&redirect_uri=${gitRedirUrl}`}>Github Login</Link>
        </div>
    );
}
