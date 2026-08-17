import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import BookForm from '../../componentes/BookForm/BookForm';
import axios from 'axios';

jest.mock('axios');

describe('Add a Book Unit Test', () => {
    const mockOnHandleBookList = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        global.alert = jest.fn();
        global.console.log = jest.fn();
    });

    it('renders all form fields', () => {
        render(<BookForm onHandleBookList={mockOnHandleBookList} />);
        expect(screen.getByLabelText(/Título/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Autor/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Gênero/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Data de leitura/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Resumo/i)).toBeInTheDocument();
        expect(screen.getByRole('button')).toHaveTextContent('Adicionar Livro');
    });

    it('submits form to add a new book', async () => {
        const mockBook = {
            id: 1,
            title: 'Test Title',
            author: 'Test Author',
            genre: 'Test Genre',
            date: '2024-06-01',
            summary: 'Test Summary'
        };
        axios.create.mockReturnThis();
        axios.post = jest.fn().mockResolvedValue({ data: mockBook });

        render(<BookForm onHandleBookList={mockOnHandleBookList} />);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: mockBook.title } });
        fireEvent.change(screen.getByLabelText(/Autor/i), { target: { value: mockBook.author } });
        fireEvent.change(screen.getByLabelText(/Gênero/i), { target: { value: mockBook.genre } });
        fireEvent.change(screen.getByLabelText(/Data de leitura/i), { target: { value: mockBook.date } });
        fireEvent.change(screen.getByLabelText(/Resumo/i), { target: { value: mockBook.summary } });

        fireEvent.click(screen.getByRole('button', { name: /Adicionar livro/i }));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('/', expect.objectContaining({
                title: mockBook.title,
                author: mockBook.author,
                genre: mockBook.genre,
                date: mockBook.date,
                summary: mockBook.summary
            }));
            expect(mockOnHandleBookList).toHaveBeenCalledWith(mockBook);
            expect(window.alert).toHaveBeenCalledWith('Livro adicionado com sucesso!');
        });

        // Campos limpos após submit
        expect(screen.getByLabelText(/Título/i)).toHaveValue('');
        expect(screen.getByLabelText(/Autor/i)).toHaveValue('');
        expect(screen.getByLabelText(/Gênero/i)).toHaveValue('');
        expect(screen.getByLabelText(/Data de leitura/i)).toHaveValue('');
        expect(screen.getByLabelText(/Resumo/i)).toHaveValue('');
    });

    it('submits form to edit a book', async () => {
        const mockBookEdit = {
            id: 2,
            title: 'Edit Title',
            author: 'Edit Author',
            genre: 'Edit Genre',
            date: '2024-05-01',
            summary: 'Edit Summary'
        };
        axios.create.mockReturnThis();
        axios.put = jest.fn().mockResolvedValue({ data: mockBookEdit });

        render(<BookForm onHandleBookList={mockOnHandleBookList} bookEdit={mockBookEdit} />);

        expect(screen.getByLabelText(/Título/i)).toHaveValue(mockBookEdit.title);

        fireEvent.change(screen.getByLabelText(/Título/i), { target: { value: 'Edited Title' } });
        fireEvent.click(screen.getByRole('button', { name: /Editar livro/i }));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith('/', expect.objectContaining({
                title: 'Edited Title'
            }));
            expect(mockOnHandleBookList).toHaveBeenCalledWith(mockBookEdit);
            expect(window.alert).toHaveBeenCalledWith('Livro editado com sucesso!');
        });
    });
});