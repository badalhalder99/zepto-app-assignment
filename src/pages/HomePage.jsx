import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FaHeart, FaSearch } from 'react-icons/fa';
import styles from './HomePage.module.css';
import Spinner from '../components/Spinner';

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm); // New state for debounced search
  const [selectedGenre, setSelectedGenre] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const booksPerPage = 32;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`https://gutendex.com/books?page=${currentPage}&search=${debouncedSearchTerm}&topic=${selectedGenre}`);
      console.log(response.data.results.length);
      setBooks(response.data.results);
      setCount(response.data.count);
      console.log(response.data.results);
    } catch (error) {
      console.error('Error fetching books:', error);
    } finally {
      setLoading(false);
    }
  };

  // Debouncing effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 1500); // Adjust the delay as needed (300ms in this example)

    return () => {
      clearTimeout(handler); // Cleanup the timer on unmount or when searchTerm changes
    };
  }, [searchTerm]);

  useEffect(() => {
    fetchBooks();
  }, [debouncedSearchTerm, selectedGenre, currentPage]); // Fetch books using debounced term

  const toggleWishlist = (book) => {
    const updatedWishlist = wishlist.some(item => item.id === book.id)
      ? wishlist.filter(item => item.id !== book.id)
      : [...wishlist, book];
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const genres = [...new Set(books.flatMap(book => book.subjects))];

  if (loading) {
    return (
      <div className={`${styles.loading}`}>
        <Spinner />
        <p style={{fontSize: "16px"}}>Loading...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.homepageWrap}`}>
      <div className={`${styles.container}`}>
        <div className={`${styles.row}`}>
          <div className={`${styles.left}`}>
            <h2 className={`${styles.heading}`}>Book Library</h2>
          </div>
          <div className={`${styles.right}`}>
            <div className={`${styles.searchWrap}`}>
              <input
                type="text"
                placeholder="Search books..."
                 className={`${styles.searchInput}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
               <FaSearch  className={`${styles.searchIcon}`}/>
            </div>
            
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className={`${styles.genreFilter}`}
            >
              <option value="">All Genres</option>
              {genres.map((genre, index) => (
                <option key={index} value={genre}>{genre}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className={`${styles.bookListWrap}`}>
          {books.map(book => (
            <div key={book.id} className={`${styles.bookCard}`}>
              <img src={book.formats['image/jpeg']} alt={book.title}  className={`${styles.bookImg}`} />
              <h3 className={`${styles.bookHeading}`}>{book.title}</h3>
              <p className={`${styles.description}`}><strong style={{fontWeight: 500}}>Author Name:</strong> {book.authors.map((author) => author.name).join(', ') || 'Unknown'}</p>
              <p className={`${styles.description}`}> <strong style={{fontWeight: 500}}>Genre:</strong> {book.subjects.join(', ')}</p>
              <p className={`${styles.description}`}> <strong style={{fontWeight: 500}}>Book id:</strong> {book.id}</p>
              <button
                onClick={() => toggleWishlist(book)}
                className={`${styles.wishlistButton} ${wishlist.some(item => item.id === book.id) ? styles.wishlisted : ''}`}
              >
                <FaHeart />
              </button>
              <Link to={`/book/${book.id}`} className={`${styles.viewDetailsButton}`}>View Details</Link>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.pagination} style={{marginBottom: '15px'}}>
        <button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        <button onClick={() => paginate(currentPage + 1)} disabled={currentPage * booksPerPage === count}>Next</button>
      </div>
    </div>
  );
};

export default HomePage;
