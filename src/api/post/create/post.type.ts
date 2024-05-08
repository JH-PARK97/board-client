export interface CreatePostItem {
    id: number;
    title: string;
    content: string;
    likeCount: number;
    createdAt: string;
    updatedAt: string;
    userId: number;
}

export interface User {
    nickname: string;
    profileImagePath: string;
}
