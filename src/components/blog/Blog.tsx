import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserPostListItem } from '@/api/user/get/user.type';
import { createThumbnailSrc, dateConvert, removeHtmlTag } from '@/utils/utils';
import PageTitle from '../PageTitle';
import SideNav from './SideNav';
import { CategoryList } from '@/api/category/get/category.type';

interface BlogComponentProps {
    userPost: GetUserPostListItem;
    categories: CategoryList[];
}
export default function BlogComponent({ userPost, categories }: BlogComponentProps) {
    const posts = userPost.posts;
    const navigator = useNavigate();

    function handleClickPost(postId: number) {
        navigator(`/post/${postId}`);
    }

    return (
        <>
            <PageTitle title={`${userPost.nickname}'s Home`} />
            <main>
                <div className="blog-main-wrapper flex">
                    <SideNav categories={categories} />
                    <div className="blog-postlist-container w-[50%] min-h-[1000px]  space-y-8 m-auto">
                        {posts.map((post) => {
                            const thumbnailSrc = createThumbnailSrc(post.content);

                            return (
                                <div
                                    key={post.id}
                                    className="blog-postlist-item w-full h-[200px] flex cursor-pointer"
                                    onClick={() => handleClickPost(post.id)}
                                >
                                    {thumbnailSrc && (
                                        <div className="thumbnail-area min-w-[20%]">
                                            <img
                                                className="rounded-xl"
                                                src={thumbnailSrc}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                }}
                                            />
                                        </div>
                                    )}

                                    <div className="detail-area p-4 w-full text-ellipsis overflow-hidden space-y-2">
                                        <div className="title">
                                            <p className="text-2xl text-ellipsis font-bold overflow-hidden text-nowrap">
                                                {post.title}
                                            </p>
                                        </div>
                                        <div className="subinfo text-gray-400 text-sm ">
                                            <span>{dateConvert(post.createdAt)}</span>
                                            <span className="separator">·</span>
                                            <span>{post.totalCommentCount}개의 댓글</span>
                                        </div>
                                        <div className="content line-clamp-3 break-all text-gray-600 ">
                                            {removeHtmlTag(post.content)}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        </>
    );
}
