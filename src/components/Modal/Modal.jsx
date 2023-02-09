import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';

import PropTyps from 'prop-types';
import styles from './modal.module.scss';

const modalRoot = document.querySelector('#modal-root');

const Modal = ({ children, close }) => {
  const closeModal = useCallback(
    ({ code, target, currentTarget }) => {
      if (target === currentTarget || code === 'Escape') {
        close();
      }
    },
    [close]
  );

  useEffect(() => {
    document.addEventListener('keydown', closeModal);

    return () => document.removeEventListener('keydown', closeModal);
  }, [closeModal]);

  return createPortal(
    <div className={styles.overlay} onClick={closeModal}>
      <div className={styles.modal}>{children}</div>
    </div>,
    modalRoot
  );
};

export default Modal;

Modal.propeTypes = {
  children: PropTyps.node,
  close: PropTyps.func,
};
