import React from 'react';
import styles from './GenreFilter.module.css';

const GenreFilter = ({ selectedGenre, setSelectedGenre }) => {
  const genres = ['Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Non-fiction'];

  return (
    <select
      value={selectedGenre}
      onChange={(e) => setSelectedGenre(e.target.value)}
      className={styles.genreFilter}
    >
      <option value="">All Genres</option>
      {genres.map(genre => (
        <option key={genre} value={genre}>{genre}</option>
      ))}
    </select>
  );
};

export default GenreFilter;
