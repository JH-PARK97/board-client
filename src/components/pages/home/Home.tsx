import React, { useEffect, useState } from 'react';
import getPostAPI from '@/api/post/get/post.api';
import { PostListItem } from '@/api/post/get/post.type';
import PostCard from './PostCard';

export default function Home() {
    const [posts, setPosts] = useState<PostListItem>();

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
            {posts.map((post: any, idx: number) => {
                if (idx % 3) {
                    return (
                        <PostCard data={post} key={idx}>
                            <div className="postcard-body w-full h-full flex flex-col p-3">
                                <PostCard.Title>{post.title}</PostCard.Title>
                                <PostCard.Content content={post.content} />
                                <PostCard.SubInfo>{post.createdAt}</PostCard.SubInfo>
                                <PostCard.Footer>{post.user.nickname}</PostCard.Footer>
                            </div>
                        </PostCard>
                    );
                }
                return (
                    <PostCard data={post} key={idx}>
                        <PostCard.Image src="https://source.unsplash.com/random?wallpapers" />

                        <div className="postcard-body w-full h-full  p-3">
                            <PostCard.Title>{post.title}</PostCard.Title>
                            <PostCard.Content content={post.content} />
                            <PostCard.SubInfo>{post.createdAt}</PostCard.SubInfo>
                            <PostCard.Footer>{post.user.nickname}</PostCard.Footer>
                        </div>
                    </PostCard>
                );
            })}
        </div>
    );
}
