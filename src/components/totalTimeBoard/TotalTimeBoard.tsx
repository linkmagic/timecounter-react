import { FC } from 'react';

import { totalSecondsToTime } from '../../utils/general';
import ClockSpiner from '../clockSpiner';
import TimeCell from '../timeCell';

import styles from './TotalTimeBoard.module.css';

interface TotalTimeBoardProps {
  value: number,
  isTimeCounterActive?: boolean
}

const TotalTimeBoard: FC<TotalTimeBoardProps> = ({ value, isTimeCounterActive = false }) => {
  const time = totalSecondsToTime(value);
  
  const containerClasses = [
    styles.container,
    // isTimeCounterActive ? styles.blurElement : ''
  ].join(' ');

  return (
    <div className={containerClasses}>
      <TimeCell value={time.days} title={'DAYS'} />
      <TimeCell value={time.hours} title={'HOURS'} />
      <TimeCell value={time.minutes} title={'MINUTES'} />
      <TimeCell value={time.seconds} title={'SECONDS'} />
      {isTimeCounterActive && (
        <div className={styles.coverActiveTimeCounter}>
          <div className={styles.spinerContainer}>
            <ClockSpiner />
          </div>
        </div>
      )}
    </div>
  );
}

export default TotalTimeBoard;
