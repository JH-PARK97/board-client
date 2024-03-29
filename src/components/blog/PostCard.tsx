import React, { ReactNode } from 'react';

interface PostCardProps {
    children: ReactNode;
}
export default function PostCard({ children }: PostCardProps) {
    return <div className="postcard-container  bg-slate-100">{children}</div>;
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
            <h4 className="text-ellipsis overflow-hidden text-nowrap">{children}</h4>
        </div>
    );
};

interface PostCardContentProps {
    children?: ReactNode;
}

PostCard.Content = function Content({ children }: PostCardContentProps) {
    return (
        <div className="postcard-content h-[65px] text-ellipsis overflow-hidden text-[14px]">
            <p> {children}</p>
        </div>
    );
};

interface PostCardSubInfoProps {
    children?: ReactNode;
}

PostCard.SubInfo = function SubInfo({ children }: PostCardSubInfoProps) {
    return (
        <div className="postcard-subinfo h-[10%] text-[12px] leading-3 text-gray-500 content-center">
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
            <div className='flex justify-start items-center gap-2'>
                <img className='postcard-profile-image rounded-full' src="/default-image.jpg" alt="profile" width={24} height={24} ></img>
                by <span className="font-bold">{children}</span>
            </div>
        </div>
    );
};
