import React, { useState, useEffect } from 'react';
import styles from '../assets/pagination.module.css';
import { Link, useSearchParams } from 'react-router-dom';

interface PaginationProps {
    totalCount: number;
    pageSize: number;
    pageCount: number;
    currentPage: number;
}

export default function Pagination({ totalCount, pageSize, pageCount, currentPage }: PaginationProps) {
    const [start, setStart] = useState(1);
    const [searchParams] = useSearchParams();

    const totalPages = Math.ceil(totalCount / pageSize);
    const noPrev = start === 1;
    const noNext = start + pageCount - 1 >= totalPages;

    useEffect(() => {
        if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
        if (currentPage < start) setStart((prev) => prev - pageCount);
    }, [currentPage, pageCount, start]);

    const updateSearchParams = (newPageNo: number) => {
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set('pageNo', newPageNo.toString());
        return newParams.toString();
    };

    return (
        <div className={styles.wrapper}>
            <ul>
                <li className={`${styles.move} ${noPrev && styles.invisible}`}>
                    <Link to={`?${updateSearchParams(start - 1)}`}>이전</Link>
                </li>
                {[...Array(pageCount)].map((_, i) => (
                    <React.Fragment key={i}>
                        {start + i <= totalPages && (
                            <li>
                                <Link
                                    className={`${styles.page} ${currentPage === start + i && styles.active}`}
                                    to={`?${updateSearchParams(start + i)}`}
                                >
                                    {start + i}
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                ))}
                <li className={`${styles.move} ${noNext && styles.invisible}`}>
                    <Link to={`?${updateSearchParams(start + pageCount)}`}>다음</Link>
                </li>
            </ul>
        </div>
    );
}
