import calculateDueDate from '../../src/calculateDueDate';

describe('calculateDueDate', () => {
  describe('input/output validation', () => {
    const testSubmitDateTime = new Date('2021-07-09T09:30:00');
    const testTurnaroundTime = 5;
    it('should return a Date object', () => {
      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      expect(result).toBeInstanceOf(Date);
    });

    it('should validate the submit date/time parameter', () => {
      expect(() => calculateDueDate(undefined, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(null, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(Date.now() as unknown as Date, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate({} as unknown as Date, testTurnaroundTime)).toThrow();
    });

    it('should reject submit date/time values outside working hours', () => {
      const earlyHourSubmitDateTime = new Date('2021-07-09T08:59:00');
      const lateHourSubmitDateTime = new Date('2021-07-09T18:00:00');
      const lateMinuteSubmitDateTime = new Date('2021-07-09T17:01:00');
      const saturdaySubmitDateTime = new Date('2021-07-10T09:30:00');
      const sundaySubmitDateTime = new Date('2021-07-11T09:30:00');

      expect(() => calculateDueDate(earlyHourSubmitDateTime, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(lateHourSubmitDateTime, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(lateMinuteSubmitDateTime, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(saturdaySubmitDateTime, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(sundaySubmitDateTime, testTurnaroundTime)).toThrow();
    });

    it('should validate the turnaround time parameter', () => {
      expect(() => calculateDueDate(testSubmitDateTime, undefined)).toThrow();
      expect(() => calculateDueDate(testSubmitDateTime, null)).toThrow();
      expect(() =>
        calculateDueDate(testSubmitDateTime, new Date('2021-07-11T09:30:00') as unknown as number)
      ).toThrow();
      expect(() => calculateDueDate(testSubmitDateTime, -5)).toThrow();
      expect(() => calculateDueDate(testSubmitDateTime, 0)).toThrow();
      expect(() => calculateDueDate(testSubmitDateTime, 4.5)).toThrow();
    });

    it('should accept valid input', () => {
      expect(() => calculateDueDate(testSubmitDateTime, testTurnaroundTime)).not.toThrow();
    });
  });
});
