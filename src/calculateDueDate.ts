const calculateDueDate = (submitDateTime: Date, turnaroundTime: number) => {
  if (!submitDateTime || !(submitDateTime instanceof Date)) {
    throw new TypeError('Submit date/time must be a Date object');
  }

  if (!(typeof turnaroundTime === 'number')) {
    throw new TypeError('Turnaround time must be a number');
  }

  if (turnaroundTime <= 0 || turnaroundTime !== Math.floor(turnaroundTime)) {
    throw new RangeError('Turnaround time must be positive integer');
  }

  return new Date();
};

export default calculateDueDate;
