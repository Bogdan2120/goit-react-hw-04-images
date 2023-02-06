import { Component } from 'react';
import { toast } from 'react-toastify';
import PropTyps from 'prop-types';

import 'react-toastify/dist/ReactToastify.css';
import styles from './searchbar.module.scss';

export class Searchbar extends Component {
  state = {
    searchImages: '',
  };

  handleSearchImagesChange = e => {
    this.setState({ searchImages: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchImages.trim() === '') {
      return toast.error('Enter text to search!', { position: 'top-center' });
    }
    this.props.onSubmit(this.state.searchImages);

    this.setState({ searchImages: '' });
  };

  render() {
    const { handleSearchImagesChange, handleSubmit } = this;
    const { searchImages } = this.state;

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
  }
}

export default Searchbar;

Searchbar.propTyps = {
  onSubmit: PropTyps.func,
};
