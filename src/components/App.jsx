import { useState, useEffect, useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Searchbar from 'components/Searchbar/Searchbar';

import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.scss';

const App = () => {
  const [searchImages, setSearchImages] = useState('');
  const [images, setImages] = useState([]);
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!searchImages) {
      return;
    }

    setLoading(true);

    fetch(
      `https://pixabay.com/api/?q=${searchImages}&page=${page}&key=7885732-ff20ed2008037251c38d0317e&image_type=photo&orientation=horizontal&per_page=12`
    )
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(
          new Error(`Incorrect text ${searchImages}, try again`)
        );
      })
      .then(data => {
        if (parseInt(data.totalHits) > 0) {
          setImages(prevImages => [...prevImages, ...data.hits]);
          setTotal(data.totalHits);
          return;
        }
        return Promise.reject(
          new Error(`Incorrect text ${searchImages}, try again`)
        );
      })
      .catch(error => setError(error))
      .finally(setLoading(false));
  }, [page, searchImages]);

  const loadImages = useCallback(() => {
    setPage(prevPage => prevPage + 1);
  }, []);

  const handleFormSubmit = useCallback(searchImages => {
    setSearchImages(searchImages);
    setImages([]);
    setPage(1);
  }, []);

  const totalPage = images.length / (page * total);

  return (
    <div className={styles.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && toast.error(error.message, { position: 'top-center' })}
      {loading && <Loader />}
      <ImageGallery images={images} />
      {totalPage < 1 && Boolean(images.length) && (
        <Button onClick={loadImages} />
      )}
      <ToastContainer />
    </div>
  );
};

export default App;
