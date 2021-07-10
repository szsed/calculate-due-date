const isWithinWorkingHours = (date: Date): boolean => {
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return (hours >= 9 && hours < 17) || (hours === 17 && minutes === 0);
};

const isOnWeekend = (date: Date): boolean => {
  const weekendDays = [0, 6];
  return weekendDays.includes(date.getDay());
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

const calculateDueDate = (submitDateTime: Date, turnaroundTime: number): Date => {
  validateInput(submitDateTime, turnaroundTime);

  const dueDate = new Date(submitDateTime);
  if (turnaroundTime > 8) {
    dueDate.setDate(dueDate.getDate() + 1);
    turnaroundTime -= 8;
  }
  dueDate.setHours(dueDate.getHours() + turnaroundTime);

  return dueDate;
};

export default calculateDueDate;
