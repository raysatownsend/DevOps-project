import React from 'react';
import { render, screen } from '@testing-library/react';
import BookListN from '../../componentes/BookList/BookList';
import axios from 'axios';

jest.mock('axios');

describe('BookListN Integration Test', () => {
    const mockBooks = [
        {
            id: 1,
            title: 'Test Book 1',
            author: 'Author 1',
            genre: 'Genre 1',
            date: '2024-01-01',
            summary: 'Summary 1'
        },
        {
            id: 2,
            title: 'Test Book 2',
            author: 'Author 2',
            genre: 'Genre 2',
            date: '2024-02-01',
            summary: 'Summary 2'
        }
    ];

    it ('renders book list and fetches books from API', async () => {
        render(<BookListN books={mockBooks} onEditBook={jest.fn()} onDeleteBook={jest.fn()}/>);
        expect(screen.getByText(/Test Book 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Author 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Genre 1/i)).toBeInTheDocument();
        expect(screen.getByText(/Test Book 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Author 2/i)).toBeInTheDocument();
        expect(screen.getByText(/Genre 2/i)).toBeInTheDocument();
    });
});