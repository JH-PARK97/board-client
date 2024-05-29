import { Get } from '../../client';
import { CategoryList } from './category.type';

export default async function getCategoryAPI(userId: number) {
    try {
        const { data } = await Get<CategoryList[]>(`category/${userId}`);
        return data;
    } catch (error) {
        throw error;
    }
}
