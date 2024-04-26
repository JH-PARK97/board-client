import React from 'react';
import { Outlet } from 'react-router-dom';

export default function Content() {
    return (
        <div className='layout-content min-h-[80vh]'>
            <Outlet />
        </div>
    );
}
