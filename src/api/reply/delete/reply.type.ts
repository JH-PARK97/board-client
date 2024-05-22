export interface DeleteReplyItem {
    resultCd: number;
    data: Data;
}

export interface Data {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    commentId: number;
}
