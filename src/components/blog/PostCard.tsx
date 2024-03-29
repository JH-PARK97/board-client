import React, { ReactNode } from 'react';

interface PostCardProps {
    children: ReactNode;
}
export default function PostCard({ children }: PostCardProps) {
    return (
            <div className="postcard-container text-center bg-slate-200">{children}</div>
    );
}

interface PostCardImageProps {
    children?: ReactNode;
    src: string;
}

PostCard.Image = function Image({ children, src }: PostCardImageProps) {
    return (
        <div className="postcard-image h-[40%] w-full  relative">
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
    return <div className="postcard-title h-[10%] text-left">{children}</div>;
};

interface PostCardContentProps {
    children?: ReactNode;
}

PostCard.Content = function Content({ children }: PostCardContentProps) {
    return <div className="postcard-content">{children}</div>;
};

interface PostCardSubInfoProps {
    children?: ReactNode;
}

PostCard.SubInfo = function SubInfo({ children }: PostCardSubInfoProps) {
    return <div className="postcard-subinfo">{children}</div>;
};

interface PostCardFooterProps {
    children?: ReactNode;
}

PostCard.Footer = function Footer({ children }: PostCardFooterProps) {
    return <div className="postcard-subinfo">{children}</div>;
};
