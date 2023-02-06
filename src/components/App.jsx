import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import Loader from 'components/Loader/Loader';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Button from 'components/Button/Button';
import Searchbar from 'components/Searchbar/Searchbar';

import 'react-toastify/dist/ReactToastify.css';
import styles from './app.module.scss';

const IDLE = 'idle';
const PENDING = 'pending';
const REJECTED = 'rejected';
const RESOLVED = 'resolved';

class App extends Component {
  state = {
    searchImages: '',
    images: [],
    total: null,
    page: 1,
    error: null,
    status: IDLE,
  };

  componentDidUpdate(prevProps, prevState) {
    const preSearchImages = prevState.searchImages;
    const nextSearchImages = this.state.searchImages;
    const { page } = this.state;

    if (
      preSearchImages !== nextSearchImages ||
      prevState.page !== this.state.page
    ) {
      this.setState({ status: PENDING });
      fetch(
        `https://pixabay.com/api/?q=${nextSearchImages}&page=${page}&key=7885732-ff20ed2008037251c38d0317e&image_type=photo&orientation=horizontal&per_page=12`
      )
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          return Promise.reject(
            new Error(`Incorrect text ${nextSearchImages}, try again`)
          );
        })
        .then(data => {
          if (parseInt(data.totalHits) > 0) {
            return this.setState(prevState => {
              return {
                images: [...prevState.images, ...data.hits],
                total: data.totalHits,
                status: RESOLVED,
              };
            });
          }
          return Promise.reject(
            new Error(`Incorrect text ${nextSearchImages}, try again`)
          );
        })
        .catch(error => this.setState({ error, status: REJECTED }));
    }
  }

  loadImages = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  handleFormSubmit = searchImages => {
    this.setState({ searchImages, page: 1, images: [] });
  };

  renderContent = () => {
    const { error, status } = this.state;
    const { loadImages } = this;

    if (status === IDLE) {
      return;
    }

    if (status === PENDING) {
      const { images } = this.state;
      return (
        <>
          <Loader />
          <ImageGallery images={images} />
        </>
      );
    }
    if (status === REJECTED) {
      toast.error(error.message, { position: 'top-center' });
      this.setState({ error: null, status: IDLE });
      return;
    }
    if (status === RESOLVED) {
      const { images, total, page } = this.state;
      const totalPage = images.length / (page * total);
      return (
        <>
          <ImageGallery images={images} />
          {totalPage < 1 && <Button onClick={loadImages} />}
        </>
      );
    }
  };

  render() {
    const { handleFormSubmit, renderContent } = this;
    return (
      <div className={styles.App}>
        {<Searchbar onSubmit={handleFormSubmit} />}
        {renderContent()}
        <ToastContainer />
      </div>
    );
  }
}

export default App;
