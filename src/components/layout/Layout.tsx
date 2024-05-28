import React from 'react';
import { ScrollRestoration } from 'react-router-dom';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <ScrollRestoration />
            <Header />
            <Content />
            <Footer description="fooooter" />
        </>
    );
}
