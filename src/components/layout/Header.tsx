import React from 'react';
import LogoutButton from '../LogoutButton';
import CreatePostButton from '../CreatePostButton';
import { useLocation, useNavigate, useRouteLoaderData } from 'react-router-dom';
import { PostDetailItem } from '@/api/post/detail/post.type';
import { GetUserPostListItem } from '@/api/user/get/user.type';

export default function Header() {
    const location = useLocation();
    const navigator = useNavigate();
    const detailPost = useRouteLoaderData('detailPost') as PostDetailItem;
    const blogUser = useRouteLoaderData('blog') as GetUserPostListItem;

    let title = 'Home';
    let userId: number | null = null;
    if (location.pathname.includes('/post/') && detailPost) {
        title = `${detailPost.user.nickname}.log`;
        userId = detailPost.userId;
    } else if (location.pathname.includes('/blog/') && blogUser) {
        title = `${blogUser.nickname}.log`;
        userId = blogUser.id;
    }

    const handleClickTitle = () => {
        if (title === 'Home') {
            navigator('/home');
        } else if (userId !== null) {
            navigator(`/blog/${userId}`);
        }
    };

    return (
        <header className="header w-full h-[60px] content-center ">
            <div className="header-warpper w-[90%] flex justify-between m-auto">
                <div className="header-left-action">
                    <button onClick={handleClickTitle} className="font-mono text-[24px] font-semibold ">
                        {title}
                    </button>
                </div>
                <div className="header-right-action">
                    <CreatePostButton />
                    <LogoutButton />
                </div>
            </div>
        </header>
    );
}
