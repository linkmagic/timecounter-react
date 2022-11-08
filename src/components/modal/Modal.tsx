import React, { FC } from 'react';

import styles from './Modal.module.css';

interface ModalProps {
  children: React.ReactNode;
  isVisible: boolean;
  setVisible: (value: boolean) => void;
}

const Modal: FC<ModalProps> = ({ isVisible, setVisible, children }) => {
  const rootClasses = [styles.Modal];
  if (isVisible) {
    rootClasses.push(styles.active);
  }
  const rootDivOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setVisible(false);
  };
  const contentDivOnClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  }
  return (
    <div className={rootClasses.join(' ')} onClick={rootDivOnClick}>
      <div className={styles.ModalContent} onClick={contentDivOnClick}>
        {children}
      </div>
    </div>
  )
}

export default Modal;
