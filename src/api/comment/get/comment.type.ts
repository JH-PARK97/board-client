export interface CommentList {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    postId: number;
    user: User;
    reply?: ReplyList;
}

export interface User {
    id: number;
    nickname: string;
    profileImagePath: string;
}
export interface ReplyList {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    commentId: number;
    user: User;
}
