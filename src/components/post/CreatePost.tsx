import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Tiptap from '../shared/Editor/Editor';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import createPostAPI from '../../api/post/create/post.api';
import { getUserName } from '../../utils/utils';
import { CreatePostBodySchema } from '../../api/post/create/post.validate';
import { schema as CreatePostSchema } from '../../api/post/create/post.validate';
import { useNavigate } from 'react-router-dom';

export default function CreatePost() {
    const defaultTheme = createTheme();
    const navigator = useNavigate();
    const [content, setContent] = useState<string>();
    const {
        handleSubmit,
        setError,
        register,
        setValue,
        formState: { errors },
    } = useForm<CreatePostBodySchema>({
        resolver: zodResolver(CreatePostSchema),
    });
    const onSubmit = async (input: CreatePostBodySchema) => {
        try {
            const user = getUserName();
            const body = {
                ...input,
                // user,
            };
            const resp = await createPostAPI(body);
            console.log(resp);
        } catch (e) {
            console.log(e);
        }
    };
    const getContent = (content: string) => {
        setContent(content);
        setValue('content', content);
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
                            <Tiptap getContent={getContent} />
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
