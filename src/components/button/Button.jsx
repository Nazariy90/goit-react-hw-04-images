import PropTypes from 'prop-types';
import css from './Button.module.css';

export const Button = ({ onloadMore }) => {
  return (
    <button className={css.Button} onClick={onloadMore} type="button">
      Load more
    </button>
  );
};

Button.propTypes = {
  onloadMore: PropTypes.func.isRequired,
};
