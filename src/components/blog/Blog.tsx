import React from 'react';

import Header from '../shared/Layout/Header';
import PostCard from './PostCard';

export default function Blog() {
    return (
        <div className="max-w-screen-xl mx-auto h-[100vh]">
            <Header title="Blog" />

            <PostCard>
                <PostCard.Image>이미지</PostCard.Image>
                <PostCard.Title>제목</PostCard.Title>
                <PostCard.Content>콘텐츠</PostCard.Content>
                <PostCard.SubInfo>부가정보</PostCard.SubInfo>
                <PostCard.Footer>작성자 정보</PostCard.Footer>
            </PostCard>
        </div>
    );
}
