import { useState } from 'react';
import PropTypes from 'prop-types';
import { ImageGalleryItem } from '../imageGalleryItem/ImageGalleryItem';
import css from './ImageGallery.module.css';
import { Modal } from '../modal/Modal';

export const ImageGallery = ({ hits }) => {
  const [isOpen, setisOpen] = useState(false);
  const [imageUrl, setimageUrl] = useState('');

  const handleOpenModal = imageUrl => {
    setisOpen(true);
    setimageUrl(imageUrl);
  };

  const handleCloseModal = () => {
    setisOpen(false);
    setimageUrl('');
  };

  return (
    <>
      <ul className={css.ImageGallery}>
        {hits.map(image => (
          <ImageGalleryItem
            key={image.id}
            image={image}
            onImageClick={handleOpenModal}
          />
        ))}
      </ul>

      <Modal isOpen={isOpen} closeModal={handleCloseModal}>
        <img
          style={{ width: 500, height: 400, objectFit: 'cover' }}
          src={imageUrl}
          alt=""
        />
      </Modal>
    </>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
    })
  ).isRequired,
};
