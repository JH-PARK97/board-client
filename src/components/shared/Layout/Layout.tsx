import React from 'react';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

export default function Layout() {
    return (
        <div className="w-[90%] h-full m-auto">
            <Header title="Blog" />
            <Content />
            <Footer description="fooooter" />
        </div>
    );
}
