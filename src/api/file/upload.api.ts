import { client } from '../client';

export default async function fileUploadAPI(file: File, path: string) {
    try {
        let formData = new FormData();
        formData.append(path, file);
        const { data } = await client.post(`upload?path=${path}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });

        return data;
    } catch (error) {
        console.error(error);
    }
}
