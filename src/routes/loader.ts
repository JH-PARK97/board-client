import { LoaderFunctionArgs, redirect } from "react-router-dom";
import getPostDetailAPI from "../api/post/detail/post.api";

export const getPostDetailLoader = async ({ params }: LoaderFunctionArgs) => {
    if (params?.postId) {
        const postDetail = await getPostDetailAPI(params.postId);
        if (!postDetail || postDetail.resultCd !== 200) {
            return redirect('/home');
        }
        return postDetail.data;
    }
    return redirect('/home');
};
