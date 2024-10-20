import React from 'react';
import BookCard from './BookCard';
import styles from './BookList.module.css';

const BookList = ({ books, toggleWishlist }) => {
  return (
    <div className={styles.bookList}>
      {books.map(book => (
        <BookCard
          key={book.id}
          book={book}
          toggleWishlist={toggleWishlist}
          isWishlisted={books.some(b => b.id === book.id)}
        />
      ))}
    </div>
  );
};

export default BookList;
