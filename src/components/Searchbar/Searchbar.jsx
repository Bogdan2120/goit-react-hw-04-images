import { useState } from 'react';
import { toast } from 'react-toastify';
import PropTyps from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import styles from './searchbar.module.scss';

const Searchbar = ({ onSubmit }) => {
  const [searchImages, setSearchImages] = useState('');

  const handleSearchImagesChange = e => {
    setSearchImages(e.currentTarget.value.toLowerCase());
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (searchImages.trim() === '') {
      return toast.error('Enter text to search!', { position: 'top-center' });
    }
    onSubmit(searchImages);

    setSearchImages('');
  };

  return (
    <div className={styles.Searchbar}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={styles.SearchFormButton}>
          <span className={styles.SearchFormButtonLabel}>Search</span>
        </button>
        <input
          type="text"
          name="searchImages"
          className={styles.SearchFormInput}
          value={searchImages}
          onChange={handleSearchImagesChange}
        />
      </form>
    </div>
  );
};

export default Searchbar;

Searchbar.propTyps = {
  onSubmit: PropTyps.func,
};
