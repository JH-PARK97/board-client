import React, { ReactNode, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateConvert } from '../../../utils/utils';
import { PostListContext } from './Home';

export default function PostCard() {
    const posts = useContext(PostListContext);
    const navigator = useNavigate();

    const handlePostCardClick = (postId: number) => {
        navigator(`/post/detail/${postId}`);
    };

    const createthumbnailSrc = (str: string) => {
        const regex = /<img.*?src=["'](.*?)["']/;
        const match = str.match(regex);

        if (match && match?.length > 1) {
            return match[1];
        }
    };

    const createProfileSrc = (src: string) => {
        const checkURL = /^http[s]?:\/\/([\S]{3,})/i;
        const isURL = checkURL.test(src);

        if (isURL) {
            return src;
        } else {
            const srcArray = src.split('\\profile\\');
            const fileanme = srcArray[1];
            const imgSrc = `${import.meta.env.VITE_API_URL}/images/${fileanme}?path=profile`;
            return imgSrc;
        }
    };

    return (
        <>
            {posts &&
                posts.map((post, idx) => {
                    const thumbnailSrc = createthumbnailSrc(post.content);
                    const hasThumbnail = !!thumbnailSrc;
                    const profileSrc = createProfileSrc(post.user.profileImagePath);

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
                                <PostCard.SubInfo>{dateConvert(post.createdAt)}</PostCard.SubInfo>
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
            ></img>
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
    const removeTagContent = children?.replace(/(<([^>]+)>)/gi, '');
    console.log(hasThumbnail);
    const contentHeight = hasThumbnail ? 'h-[60px]' : 'h-[105px]';
    return (
        <div className={`postcard-content  text-ellipsis overflow-hidden text-[14px] ${contentHeight}`}>
            <div className="">{removeTagContent}</div>
        </div>
    );
};

interface PostCardSubInfoProps {
    children?: ReactNode;
}

PostCard.SubInfo = function SubInfo({ children }: PostCardSubInfoProps) {
    return (
        <div className="postcard-subinfo  h-[10%] text-[12px] leading-3 text-gray-500 content-center absolute bottom-[15%]">
            <p> {children}</p>
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
                by <span className="font-bold">{children}</span>
            </div>
        </div>
    );
};
