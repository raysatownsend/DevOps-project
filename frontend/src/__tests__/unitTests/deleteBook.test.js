import React from 'react';
import { waitFor } from '@testing-library/react';
import axios from 'axios';

jest.mock('axios');

const bookToDelete = {
    id: 3,
    title: 'Book to Delete',
    author: 'Author',
    genre: 'Genre',
    date: '2024-06-01',
    summary: 'Summary'
};
const mockOnHandleBookList = jest.fn();

let handleDeleteBook;

beforeEach(() => {
    jest.clearAllMocks();
    global.alert = jest.fn();
    global.console.log = jest.fn();

    const mockDelete = jest.fn().mockResolvedValue({ data: bookToDelete });
    axios.create.mockReturnValue({ delete: mockDelete });

    // Importa o módulo após o mock
    handleDeleteBook = require('../../deleteBook').handleDeleteBook;
});

it('delete a mocked book from the list', async () => {
    await waitFor(() => handleDeleteBook(bookToDelete.id, mockOnHandleBookList));
    await waitFor(() => {
        // Pega o mockDelete da instância mockada
        const mockDelete = axios.create.mock.results[0].value.delete;
        expect(mockDelete).toHaveBeenCalledWith(`/${bookToDelete.id}`);
        expect(mockOnHandleBookList).toHaveBeenCalledWith(bookToDelete);
        expect(window.alert).toHaveBeenCalledWith('Livro excluído com sucesso!');
    });
});