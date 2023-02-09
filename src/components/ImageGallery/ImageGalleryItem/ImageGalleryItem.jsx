import React, { useState } from 'react';
import PropTyps from 'prop-types';

import Modal from 'components/Modal/Modal';

import styles from './imageGalleryItem.module.scss';

const ImageGalleryItem = ({ webformatURL, largeImageURL, tags }) => {
  const [showModal, setShowModal] = useState(false);

  const showModalImage = () => {
    setShowModal(true);
  };

  const closeModalImage = () => {
    setShowModal(false);
  };

  return (
    <>
      <li className={styles.ImageGalleryItem} onClick={() => showModalImage()}>
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
};

export default ImageGalleryItem;

ImageGalleryItem.propTyps = {
  webformatURL: PropTyps.string.isRequired,
  largeImageURL: PropTyps.string.isRequired,
  tags: PropTyps.string.isRequired,
};
