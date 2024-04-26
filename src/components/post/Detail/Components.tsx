import React, { ReactNode } from 'react';

interface DetailPostProps {
    children: ReactNode;
}

export default function DetailPost({ children }: DetailPostProps) {
    return <div className="container w-[60%] h-[100%] m-auto bg-slate-300">{children}</div>;
}

interface DetailPostTitleProps {
    children: ReactNode;
}

DetailPost.Title = function Title({ children }: DetailPostTitleProps) {
    return (
        <div className="detailpost-title">
            <h1>{children}</h1>
        </div>
    );
};

interface DetailPostContentProps {
    children?: ReactNode;
}

DetailPost.Content = function Content({ children }: DetailPostContentProps) {
    return <div className="detailpost-content">{children}</div>;
};
