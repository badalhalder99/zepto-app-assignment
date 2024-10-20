import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { FaHeart } from 'react-icons/fa';
import styles from './BookDetailsPage.module.css';
import Spinner from '../components/Spinner';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(`https://gutendex.com/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book details:', error);
      }
    };

    fetchBook();

    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setIsWishlisted(wishlist.some(item => item.id === parseInt(id)));
  }, [id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    let updatedWishlist;

    if (isWishlisted) {
      updatedWishlist = wishlist.filter(item => item.id !== book.id);
    } else {
      updatedWishlist = [...wishlist, book];
    }

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    setIsWishlisted(!isWishlisted);
  };

  if (!book) {
    return (
      <div className={`${styles.loading}`}>
        <Spinner />
        <p style={{fontSize: "16px"}}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container}`}>
      <div className={`${styles.bookDetails}`}>
        <img src={book.formats['image/jpeg']} alt={book.title} className={`${styles.bookImg}`} />
        <div className={`${styles.bookInfo}`}>
          <h3 className={`${styles.bookHeading}`}>{book.title}</h3>
          <p className={`${styles.description}`}><strong style={{fontWeight: 500}}>Author Name:</strong> {book.authors.map((author) => author.name).join(', ') || 'Unknown'}</p>
          <p className={`${styles.description}`}> <strong style={{fontWeight: 500}}>Genre:</strong> {book.subjects.join(', ')}</p>
          <p className={`${styles.description}`}>Download count: {book.download_count}</p>
          <p className={`${styles.description}`}> <strong style={{fontWeight: 500}}>Book id:</strong> {book.id}</p>
          <button onClick={toggleWishlist} className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}>
            <FaHeart /> {isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
