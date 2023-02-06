import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

import PropTypes from 'prop-types';
import styles from './imageGallery.module.scss';

const ImageGallery = ({ images }) => {
  return (
    <>
      <ul className={styles.ImageGallery}>
        {images.map(image => {
          return <ImageGalleryItem key={image.id} {...image} />;
        })}
      </ul>
    </>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    })
  ),
};
