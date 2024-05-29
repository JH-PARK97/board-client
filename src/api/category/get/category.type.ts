export interface Category {
    id: number;
    name: string;
    userId: number;
    tags: Tag[];
    totalCount: number;
}

export interface Tag {
    id: number;
    name: string;
    categoryId: number;
    count: number;
}

// Assuming CategoryList was defined as below:
export interface CategoryList {
    id: number;
    name: string;
    userId: number;
    tags: Tag[];
    totalCount: number;
    resultCd: number;
}
