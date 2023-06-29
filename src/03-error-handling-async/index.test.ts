// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    const testValue = 'value';
    const res = await resolveValue(testValue);
    expect(testValue).toBe(res);
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    const testMsg = 'test message';
    expect(() => throwError(testMsg)).toThrow(testMsg);
  });

  test('should throw error with default message if message is not provided', () => {
    const defaultMessage = 'Oops!';
    expect(() => throwError()).toThrow(defaultMessage);
  });
});

describe('throwCustomError', () => {
  test('should throw custom error', () => {
    expect(() => throwCustomError()).toThrow(MyAwesomeError);
  });
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    expect(() => rejectCustomError()).rejects.toThrow(MyAwesomeError);
  });
});
