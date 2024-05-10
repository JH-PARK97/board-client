import React, { ReactNode, useEffect, useState } from 'react';
import getCommentAPI from '../../../api/comment/get/comment.api';
import { CommentList } from '@/api/comment/get/comment.type';

interface CommentProps {
    postId: number | string;
}

interface SubInfoProps {
    createdAt: string;
    writer: string;
    writerId: number;
    profileImagePath: string;
    postId: number;
}
export default function Comment({ postId }: CommentProps) {
    const [commentList, setCommentList] = useState<any>();

    useEffect(() => {
        const fetchCommentList = async () => {
            try {
                const resp = await getCommentAPI(postId);
                if (resp.resultCd === 200) {
                    setCommentList(resp.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        fetchCommentList();
    }, []);

    if (!commentList) return null;
    console.log(commentList.map((item) => item));
    return (
        <div className="comment-container">
            <Comment.Wrapper>
                <Comment.Subinfo data={commentList} />
                <Comment.Content>
                    써주신 글 정말 많이 공부가 됐습니다!! 한참을 보면서 공부했네요 ㅎㅎ 빨리 이런 구조로 하나 만들어보고
                    싶을 정도입니다. 한가지 궁금한건 index.ts로 모듈을 묶어서 내보낸다는게 정확히 이해가 가지 않아서요!
                    아직 이렇게 해 본적이 없는데 이렇게 index.ts로 내보내는 이유가 있을까요? 유지보수 측면인가요~?
                </Comment.Content>
                <Comment.Footer>답글 보기</Comment.Footer>
            </Comment.Wrapper>
        </div>
    );
}

interface CommentWrapperProps {
    children: ReactNode;
}

Comment.Wrapper = function Wrapper({ children }: CommentWrapperProps) {
    return <div className="comment-wrapper min-h-[200px] py-6 space-y-6 border-b-[1px]">{children}</div>;
};

interface CommentSubinfoProps {
    data: CommentList;
}

Comment.Subinfo = function Subinfo({ data }: CommentSubinfoProps) {
    console.log(data);
    return <div className="comment-subinfo"></div>;
};

interface CommentContentProps {
    children: ReactNode;
}

Comment.Content = function Content({ children }: CommentContentProps) {
    return <div className="comment-content text-lg">{children}</div>;
};

interface CommentFooterProps {
    children: ReactNode;
}

Comment.Footer = function Footer({ children }: CommentFooterProps) {
    return <div>{children}</div>;
};
