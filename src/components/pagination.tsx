import React, { useState, useEffect } from 'react';
import styles from '../assets/pagination.module.css';
import { Link } from 'react-router-dom';

interface PaginationProps {
    totalCount: number;
    pageSize: number;
    pageCount: number;
    currentPage: number;
}

export default function Pagination({ totalCount, pageSize, pageCount, currentPage }: PaginationProps) {
    const totalPages = Math.ceil(totalCount / pageSize);
    const [start, setStart] = useState(1);
    const noPrev = start === 1;
    const noNext = start + pageCount - 1 >= totalPages;

    useEffect(() => {
        if (currentPage === start + pageCount) setStart((prev) => prev + pageCount);
        if (currentPage < start) setStart((prev) => prev - pageCount);
    }, [currentPage, pageCount, start]);

    return (
        <div className={styles.wrapper}>
            <ul>
                <li className={`${styles.move} ${noPrev && styles.invisible}`}>
                    <Link to={`?pageNo=${start - 1}&pageSize=${pageSize}`}>이전</Link>
                </li>
                {[...Array(pageCount)].map((a, i) => (
                    <React.Fragment key={i}>
                        {start + i <= totalPages && (
                            <li>
                                <Link
                                    className={`${styles.page} ${currentPage === start + i && styles.active}`}
                                    to={`?pageNo=${start + i}&pageSize=${pageSize}`}
                                >
                                    {start + i}
                                </Link>
                            </li>
                        )}
                    </React.Fragment>
                ))}
                <li className={`${styles.move} ${noNext && styles.invisible}`}>
                    <Link to={`?pageNo=${start + pageCount}&pageSize=${pageSize}`}>다음</Link>
                </li>
            </ul>
        </div>
    );
}
