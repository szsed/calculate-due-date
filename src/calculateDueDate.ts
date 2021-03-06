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

const incrementWeeks = (date: Date, hours: number): number => {
  const wholeWorkDays: number = Math.floor(hours / 8);
  const wholeWorkWeeks: number = Math.floor(wholeWorkDays / 5);
  const remainderWorkDays: number = wholeWorkDays % 5;
  date.setDate(date.getDate() + wholeWorkWeeks * 7);
  return remainderWorkDays;
};

const incrementDate = (date: Date, days: number): void => {
  while (days) {
    incrementDateWeekendAdjusted(date);
    days--;
  }
};

const incrementDateWeekendAdjusted = (date: Date): void => {
  date.setDate(date.getDate() + 1);
  if (isOnWeekend(date)) {
    date.setDate(date.getDate() + 2);
  }
};

const incrementHoursWorkdayAdjusted = (date: Date, hours: number): void => {
  date.setHours(date.getHours() + hours);
  if (!isWithinWorkingHours(date)) {
    const hoursOverEndOfWorkday = date.getHours() - END_OF_WORKDAY;
    date.setHours(START_OF_WORKDAY + hoursOverEndOfWorkday);
    incrementDateWeekendAdjusted(date);
  }
};

const calculateDueDate = (submitDateTime: Date, turnaroundTime: number): Date => {
  validateInput(submitDateTime, turnaroundTime);

  const dueDate: Date = new Date(submitDateTime);

  const remainderHours: number = turnaroundTime % 8;
  const remainderWorkDays = incrementWeeks(dueDate, turnaroundTime);
  incrementDate(dueDate, remainderWorkDays);
  incrementHoursWorkdayAdjusted(dueDate, remainderHours);

  return dueDate;
};

export default calculateDueDate;
