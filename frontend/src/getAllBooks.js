import axios from 'axios';

const backApi = axios.create({
  baseURL: 'http://localhost:8081/books',
  timeout: 10000,
});

export async function getAllBooks() {
  try {
    const response = await backApi.get('/');
    return response.data;
  } catch (error) {
    throw error;
  }
}