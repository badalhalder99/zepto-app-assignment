import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import styles from './BookCard.module.css';

const BookCard = ({ book, toggleWishlist, isWishlisted }) => {
  return (
    <div className={styles.bookCard}>
      <img src={book.formats['image/jpeg']} alt={book.title} className={styles.bookCover} />
      <h3>{book.title}</h3>
      <p>Author: {book.authors[0]?.name || 'Unknown'}</p>
      <p>Genre: {book.subjects[0] || 'Unspecified'}</p>
      <button
        className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
        onClick={() => toggleWishlist(book)}
      >
        <FaHeart />
      </button>
      <Link to={`/book/${book.id}`} className={styles.detailsLink}>View Details</Link>
    </div>
  );
};

export default BookCard;
