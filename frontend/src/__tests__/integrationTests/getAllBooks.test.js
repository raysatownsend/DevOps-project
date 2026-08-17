import {getAllBooks} from '../../getAllBooks';

test('get all books from the list', async () => {
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
