import React, { ReactNode } from 'react';

interface PostCardProps {
    children: ReactNode;
}
export default function PostCard({ children }: PostCardProps) {
    return (
        <div className="content-container">
            <div className="postcard-container text-center bg-slate-300">{children}</div>
        </div>
    );
}

interface PostCardImageProps {
    children?: ReactNode;
}

PostCard.Image = function Image({ children }: PostCardImageProps) {
    return <div className="postcard-image">{children}</div>;
};

interface PostCardTitleProps {
    children?: ReactNode;
}

PostCard.Title = function Title({ children }: PostCardTitleProps) {
    return <div className="postcard-title">{children}</div>;
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
