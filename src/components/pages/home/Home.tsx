import React, { useEffect, useState } from 'react';
import getPostAPI from '../../../api/post/get/post.api';

import PostCard from './PostCard';

interface postDataProps {
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    user: any;
    username: string;
}
export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const resp = await getPostAPI();
            setPosts(resp.data.data);
        };
        fetchPosts();
    }, []);

    if (!posts) {
        return null;
    }

    return (
        <div className="content-container">
            {posts.map((post: any, idx: number) => {
                if (idx % 3) {
                    return (
                        <PostCard key={idx}>
                            <div className="postcard-body w-full h-full flex flex-col p-3">
                                <PostCard.Title>{post.title}</PostCard.Title>
                                <PostCard.Content>{post.content}</PostCard.Content>
                                <PostCard.SubInfo>{post.createdAt}</PostCard.SubInfo>
                                <PostCard.Footer>{post.user.nickname}</PostCard.Footer>
                            </div>
                        </PostCard>
                    );
                }
                return (
                    <PostCard key={idx}>
                        <PostCard.Image src="https://source.unsplash.com/random?wallpapers" />

                        <div className="postcard-body w-full h-full  p-3">
                            <PostCard.Title>{post.title}</PostCard.Title>
                            <PostCard.Content>{post.content}</PostCard.Content>
                            <PostCard.SubInfo>{post.createdAt}</PostCard.SubInfo>
                            <PostCard.Footer>{post.user.nickname}</PostCard.Footer>
                        </div>
                    </PostCard>
                );
            })}
        </div>
    );
}