import React from 'react';
import axios from 'axios';
import BookForm from './componentes/BookForm/BookForm';
import BookListN from './componentes/BookList/BookList';
import ResponsiveAppBar from './componentes/NavBar/ResponsiveAppBar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import logoB from './images/logoB.png';
import './App.css';
import Box from '@mui/material/Box';

function App() {
  const [books, setBooks] = React.useState([]);
  const [pageHeader, setPageHeader] = React.useState('Bem-vindo!');
  const [currentPage, setCurrentPage] = React.useState('/');

  const backApi = axios.create({
    baseURL: 'http://localhost:8081/books',
    timeout:10000
    }); 

  const getAllBooks = async() => {
    try {
      const response = await backApi.get('/')
      console.log('Lista de livros', response.data)
      setBooks(response.data)
      return response.data
    } catch (error) {
      console.log('Erro ao carregar todos os livros')
    }
  };

  React.useEffect(() => {
    getAllBooks();
  }, []);

  const handleEditBook = (updatedBook, id) => {
    const updateBook = books.map((book) => book.id === id ? updatedBook : book);
    setBooks(updateBook);
    console.log('Livro editado com sucesso!', updatedBook.title);
  }

  const handleAddBook = (newBook) => {
      setBooks([...books, newBook]);
  };

  const handleDeleteBook = (id) => {
    const updatedBookList = books.filter((book) => book.id !== id);
    setBooks(updatedBookList);
    const book = books.find(b => b.id === id);
    console.log('livro excluído com sucesso!', book?.title);
  }

  const handlePathChange = (path) => {
    setCurrentPage(path);
    switch (path) {
      case '/':
        setPageHeader('Bem-vindo!');
        break;
      case '/sobre':
        setPageHeader('Sobre');
        break;
      case '/cadastrar':
        setPageHeader('Adicionar Livro');
        break;
      case '/livros':
        setPageHeader('Lista de Livros Disponíveis');
        break;
      default:
        setPageHeader('Bem-vindo!');
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case '/':
        return (
          <Grid container spacing={0} maxWidth="md" justifyContent="center" alignItems="center">
            <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'center' }}>
              <img src={logoB} alt="Logo" style={{ width: '35%', height: 'auto', marginTop: '0px' }} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
                Prepare-se para embarcar em uma jornada sem limites, onde cada página é um convite para desbravar novos horizontes. 
                Aqui, os livros não são apenas pilhas de papel; eles são portais vibrantes, prontos para descolar sua imaginação.
              </Typography>
            </Grid>
          </Grid>
        );
      case '/sobre':
        return (
          <Grid container maxWidth="md">
            <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
              Esta aplicação foi desenvolvida para disponibilizar livros online. Acesse todos os livros clicando no menu "Lista de Livros Disponíveis". Você também pode adicionar novos livros clicando em "Adicionar um Livro".
            </Typography>
          </Grid>
        );
      case '/cadastrar':
        return <BookForm onHandleBookList={handleAddBook} />;
      case '/livros':
        return <BookListN books={books} onEditBook={handleEditBook} onDeleteBook={handleDeleteBook}/>;
      default:
        return (
          <Grid container maxWidth="md">
            <Typography variant="body1" align="justify" sx={{ mt: 2 }}>
              Bem-vindo à nossa aplicação de gerenciamento de livros!
            </Typography>
          </Grid>
        );
    }
  }
  return (
    <div className="App">
      <div className='navBar'>
        <ResponsiveAppBar onNavigate={handlePathChange}/>
      </div>
      <div className='AppHeader'>
        <h1>{pageHeader}</h1>
      </div>
      <Box sx={{ flexGrow: 1, maxWidth: 1200, margin: 'auto', mt: 3, display: 'flex', flexDirection: 'row', justifyContent: 'center', maxWidth: 1100 }}>
          {renderPageContent()}
      </Box>
      <div className='AppContent'>
        
      </div>
    </div>
  );
}

export default App;