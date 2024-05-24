export interface PostListItem {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User;
    totalCommentCount: number;
}

export interface User {
    nickname: string;
    profileImagePath: string;
}
