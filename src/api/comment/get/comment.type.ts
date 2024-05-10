export interface CommentList {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    postId: number;
    user: User;
}

export interface User {
    id: number;
    nickname: string;
    profileImagePath: string;
}
