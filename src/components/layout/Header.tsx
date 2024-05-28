import React, { useEffect, useState } from 'react';
import LogoutButton from '../LogoutButton';
import CreatePostButton from '../CreatePostButton';

export default function Header() {
    return (
        <React.Fragment>
            <header className="header w-full h-[60px] content-center ">
                <div className="header-warpper w-[90%] flex justify-between m-auto">
                    <div className="header-left-action">
                        <button className="font-mono text-[24px] font-semibold ">Home</button>
                    </div>
                    <div className="header-right-action">
                        <CreatePostButton />
                        <LogoutButton />
                    </div>
                </div>
            </header>
        </React.Fragment>
    );
}
