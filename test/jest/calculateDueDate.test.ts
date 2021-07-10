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

    it('should not mutate the input date', () => {
      const savedInputDateValue = testSubmitDateTime.toISOString();
      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      expect(testSubmitDateTime.toISOString()).toBe(savedInputDateValue);
    });
  });

  describe('algorithm correctness', () => {
    it('should return the correct result when the due date is within the working day', () => {
      const testSubmitDateTime = new Date('2021-07-09T09:30:00');
      const testTurnaroundTime = 5;

      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      const expected = new Date('2021-07-09T14:30:00');
      expect(result.toISOString()).toBe(expected.toISOString());
    });

    it('should return the correct result when the due date is on the next day within the working week', () => {
      const testSubmitDateTime = new Date('2021-07-08T09:30:00');
      const testTurnaroundTime = 13;

      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      const expected = new Date('2021-07-09T14:30:00');
      expect(result.toISOString()).toBe(expected.toISOString());
    });

    it('should return the correct result when the due date would fall outside working hours on the same day', () => {
      const testSubmitDateTime = new Date('2021-07-08T14:30:00');
      const testTurnaroundTime = 5;

      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      const expected = new Date('2021-07-09T11:30:00');
      expect(result.toISOString()).toBe(expected.toISOString());
    });

    it('should return the correct result when the due date would fall on the next day on a weekend', () => {
      const testSubmitDateTime = new Date('2021-07-09T09:30:00');
      const testTurnaroundTime = 13;

      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      const expected = new Date('2021-07-12T14:30:00');
      expect(result.toISOString()).toBe(expected.toISOString());
    });

    it('should return the correct result when the due date is multiple days ahead', () => {
      const testSubmitDateTime = new Date('2021-07-08T09:30:00');
      const testTurnaroundTime = 26;

      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      const expected = new Date('2021-07-13T11:30:00');
      expect(result.toISOString()).toBe(expected.toISOString());
    });
  });
});
