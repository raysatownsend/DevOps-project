import axios from 'axios';

const backApi = axios.create({
  baseURL: 'http://localhost:8081/books',
  timeout: 10000,
});

export async function handleDeleteBook (id, onHandleBookList) {
  try {
    const response = await backApi.delete(`/${id}`);
    alert('Livro excluído com sucesso!');
    console.log('Livro excluído com sucesso!', response.data.title);
    console.log('Dados retornados:', response.data);
    if(onHandleBookList) {
      onHandleBookList(response.data);
    }
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir livro:', error);
  }
}