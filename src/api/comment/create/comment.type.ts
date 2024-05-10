export interface CreateCommentItem {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    postId: number;
    user: User;
}

export interface User {
    nickname: string;
    id: number;
    profileImagePath: string;
}
