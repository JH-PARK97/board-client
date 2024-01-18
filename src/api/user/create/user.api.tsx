import axios from 'axios';

export default async function createUserAPI(body: any) {
    const { age, email, gender, password, phoneNumber } = body;
    await axios.post('http://localhost:8080/api/v1/post/user', {
        age: Number(age),
        email,
        gender,
        password,
        phoneNumber,
    });
}
