import axios from 'axios';

const backApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/books`,
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