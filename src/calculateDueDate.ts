const START_OF_WORKDAY: number = 9;
const END_OF_WORKDAY: number = 17;

const isWithinWorkingHours = (date: Date): boolean => {
  const hours: number = date.getHours();
  const minutes: number = date.getMinutes();
  return (hours >= 9 && hours < 17) || (hours === 17 && minutes === 0);
};

const isOnWeekend = (date: Date): boolean => {
  const WEEKEND_DAYS: number[] = [0, 6];
  return WEEKEND_DAYS.includes(date.getDay());
};

const validateSubmitDateTime = (submitDateTime: Date): void => {
  if (!submitDateTime || !(submitDateTime instanceof Date)) {
    throw new TypeError('Submit date/time must be a Date object');
  }
  if (!isWithinWorkingHours(submitDateTime)) {
    throw new RangeError('Submit date/time must be between 9:00AM and 17:00PM');
  }
  if (isOnWeekend(submitDateTime)) {
    throw new RangeError('Submit date/time must fall on a workday');
  }
};

const isInteger = (n: number): boolean => n === Math.floor(n);

const validateTurnaroundTime = (turnaroundTime: number): void => {
  if (!(typeof turnaroundTime === 'number')) {
    throw new TypeError('Turnaround time must be a number');
  }

  if (turnaroundTime <= 0 || !isInteger(turnaroundTime)) {
    throw new RangeError('Turnaround time must be positive integer');
  }
};

const validateInput = (submitDateTime: Date, turnaroundTime: number): void => {
  validateSubmitDateTime(submitDateTime);
  validateTurnaroundTime(turnaroundTime);
};

const incrementDate = (date: Date): void => void date.setDate(date.getDate() + 1);

const incrementHoursWorkdayAdjusted = (date: Date, hours: number): void => {
  date.setHours(date.getHours() + hours);
  if (!isWithinWorkingHours(date)) {
    incrementDate(date);
    const hoursOverEndOfWorkday = date.getHours() - END_OF_WORKDAY;
    date.setHours(START_OF_WORKDAY + hoursOverEndOfWorkday);
  }
};

const calculateDueDate = (submitDateTime: Date, turnaroundTime: number): Date => {
  validateInput(submitDateTime, turnaroundTime);

  const dueDate = new Date(submitDateTime);
  if (turnaroundTime > 8) {
    incrementDate(dueDate);
    turnaroundTime -= 8;
  }
  incrementHoursWorkdayAdjusted(dueDate, turnaroundTime);

  return dueDate;
};

export default calculateDueDate;
