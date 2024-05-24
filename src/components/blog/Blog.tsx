import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetUserPostListItem } from '../../api/user/get/user.type';
import { createThumbnailSrc, dateConvert, removeHtmlTag } from '../../utils/utils';
import PageTitle from '../PageTitle';

interface BlogComponentProps {
    userPost: GetUserPostListItem;
}
export default function BlogComponent({ userPost }: BlogComponentProps) {
    const posts = userPost.posts;
    const navigator = useNavigate();

    function handleClickPost(postId: number) {
        navigator(`/post/detail/${postId}`);
    }

    return (
        <>
            <PageTitle title={`${userPost.nickname}'s Home`} />
            <main>
                <aside>사이드메뉴</aside>
                <div className="blog-postlist-container w-[50%] m-auto min-h-[1000px]  space-y-8">
                    {posts.map((post) => {
                        const thumbnailSrc = createThumbnailSrc(post.content);

                        return (
                            <div
                                key={post.id}
                                className="blog-postlist-item w-full h-[200px] flex"
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
                                    <div className="subinfo text-gray-400 text-sm">
                                        <span>{dateConvert(post.createdAt)}</span>
                                        <span className="separator">·</span>
                                        <span>{post.totalCommentCount}개의 댓글</span>
                                    </div>
                                    <div className="content line-clamp-3 text-gray-600 ">
                                        {removeHtmlTag(post.content)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    <div className="pagination">페이지네이션</div>
                </div>
            </main>
        </>
    );
}
