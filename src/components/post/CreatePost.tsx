import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react';
import { useForm } from 'react-hook-form';
import Footer from '../blog/Footer';
import Header from '../blog/Header';
import Tiptap from '../shared/Editor';
import { FormInput } from '../shared/Form';

const sections = [
    { title: 'Technology', url: '#' },
    { title: 'Design', url: '#' },
    { title: 'Culture', url: '#' },
    { title: 'Business', url: '#' },
    { title: 'Politics', url: '#' },
    { title: 'Opinion', url: '#' },
    { title: 'Science', url: '#' },
    { title: 'Health', url: '#' },
    { title: 'Style', url: '#' },
    { title: 'Travel', url: '#' },
];

export default function CreatePost() {
    const { control } = useForm();
    const defaultTheme = createTheme();
    return (
        <ThemeProvider theme={defaultTheme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <Header title="Blog" sections={sections} />

                <div
                    className="editor-container"
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                >
                    <input name="title" />
                    <div className="editor-wrapper" style={{ width: '100%', height: '60vh', borderColor: 'black' }}>
                        <Tiptap  />
                    </div>
                </div>
            </Container>
            <Footer title="Footer" description="Something here to give the footer a purpose!" />
        </ThemeProvider>
    );
}
