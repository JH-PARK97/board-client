import React from 'react';
import { Category, CategoryList, Tag } from '@/api/category/get/category.type';

interface SideNavProps {
    categories: CategoryList[];
}

export default function SideNav({ categories }: SideNavProps) {
    return (
        <aside className="side-nav w-[300px] h-full  bg-slate-50">
            <div className="side-nav-container space-y-4">
                <div className="category-item py-2 px-4 rounded-lg hover:bg-slate-200 cursor-pointer">전체보기</div>
                {categories.map((category: Category) => {
                    console.log(category);
                    return (
                        <>
                            <div
                                key={category.id}
                                className="category-item py-2 px-4 rounded-lg hover:bg-slate-200 cursor-pointer"
                            >
                                {category.name} ({category.totalCount})
                            </div>
                            {category.tags.map((item) => (
                                <TagList tags={item} />
                            ))}
                        </>
                    );
                })}
            </div>
        </aside>
    );
}

interface TagListProps {
    tags: Tag;
}
function TagList({ tags }: TagListProps) {
    return (
        <div className="side-nav-tags-container px-6">
            - {tags.name} ({tags.count})
        </div>
    );
}
