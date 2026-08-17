import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import BookForm from '../BookForm/BookForm';

export default function BookListN({books, onEditBook, onDeleteBook}) {
    const [edBook, setEdBook] = React.useState(false);
    const [editingIndex, setEditingIndex] = React.useState(null);
    const [updatedBooks, setUpdatedBooks] = React.useState([]);

    const backApi = axios.create({
        baseURL: 'http://localhost:8081/books',
        timeout:10000
    }); 

    const handleEdit = async (bookId) => {
        try {
            const response = await backApi.get(`/${bookId}`)
            console.log(`O livro editado é o ${response.title}`)
            setEdBook(true);
            setEditingIndex(bookId);
        } catch (e) {
            console.log('Erro ao editar o livro', e)
        }
    }

    const handleExclude = (index) => {
        onDeleteBook(index);
        const book = books.find(b => b.id === index);
        alert(` O Livro: ${book?.title} foi excluído com sucesso!`);
    }

  return (
      <Box sx={{ flexGrow: 1, maxWidth: 1200, margin: 'auto', mt: 3, display: 'flex', flexDirection: 'column', justifyContent: 'center', maxWidth: 1100 }}>
        <Grid container spacing={3}>
          {books.map((book, id) => (
            <Grid item xs={12} sm={6} key={book.id || id}>
              <Card
                variant="outlined"
                sx={{
                  p: 3,
                  minHeight: 300,
                  minWidth: 300,
                  maxWidth: 300,
                  margin: 'auto',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                  boxShadow: 4,
                  borderRadius: 3,
                  transition: 'box-shadow 0.3s',
                  '&:hover': { boxShadow: 8, backgroundColor: '#f5f5ff' }
                }}
              >
                <Typography gutterBottom variant="h5" component="h2" sx={{ fontWeight: 600, color: '#1976d2' }}>
                  {book.title}
                </Typography>
                {editingIndex === book.id ? (
                  <BookForm bookEdit={book} onHandleBookList={(updatedBook) => {
                    onEditBook(updatedBook, book.id);
                    setEditingIndex(null);
                    console.log('Livro Editado:', updatedBook.title);
                  }}/>
                ) : (
                  <>
                    <Typography variant="body1" gutterBottom sx={{ color: 'text.secondary', mb: 1 }}>
                      <strong>Autor(a):</strong> {book.author}<br/>
                      <strong>Gênero:</strong> {book.genre}<br/>
                      <strong>Data de leitura:</strong> {book.date}<br/>
                      <strong>Resumo:</strong> {book.summary}
                    </Typography>
                    <Box sx={{ mt: 'auto', width: '100%', display: 'flex', justifyContent: 'space-between' }}>
                      <Button onClick={() => handleEdit(book.id)} variant="outlined" color="primary">Editar</Button>
                      <Button onClick={() => handleExclude(book.id)} variant="outlined" color="error">Excluir</Button>
                    </Box>
                  </>
                )}
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
}

