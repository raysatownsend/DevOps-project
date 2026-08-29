import axios from 'axios';

const backApi = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}/books`,
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