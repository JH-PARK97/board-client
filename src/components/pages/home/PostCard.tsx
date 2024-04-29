import React, { ReactNode, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { dateFormat } from '../../../utils/utils';
import { PostListContext } from './Home';

export default function PostCard() {
    const posts = useContext(PostListContext);
    const navigator = useNavigate();

    const handlePostCardClick = (postId: number) => {
        navigator(`/post/detail/${postId}`);
    };

    return (
        <>
            {posts &&
                posts.map((post, idx) => {
                    return (
                        <div
                            key={idx}
                            className="postcard-body w-full h-full flex flex-col p-3 bg-white"
                            onClick={() => handlePostCardClick(post.id)}
                        >
                            <PostCard.Title>{post.title}</PostCard.Title>
                            <PostCard.Content>{post.content}</PostCard.Content>
                            <PostCard.SubInfo>{dateFormat(post.createdAt)}</PostCard.SubInfo>
                            <PostCard.Footer>{post.user.nickname}</PostCard.Footer>
                        </div>
                    );
                })}
        </>
    );
}

interface PostCardImageProps {
    children?: ReactNode;
    src: string;
}

PostCard.Image = function Image({ children, src }: PostCardImageProps) {
    return (
        <div className="postcard-image h-[45%] w-full relative">
            <img
                src={src}
                style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                }}
                alt="postcard-img"
            ></img>
            {children}
        </div>
    );
};

interface PostCardTitleProps {
    children?: ReactNode;
}

PostCard.Title = function Title({ children }: PostCardTitleProps) {
    return (
        <div className="postcard-title h-[10%] my-1">
            <p className="text-base text-ellipsis font-bold overflow-hidden text-nowrap">{children}</p>
        </div>
    );
};

interface PostCardContentProps {
    children: string;
}

// PostCard.Content = function Content({ content }: PostCardContentProps) {
//     const removeTagContent = content?.replace(/(<([^>]+)>)/gi, '');
//     return (
//         <div className="postcard-content h-[65px] text-ellipsis overflow-hidden text-[14px]">
//             <p> {removeTagContent}</p>
//         </div>
//     );
// };

PostCard.Content = function Content({ children }: PostCardContentProps) {
    const removeTagContent = children?.replace(/(<([^>]+)>)/gi, '');
    return (
        <div className="postcard-content h-[65px] text-ellipsis overflow-hidden text-[14px]">
            <p> {removeTagContent}</p>
        </div>
    );
};

interface PostCardSubInfoProps {
    children?: ReactNode;
}

PostCard.SubInfo = function SubInfo({ children }: PostCardSubInfoProps) {
    return (
        <div className="postcard-subinfo h-[10%] text-[12px] leading-3 text-gray-500 content-center mt-auto">
            <p> {children}</p>
        </div>
    );
};

interface PostCardFooterProps {
    children?: ReactNode;
}

PostCard.Footer = function Footer({ children }: PostCardFooterProps) {
    return (
        <div className="postcard-subinfo h-[10%] text-[12px] content-center border-t-[1px] border-slate-100">
            <div className="flex justify-start items-center gap-2">
                <img
                    className="postcard-profile-image rounded-full"
                    src="/default-image.jpg"
                    alt="profile"
                    width={24}
                    height={24}
                ></img>
                by <span className="font-bold">{children}</span>
            </div>
        </div>
    );
};
