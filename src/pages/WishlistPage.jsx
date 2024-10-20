import React, { useState, useEffect } from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from './WishlistPage.module.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const removeFromWishlist = (book) => {
    const updatedWishlist = wishlist.filter(item => item.id !== book.id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className={`${styles.container}`}>
      <h2 className={`${styles.wishHeading}`}>My Wishlist</h2>

      {wishlist.length === 0 ? (
        <p style={{textAlign: 'center',fontSize: '15px'}}>Your wishlist is empty.</p>
      ) : (
        <div className={`${styles.bookList}`}>
          {wishlist.map(book => (
            <div key={book.id} className={`${styles.bookCard}`}>
              <img src={book.formats['image/jpeg']} alt={book.title} className={`${styles.bookCover}`} />
              <h3 className={`${styles.bookHeading}`}>{book.title}</h3>
              <p className={`${styles.description}`}><strong style={{fontWeight: 500}}>Author Name:</strong> {book.authors.map((author) => author.name).join(', ') || 'Unknown'}</p>
              <p className={`${styles.description}`}> <strong style={{fontWeight: 500}}>Genre:</strong> {book.subjects.join(', ')}</p>
              <p className={`${styles.description}`}> <strong style={{fontWeight: 500,marginBottom: '20px'}}>Book id:</strong> {book.id}</p>
              <button onClick={() => removeFromWishlist(book)} className={`${styles.removeButton}`}>
                <FaHeart /> Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;

