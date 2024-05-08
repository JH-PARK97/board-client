import React, { useContext, useEffect } from 'react';

import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Tiptap from '@/components/shared/Editor/Editor';
import Button from '@mui/material/Button';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CreatePostBodySchema } from '@/api/post/create/post.validate';
import { schema as CreatePostSchema } from '@/api/post/create/post.validate';

import { useNavigate, useParams } from 'react-router-dom';
import useLogout from '../../hooks/useLogout';

import { AxiosError } from 'axios';
import { TiptapContext } from '../shared/Editor/EditorProvider';
import getPostDetailAPI from '../../api/post/detail/post.api';
import createPostAPI from '@/api/post/create/post.api';


export default function CreatePost() {
    const defaultTheme = createTheme();
    const params = useParams();
    const { id } = params;
    const { handleLogout } = useLogout();
    const navigator = useNavigate();
    const { editor, content } = useContext(TiptapContext);

    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<CreatePostBodySchema>({
        resolver: zodResolver(CreatePostSchema),
    });

    useEffect(() => {
        if (editor) {
            fetchData();
        }
    }, [editor, id]);

    useEffect(() => {
        if (editor) {
            setValue('content', editor?.getHTML());
        }
    }, [editor, content]);

    const onSubmit = async (input: CreatePostBodySchema) => {
        try {
            const body = {
                ...input,
            };
            const resp = await createPostAPI(body);
            if (resp.resultCd === 200) {
                navigator('/home');
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                const { status, statusText } = error.request;
                console.log(status, statusText);
                if (status === 401) {
                    alert('토큰 만료');
                    handleLogout();
                }
            } else {
                console.log('error: ', error);
            }
        }
    };

    if (!editor) return null;

    const fetchData = async () => {
        if (!id) return null;
        try {
            const resp = await getPostDetailAPI(id);
            if (resp.status === 200) {
                const {
                    data: { content },
                } = resp.data;
                editor.commands.setContent(content);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="xl">
                <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="editor-container w-[80%] m-auto flex justify-center flex-col h-full ">
                        <div className="editor-title mt-5">
                            <textarea
                                {...register('title', { required: true })}
                                placeholder="제목을 입력하세요"
                                className="w-full h-[4rem] text-[2.5rem] font-bold resize-none"
                            />
                        </div>
                        <div className="editor-wrapper w-full border overflow-auto">
                            <Tiptap />
                        </div>
                        <div className="editor-footer flex justify-between mt-2">
                            <div className="editor-footer-button-left">
                                <Button variant="outlined" onClick={() => navigator(-1)}>
                                    나가기
                                </Button>
                            </div>
                            <div className="editor-footer-button-right">
                                <Button variant="contained" color="success" type="submit">
                                    등록
                                </Button>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </ThemeProvider>
    );
}
