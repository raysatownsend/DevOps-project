import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'BookForm.css';

function BookForm({onHandleBookList, bookEdit}) {
    const [book, setBook] = useState({
        id: '',
        title: '',
        author: '',
        genre: '',
        date: '',
        summary: ''
    })

    const backApi = axios.create({
        baseURL: `${process.env.REACT_APP_API_URL}/books`,
        timeout:10000
    }); 

    useEffect(() => {
        if (bookEdit) {
            setBook(bookEdit);
        }
    }, [bookEdit]);

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setBook(prevBook => ({
            ...prevBook, 
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            if (bookEdit) {
                const response = await backApi.put(`/`, book)
                console.log('Livro adicionado com sucesso: ', response.data);
                onHandleBookList(response.data);
                alert('Livro editado com sucesso!')
            } else {
                const response = await backApi.post('/', book);
                onHandleBookList(response.data);
                alert('Livro adicionado com sucesso!')
                console.log('Livro adicionado', response.data);
            };
            const {name, value} = event.target;
            setBook({
                title: '',
                author: '',
                genre: '',
                date: '',
                summary: ''
            });
        } catch(e) {
            console.log('Erro ao adicionar um novo livro', e)
        }

    }

    return (
        <>
            <form className="bookForm" onSubmit={handleSubmit}>
                <label htmlFor="title"> Título </label>
                <input id="title" type='text' name='title' onChange={handleInputChange} value={book.title} required></input>
                <label htmlFor="author"> Autor(a) </label>
                <input id="author" type='text' name='author' onChange={handleInputChange} value={book.author} required></input>
                <label htmlFor="genre"> Gênero </label>
                <input id="genre" type='text' name='genre' onChange={handleInputChange} value={book.genre} required></input>
                <label htmlFor="date"> Data de leitura </label>
                <input id="date" type='date' name='date' onChange={handleInputChange} value={book.date} required></input>
                <label htmlFor="summary"> Resumo </label>
                <textarea id="summary" name='summary' onChange={handleInputChange} value={book.summary}></textarea>
                <button type='submit'>{bookEdit ? 'Editar Livro' : 'Adicionar Livro'}</button>
            </form>
        </>
    )
}

export default BookForm;