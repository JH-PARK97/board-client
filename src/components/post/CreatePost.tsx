import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Tiptap from '../shared/Editor/Editor';
import Button from '@mui/material/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import createPostAPI from '../../api/post/create/post.api';
import { getUserEmail } from '../../utils/utils';
import { CreatePostBodySchema } from '../../api/post/create/post.validate';
import { schema as CreatePostSchema } from '../../api/post/create/post.validate';

export default function CreatePost() {
    const defaultTheme = createTheme();
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
            const email = getUserEmail();
            const body = {
                ...input,
                email,
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
            <Container maxWidth="lg">
                <form className="create-post-form" onSubmit={handleSubmit(onSubmit)}>
                    <div className="editor-container flex justify-center flex-col h-full ">
                        <div className="editor-title mt-5">
                            <textarea
                                {...register('title', { required: true })}
                                placeholder="제목을 입력하세요"
                                className="w-full h-[4rem] text-[2.5rem] font-bold resize-none"
                            />
                        </div>
                        <div className="editor-wrapper w-full h-[83vh] border overflow-auto">
                            <Tiptap getContent={getContent} />
                            <div className="editor-footer">
                                <div className="editor-footer-button-wrapper fixed bottom-0 flex h-[4rem] justify-between w-[60%] shadow-gray-200 items-center pr-[1rem] pl-[1rem]">
                                    <div className="editor-footer-button-left">
                                        <Button variant="outlined">나가기</Button>
                                    </div>
                                    <div className="editor-footer-button-right">
                                        <Button variant="contained" color="success" type="submit">
                                            등록
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </Container>
        </ThemeProvider>
    );
}
