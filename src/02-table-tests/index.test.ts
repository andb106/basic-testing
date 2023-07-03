// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 6, b: 2, action: Action.Add, expected: 8 },
  { a: 6, b: 2, action: Action.Subtract, expected: 4 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 6, b: 2, action: '111', expected: null },
  { a: 'abc', b: 'asdf', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('should test', (args) => {
    expect(simpleCalculator(args)).toBe(args.expected);
  });
});
