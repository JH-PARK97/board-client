export interface DeleteCommentItem {
    data: Response;
    resultCd: number;
}
interface Response {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: number;
    postId: number;
}
