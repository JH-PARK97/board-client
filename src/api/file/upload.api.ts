import { client } from '../client';

export default async function fileUploadAPI(file: File) {
    try {
        let formData = new FormData();
        formData.append('file', file);
        const { data } = await client.post('upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });

        return data;
    } catch (error) {
        console.error(error);
    }
}
