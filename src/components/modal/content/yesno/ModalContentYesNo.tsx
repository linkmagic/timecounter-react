import { FC } from 'react';

import styles from '../../Modal.module.css';

interface ModalContentYesNoProps {
  message: string;
  modalResult: (value: boolean) => void;
}

const ModalContentYesNo: FC<ModalContentYesNoProps> = ({ message, modalResult }) => {
  const yesHandler = () => {
    modalResult(true);
  };
  const noHandler = () => {
    modalResult(false);
  };
  return (
    <div className={styles.ModalYesNoContainer}>
      <div className={styles.ModalYesNoMessage}>{message}</div>
      <div className={styles.ModalYesNoButtons}>
        <button onClick={yesHandler}>YES</button>
        <button onClick={noHandler}>NO</button>
      </div>
    </div>
  );
}

export default ModalContentYesNo;
