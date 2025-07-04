import { FC } from 'react';

import { DashboardTime, totalSecondsToTime } from '../../utils/general';

import ClockSpiner from '../clockSpiner';
import TimeCell from '../timeCell';

import styles from './TotalTimeBoard.module.css';

interface TotalTimeBoardProps {
  value: number,
  isTimeCounterActive?: boolean
}

const TotalTimeBoard: FC<TotalTimeBoardProps> = ({ value, isTimeCounterActive = false }) => {
  const time: DashboardTime = totalSecondsToTime(value);
  
  const containerClasses = [
    styles.container,
    // isTimeCounterActive ? styles.blurElement : ''
  ].join(' ');

  return (
    <div className={containerClasses}>
      <TimeCell size="large" value={time.days} title={'DAYS'} />
      <TimeCell size="large" value={time.hours} title={'HOURS'} />
      <TimeCell size="large" value={time.minutes} title={'MINUTES'} />
      <TimeCell size="large" value={time.seconds} title={'SECONDS'} />
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
