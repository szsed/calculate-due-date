import calculateDueDate from '../../src/calculateDueDate';

describe('calculateDueDate', () => {
  describe('input/output validation', () => {
    it('should return a Date object', () => {
      const testSubmitDateTime = new Date('2021-07-10T09:30:00');
      const testTurnaroundTime = 5;
      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      expect(result).toBeInstanceOf(Date);
    });

    it('should validate the submit date/time parameter', () => {
      const testTurnaroundTime = 5;

      expect(() => calculateDueDate(undefined, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(null, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate(Date.now() as unknown as Date, testTurnaroundTime)).toThrow();
      expect(() => calculateDueDate({} as unknown as Date, testTurnaroundTime)).toThrow();
    });

    it('should validate the turnaround time parameter', () => {
      const testSubmitDateTime = new Date('2021-07-10T09:30:00');

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
      const testSubmitDateTime = new Date('2021-07-10T09:30:00');
      const testTurnaroundTime = 5;

      expect(() => calculateDueDate(testSubmitDateTime, testTurnaroundTime)).not.toThrow();
    });
  });
});
