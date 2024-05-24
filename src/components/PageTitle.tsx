import React, { ReactNode, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface PageTitleProps {
    title?: string;
    info?: any;
}
export default function PageTitle({ title = '', info }: PageTitleProps) {
    const location = useLocation();

    useEffect(() => {
        document.title = title;
    }, [location, title]);
    return null;
}
