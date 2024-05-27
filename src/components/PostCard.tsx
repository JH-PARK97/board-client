import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FORMAT, dateConvert, createProfileImageSrc, removeHtmlTag, createThumbnailSrc } from '../utils/utils';

import { PostListContext } from '../pages/Home/Home';

export default function PostCard() {
    const posts = useContext(PostListContext);
    const navigator = useNavigate();

    const handlePostCardClick = (postId: number) => {
        navigator(`/post/${postId}`);
    };

    return (
        <>
            {posts &&
                posts.map((post, idx) => {
                    const thumbnailSrc = createThumbnailSrc(post.content);
                    const hasThumbnail = !!thumbnailSrc;
                    const profileSrc = createProfileImageSrc(post.user.profileImagePath);
                    const subinfo = {
                        createdAt: post.createdAt,
                        totalCommentCount: post.totalCommentCount,
                    };

                    return (
                        <div
                            key={idx}
                            className="postcard-wrapper bg-white cursor-pointer relative"
                            onClick={() => handlePostCardClick(post.id)}
                        >
                            {thumbnailSrc && <PostCard.Image src={thumbnailSrc}></PostCard.Image>}
                            <div className="p-4">
                                <PostCard.Title>{post.title}</PostCard.Title>
                                <PostCard.Content hasThumbnail={hasThumbnail}>{post.content}</PostCard.Content>
                                <PostCard.SubInfo subinfo={subinfo} />
                                <PostCard.Footer src={profileSrc}>{post.user.nickname}</PostCard.Footer>
                            </div>
                        </div>
                    );
                })}
        </>
    );
}

interface PostCardImageProps {
    src: string;
}

PostCard.Image = function Image({ src }: PostCardImageProps) {
    return (
        <div className="postcard-image h-[40%]">
            <img
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                alt="postcard-img"
            />
        </div>
    );
};

interface PostCardTitleProps {
    children?: ReactNode;
}

PostCard.Title = function Title({ children }: PostCardTitleProps) {
    return (
        <div className="postcard-title mb-1">
            <p className="text-base text-ellipsis font-bold overflow-hidden text-nowrap">{children}</p>
        </div>
    );
};

interface PostCardContentProps {
    children: string;
    hasThumbnail: boolean;
}

PostCard.Content = function Content({ children, hasThumbnail }: PostCardContentProps) {
    const contentHeight = hasThumbnail ? 'h-[60px] line-clamp-3' : 'h-[130px] line-clamp-6';
    return (
        <div className={`postcard-content   text-[14px] ${contentHeight}`}>
            <div>{removeHtmlTag(children)}</div>
        </div>
    );
};

interface PostCardSubInfoProps {
    subinfo: {
        createdAt: string;
        totalCommentCount: number;
    };
}

PostCard.SubInfo = function SubInfo({ subinfo }: PostCardSubInfoProps) {
    return (
        <div className="postcard-subinfo  h-[10%] text-[12px] leading-3 text-gray-500 content-center absolute bottom-[15%]">
            <span> {dateConvert(subinfo.createdAt, FORMAT.YYYYMMDD_KR)}</span>
            <span className="separator">·</span>
            <span>{subinfo.totalCommentCount}개의 댓글</span>
        </div>
    );
};

interface PostCardFooterProps {
    children?: ReactNode;
    src: string;
}

PostCard.Footer = function Footer({ children, src }: PostCardFooterProps) {
    return (
        <div className="postcard-subinfo text-[12px] leading-3 text-gray-500 content-center absolute bottom-0 left-0 right-0 border-t-[1px] border-slate-100">
            <div className="flex justify-start items-center gap-2 p-2">
                <img
                    className="postcard-profile-image rounded-full"
                    src={src}
                    alt="profile"
                    width={24}
                    height={24}
                ></img>
                by <span className="font-bold text-black">{children}</span>
            </div>
        </div>
    );
};
