import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onLoadMore }) => {
  return (
    <button className={css.Button} onClick={onLoadMore} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
