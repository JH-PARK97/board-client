import React, { createContext, useEffect, useState } from 'react';
import getPostAPI from '@/api/post/get/post.api';
import { PostListItem } from '@/api/post/get/post.type';
import PostCard from './PostCard';

export const PostListContext = createContext<PostListItem[]>([]);

export default function Home() {
    const [posts, setPosts] = useState<PostListItem[]>();

    useEffect(() => {
        const fetchPosts = async () => {
            const resp = await getPostAPI();
            if (!resp) return null;
            setPosts(resp.data.data);
        };
        fetchPosts();
    }, []);

    if (!posts) {
        return null;
    }

    return (
        <div className="content-container">
            <PostListContext.Provider value={posts}>
                <PostCard />
            </PostListContext.Provider>
        </div>
    );
}
