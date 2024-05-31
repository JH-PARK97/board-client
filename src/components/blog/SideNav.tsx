import React from 'react';
import { Category, CategoryList, Tag } from '@/api/category/get/category.type';
import { Link } from 'react-router-dom';

interface SideNavProps {
    categories: CategoryList[];
}

export default function SideNav({ categories }: SideNavProps) {
    return (
        <aside className="side-nav w-[300px] h-full  ">
            <div className="side-nav-container space-y-4">
                <Link to={''} className="category-item py-2 px-4 rounded-lg hover:bg-slate-200 cursor-pointer">
                    전체보기
                </Link>
                {categories.map((category: Category) => (
                    <div key={category.id}>
                        <Link to={`?category=${encodeURIComponent(category.id)}`}>
                            <div className="category-item py-2 px-4 rounded-lg hover:bg-slate-200 cursor-pointer">
                                {category.name} ({category.totalCount})
                            </div>
                        </Link>
                        {/* {category.tags.map((item) => (
                            <TagList key={item.id} tags={item} category={category.id} />
                        ))} */}
                    </div>
                ))}
            </div>
        </aside>
    );
}

// interface TagListProps {
//     tags: Tag;
//     category: number;
// }
// function TagList({ tags, category }: TagListProps) {
//     return (
//         <Link to={`?category=${encodeURIComponent(category)}&tag=${encodeURIComponent(tags.id)}`}>
//             <div key={tags.id} className="side-nav-tags-container px-6 rounded-lg hover:bg-slate-200 cursor-pointer">
//                 - {tags.name} ({tags.count})
//             </div>
//         </Link>
//     );
// }
