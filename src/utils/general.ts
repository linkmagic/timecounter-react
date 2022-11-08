export const addLeadingZero = (value: number): string => {
  return (value > 9 ? '' : '0' ) + value;
}

type DashboardTime = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const totalSecondsToTime = (value: number): DashboardTime => {
  const days = Math.floor(value / 3600 / 24);
  const hours = Math.floor((value - (days * 86400)) / 3600);
  const minutes = Math.floor((value - (days * 86400) - (hours * 3600)) / 60);
  const seconds = (value - (days * 86400) - (hours * 3600)) - (minutes * 60);
  return {
    days,
    hours,
    minutes,
    seconds,
  };
}

export const getDateTimeStr = (timeStampValue: number) => {
  const dateParsed = new Date(timeStampValue);
  return `${dateParsed.getFullYear()}/${addLeadingZero(dateParsed.getMonth()+1)}/${addLeadingZero(dateParsed.getDate())} - ${addLeadingZero(dateParsed.getHours())}:${addLeadingZero(dateParsed.getMinutes())}:${addLeadingZero(dateParsed.getSeconds())}`;
}
