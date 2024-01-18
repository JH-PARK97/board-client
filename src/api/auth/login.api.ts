import axios from 'axios';

export default async function loginAPI(body: any) {
    const { email, password } = body;
    console.log('body : ',body);
    await axios.post('http://localhost:8080/api/v1/post/login', {
        email,
        password,
    });
}
