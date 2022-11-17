import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './TimeCounterItem.module.css';

import { TimeCounterItemProps } from '../types/interfaces';

import ClockSpiner from '../clockSpiner';


const TimeCounterItem: FC<TimeCounterItemProps> = ({ data }) => {
  const { id, name, isRunning } = data;
  const navigate = useNavigate();

  const containerClickHandler = () => {
    navigate(`/timecounter-react/${id}`);
  }

  return (
    <div className={styles.container} onClick={containerClickHandler}>
      <div className={styles.timeCounterNameDiv}>
        <span className={styles.timeCounterNameSpan}>{name}</span>
      </div>
      <div className={styles.ctrlBtnsContainer}>
        { isRunning && <span className={styles.clockSpinerStyles}><ClockSpiner /></span> }
      </div>
    </div>
  );
}

export default TimeCounterItem;
