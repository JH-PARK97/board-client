import { client } from '../../client';
import qs from 'qs';

const query = qs.stringify({
    populate: {
        user: {
            fields: 'username',
        },
    },
});
export default async function getPostAPI() {
    try {
        const res = await client.get(`posts?${query}`);
        return res;
    } catch (error) {
        throw error;
    }
}
