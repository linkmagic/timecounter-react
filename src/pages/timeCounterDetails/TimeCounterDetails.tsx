import { FC, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  renameTimeCounter,
  runningTimeCounter,
  removeTimeCounter,
  clearHistoryTimeCounter
} from '../../store/timeCounterSlice';

import { RootState } from '../../store';

import backSvg from '../../resources/icons/back.svg';
import editSvg from '../../resources/icons/edit.svg';
import clearSvg from '../../resources/icons/clear.svg';
import removeSvg from '../../resources/icons/remove.svg';
import startSvg from '../../resources/icons/play.svg';
import stopSvg from '../../resources/icons/stop.svg';

import styles from './TimeCounterDetails.module.css';

import { TimeCounterItem } from '../../components/types/types';

import TotalTimeBoard from '../../components/totalTimeBoard';
import Modal from '../../components/modal';
import ModalContentYesNo from '../../components/modal/content/yesno/ModalContentYesNo';
import ModalContentRename from '../../components/modal/content/rename/ModalContentRename';


const TimeCounterDetails: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [isVisibleRemoveModal, setVisibleRemoveModal] = useState<boolean>(false);
  const [isVisibleClearModal, setVisibleClearModal] = useState<boolean>(false);
  const [isVisibleRenameModal, setVisibleRenameModal] = useState<boolean>(false);

  const timeCounter: TimeCounterItem = useSelector((state: RootState) => state.timeCounter.list.filter((item) => item.id === id)[0])
  const { name, totalSeconds, isRunning, history } = timeCounter;
  
  const backBtnClickHandler = () => {
    navigate('/timecounter-react/');
  }
  const editBtnClickHandler = () => {
    setVisibleRenameModal(true);
  }
  const clearBtnClickHandler = () => {
    setVisibleClearModal(true);
  }
  const removeBtnClickHandler = () => {
    setVisibleRemoveModal(true);
  }
  const startBtnClickHandler = () => {
    dispatch(runningTimeCounter({
      id: id!,
      isRunning: true,
      currentMilisStart: Date.now(),
    }));
  }
  const stopBtnClickHandler = () => {
    dispatch(runningTimeCounter({
      id: id!,
      isRunning: false,
      currentMilisStop: Date.now(),
    }));
  }
  const removeTimeCounterModalHandler = (value: boolean) => {
    if (value) {
      dispatch(removeTimeCounter({ id: id! }));
      navigate('/timecounter-react/');
    }
    setVisibleRemoveModal(false);
  }
  const clearHistoryModalHandler = (value: boolean) => {
    if (value) {
      dispatch(clearHistoryTimeCounter({ id: id! }));
    }
    setVisibleClearModal(false);
  }
  const renameModalHandler = (value: string) => {
    if (value.length > 0) {
      dispatch(renameTimeCounter({ id: id!, name: value }));
    }
    setVisibleRenameModal(false);
  }

  return (
    <>
      <div className={styles.headerContainer}>
        <Modal isVisible={isVisibleRemoveModal} setVisible={setVisibleRemoveModal}>
          <ModalContentYesNo message={'Remove this time counter?'} modalResult={removeTimeCounterModalHandler} />
        </Modal>
        <Modal isVisible={isVisibleClearModal} setVisible={setVisibleClearModal}>
          <ModalContentYesNo message={'Clear history for this time counter?'} modalResult={clearHistoryModalHandler} />
        </Modal>
        <Modal isVisible={isVisibleRenameModal} setVisible={setVisibleRenameModal}>
          <ModalContentRename inputValue={name} modalResult={renameModalHandler} />
        </Modal>
        <div className={styles.toolbarBtnsContainer}>
          <img src={backSvg}
              alt="Back to list"
              className={styles.svgIconToolbarBtn}
              onClick={backBtnClickHandler}
          />
          <img src={editSvg}
              alt="Back to list"
              className={styles.svgIconToolbarBtn}
              onClick={editBtnClickHandler}
          />
          <img src={clearSvg}
              alt="Back to list"
              className={styles.svgIconToolbarBtn}
              onClick={clearBtnClickHandler}
          />
          <img src={removeSvg}
              alt="Back to list"
              className={styles.svgIconToolbarBtn}
              onClick={removeBtnClickHandler}
          />
        </div>
        <div className={styles.titleName}>{name}</div>
      </div>
      <TotalTimeBoard value={totalSeconds} isTimeCounterActive={isRunning} />
      <div className={styles.ctrlButtonsContainer}>
        { !isRunning && (
          <img src={startSvg}
              alt="Start timer"
              className={styles.svgIconBtn}
              onClick={startBtnClickHandler}
          />
        )}
        { isRunning && (
          <img src={stopSvg}
              alt="Start timer"
              className={styles.svgIconBtn}
              onClick={stopBtnClickHandler}
          />
        )}
      </div>
      <div className={styles.historyContainer}>
          {history.map((item, index) => (
            <div className={styles.historyItem} key={index}>
              <div>{item.start}</div>
              <div>{item.stop}</div>
            </div>
          ))}
      </div>
    </>
  );
}

export default TimeCounterDetails;
