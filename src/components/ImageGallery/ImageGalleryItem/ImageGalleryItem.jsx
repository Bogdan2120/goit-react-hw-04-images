import React, { Component } from 'react';
import PropTyps from 'prop-types';

import Modal from 'components/Modal/Modal';

import styles from './imageGalleryItem.module.scss';

export class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  showModalImage = () => {
    this.setState({
      showModal: true,
    });
  };

  closeModalImage = () => {
    this.setState({
      showModal: false,
    });
  };
  render() {
    const { showModal } = this.state;
    const { webformatURL, largeImageURL, tags } = this.props;
    const { showModalImage, closeModalImage } = this;
    return (
      <>
        <li
          className={styles.ImageGalleryItem}
          onClick={() => showModalImage()}
        >
          <img
            className={styles.ImageGalleryItemImage}
            src={webformatURL}
            alt={tags}
          />
        </li>

        {showModal && (
          <Modal close={closeModalImage}>
            <div>
              <img src={largeImageURL} alt={tags} />
            </div>
          </Modal>
        )}
      </>
    );
  }
}

export default ImageGalleryItem;

ImageGalleryItem.propTyps = {
  webformatURL: PropTyps.string.isRequired,
  largeImageURL: PropTyps.string.isRequired,
  tags: PropTyps.string.isRequired,
};
