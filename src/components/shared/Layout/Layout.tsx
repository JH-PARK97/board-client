import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <>
            <Header title="Blog" />
                <Content />
            <Footer description="fooooter" />
        </>
    );
}
