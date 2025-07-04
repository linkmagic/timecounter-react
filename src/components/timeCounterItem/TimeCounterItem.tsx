import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './TimeCounterItem.module.css';

import { TimeCounterItemProps } from '../types/interfaces';

import { totalSecondsToTime } from '../../utils/general';

import ClockSpiner from '../clockSpiner';
import TimeCell from '../timeCell';


const TimeCounterItem: FC<TimeCounterItemProps> = ({ data }) => {
  const { id, name, totalSeconds, isRunning } = data;
  const navigate = useNavigate();

  const containerClickHandler = () => {
    navigate(`/timecounter-react/${id}`);
  }

  const time = totalSecondsToTime(totalSeconds)

  return (
    <div className={styles.container} onClick={containerClickHandler}>
      <div className={styles.timeCounterTitleContainer}>
        <div className={styles.timeCounterNameDiv}>{name}</div>
        <div className={styles.timeCounterTotalTimeDiv}>
          <TimeCell size="small" value={time.days} title={'DAYS'} />
          <TimeCell size="small" value={time.hours} title={'HOURS'} />
          <TimeCell size="small" value={time.minutes} title={'MINUTES'} />
          <TimeCell size="small" value={time.seconds} title={'SECONDS'} />
        </div>
      </div>
      {isRunning && (
        <div className={styles.ctrlBtnsContainer}>
          <span className={styles.clockSpinerStyles}><ClockSpiner /></span>
        </div>
      )}
    </div>
  );
}

export default TimeCounterItem;
