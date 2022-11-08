import { FC, useState } from 'react';

import styles from '../../Modal.module.css';

interface ModalContentRenameProps {
  inputValue: string;
  modalResult: (value: string) => void;
}

const ModalContentRename: FC<ModalContentRenameProps> = ({ inputValue, modalResult }) => {
  const [getTextValue, setTextValue] = useState<string>(inputValue);

  const textInputChangeHandler = (e: any) => {
    setTextValue(e.target.value);
  }
  const okHandler = () => {
    modalResult(getTextValue);
  };
  const cancelHandler = () => {
    modalResult('');
  };
  
  return (
    <div className={styles.ModalYesNoContainer}>
      <div>
        <input className={styles.ModalRenameInput}
              type="text"
              onChange={textInputChangeHandler}
              value={getTextValue}
        />
      </div>
      <div className={styles.ModalYesNoButtons}>
        <button onClick={okHandler}>OK</button>
        <button onClick={cancelHandler}>CANCEL</button>
      </div>
    </div>
  );
}

export default ModalContentRename;
