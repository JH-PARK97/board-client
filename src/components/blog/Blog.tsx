import React, { useEffect, useState } from 'react';

import Header from '../shared/Layout/Header';
import PostCard from './PostCard';

interface dataProps {
    title: string;
    content: string;
    createdDate: string;
    userId: string;
}
export default function Blog() {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchPostData = async () => {
            const resp = await fetch('/post.json');
            const json = await resp.json();
            setData(json);
        };
        fetchPostData();
    }, []);

    if (!data) {
        return null;
    }
    return (
        <div className="h-[100%] w-[90%] m-auto">
            <Header title="Blog" />
            <div className="content-container">
                {data.map((post: dataProps, idx: number) => {
                    if (idx % 3) {
                        return (
                            <PostCard key={idx}>
                                <div className="postcard-body w-full h-full flex flex-col p-3">
                                    {/* <PostCard.Image src="https://source.unsplash.com/random?wallpapers" /> */}
                                    <PostCard.Title>{post.title}</PostCard.Title>
                                    <PostCard.Content>{post.content}</PostCard.Content>
                                    <PostCard.SubInfo>{post.createdDate}</PostCard.SubInfo>
                                    <PostCard.Footer>{post.userId}</PostCard.Footer>
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
                                <PostCard.SubInfo>{post.createdDate}</PostCard.SubInfo>
                                <PostCard.Footer>{post.userId}</PostCard.Footer>
                            </div>
                        </PostCard>
                    );
                })}
            </div>
        </div>
    );
}
