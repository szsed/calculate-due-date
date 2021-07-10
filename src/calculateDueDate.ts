const validateSubmitDateTime = (submitDateTime: Date): void => {
  if (!submitDateTime || !(submitDateTime instanceof Date)) {
    throw new TypeError('Submit date/time must be a Date object');
  }
  if (submitDateTime.getHours() < 9) {
    throw new RangeError('Submit date/time must be between 9:00AM and 17:00PM');
  }
  if (submitDateTime.getHours() > 17) {
    throw new RangeError('Submit date/time must be between 9:00AM and 17:00PM');
  }
  if (submitDateTime.getHours() === 17 && submitDateTime.getMinutes() > 0) {
    throw new RangeError('Submit date/time must be between 9:00AM and 17:00PM');
  }
  if (submitDateTime.getDay() === 6 || submitDateTime.getDay() === 0) {
    throw new RangeError('Submit date/time must be between 9:00AM and 17:00PM');
  }
};

const isInteger = (n: number) => n === Math.floor(n);

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

  return new Date();
};

export default calculateDueDate;
