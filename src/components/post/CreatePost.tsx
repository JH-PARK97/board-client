import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Tiptap from '../shared/Editor/Editor';
import Button from '@mui/material/Button';

export default function CreatePost() {
    const { control } = useForm();
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <div className="editor-container flex justify-center flex-col h-full ">
                    <div className="editor-title mt-5">
                        <textarea
                            className="w-full h-[4rem] text-[2.5rem] font-bold resize-none"
                            placeholder="제목을 입력하세요"
                        />
                    </div>
                    <div className="editor-wrapper w-full h-[83vh] border overflow-auto">
                        <Tiptap />
                        <div className="editor-footer">
                            <div className="editor-footer-button-wrapper fixed bottom-0 flex h-[4rem] justify-between w-[60%] shadow-gray-200 items-center pr-[1rem] pl-[1rem]">
                                <div className="editor-footer-button-left">
                                    <Button variant='outlined'>나가기</Button>
                                </div>
                                <div className="editor-footer-button-right">
                                    <Button variant="contained" color="success">
                                        등록
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </ThemeProvider>
    );
}
