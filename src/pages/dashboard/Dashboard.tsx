import { FC, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';


import TimeCounterItem from '../../components/timeCounterItem';

import { RootState } from '../../store';
import {
  loadAllData,
  addTimeCounter,
  selectTimeCountersList
} from '../../store/timeCounterSlice';

import styles from './Dashboard.module.css';

import { loadAllDataFromLS } from '../../utils/localStorageRW';

import Modal from '../../components/modal';
import ModalContentRename from '../../components/modal/content/rename/ModalContentRename';

const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;


const Dashboard: FC = () => {
  const dispatch = useDispatch();
  const [isVisibleAddNewTCModal, setVisibleAddNewTCModal] = useState<boolean>(false);
  const timeCountersList = useTypedSelector(selectTimeCountersList);

  useEffect(() => {
    const listTimeCounters = loadAllDataFromLS();
    dispatch(loadAllData(listTimeCounters));
  }, []);

  const addTimeCounterClickHandler = () => {
    setVisibleAddNewTCModal(true);
  }
  const addTimeCounterModalHandler = (value: string) => {
    if (value.length > 0) {
      const newTimeCounter = {
        id: uuidv4(),
        name: value,
        totalSeconds: 0,
        isRunning: false,
        currentMilisStart: 0,
        currentMilisStop: 0,
        history: [],
      };
      dispatch(addTimeCounter(newTimeCounter));
    }
    setVisibleAddNewTCModal(false);
  }
  
  return (
    <div className={styles.containerTimeCounters}>
      <Modal isVisible={isVisibleAddNewTCModal} setVisible={setVisibleAddNewTCModal}>
        <ModalContentRename inputValue={''} modalResult={addTimeCounterModalHandler} />
      </Modal>
      {timeCountersList.map((item) => (
        <TimeCounterItem data={item} key={item.id} />
      ))}
      <button className={styles.addTimeCounterButton}
              onClick={addTimeCounterClickHandler}
      >
        +
      </button>
    </div>
  );
}

export default Dashboard;
