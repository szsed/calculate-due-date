import calculateDueDate from '../../src/calculateDueDate';

describe('calculateDueDate', () => {
  describe('input/output validation', () => {
    it('should return a Date object', () => {
      const testSubmitDateTime = new Date('2021-07-10T09:30:00');
      const testTurnaroundTime = 5;
      const result = calculateDueDate(testSubmitDateTime, testTurnaroundTime);
      expect(result).toBeInstanceOf(Date);
    });
  });
});
