import React from 'react';
import { ReplyList } from '@/api/comment/get/comment.type';
import { ReplyCommentComponent } from '../../shared/ReplyComment';

interface ReplyCommentProps {
    replyList: ReplyList[];
}
export default function ReplyComment({ replyList }: ReplyCommentProps) {
    return <ReplyCommentComponent replyList={replyList}></ReplyCommentComponent>;
}
