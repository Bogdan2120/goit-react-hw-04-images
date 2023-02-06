import React from 'react';
import PropTyps from 'prop-types';

import styles from './button.module.scss';

const Button = ({ onClick }) => {
  return (
    <button type="button" onClick={onClick} className={styles.button}>
      Load more
    </button>
  );
};

export default Button;

Button.proptyps = {
  onClick: PropTyps.func,
};
