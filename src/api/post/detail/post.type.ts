export interface PostDetailItem {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
    user: User;
}

export interface User {
    nickname: string;
}
