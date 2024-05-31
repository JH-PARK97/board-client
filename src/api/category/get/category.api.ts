import { Get } from '../../client';
import { CategoryList } from './category.type';

export default async function getCategoryAPI(userId: number, query = '') {
    try {
        const { data } = await Get<CategoryList[]>(`category/${userId}?${query}`);
        return data;
    } catch (error) {
        throw error;
    }
}
