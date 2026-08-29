import axios from 'axios';
import { getAllBooks } from '../../getAllBooks';

jest.mock('axios');

test('get all books from the list', async () => {
  const mockBooks = [
    { id: 1, title: 'Test Book 1', author: 'Author 1', genre: 'Genre 1' },
    { id: 2, title: 'Test Book 2', author: 'Author 2', genre: 'Genre 2' },
  ];

  axios.get.mockResolvedValueOnce({ data: mockBooks });

  const books = await getAllBooks();

  expect(books).toBeDefined();
  expect(Array.isArray(books)).toBe(true);
  expect(books.length).toBeGreaterThan(0);
  books.forEach(book => {
    expect(book).toHaveProperty('title');
    expect(book).toHaveProperty('author');
    expect(book).toHaveProperty('genre');
  });
});