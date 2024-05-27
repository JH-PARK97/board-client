export interface GetUserPostListItem {
    id: number;
    email: string;
    nickname: string;
    profileImagePath: string;
    totalCount: number;
    posts: Post[];
}

export interface Post {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    totalCommentCount: number;
}
