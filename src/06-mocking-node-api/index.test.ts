// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import path from 'node:path';
import fs from 'node:fs';
import fsPromise from 'node:fs/promises';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const mockTimeOut = 1000;
    doStuffByTimeout(mockCallback, mockTimeOut);

    expect(setTimeout).toHaveBeenCalledWith(mockCallback, mockTimeOut);
  });

  test('should call callback only after timeout', () => {
    jest.spyOn(global, 'setTimeout');
    const mockCallback = jest.fn();
    const mockTimeOut = 1000;
    doStuffByTimeout(mockCallback, mockTimeOut);

    expect(mockCallback).not.toHaveBeenCalled();
    jest.advanceTimersByTime(mockTimeOut);
    expect(mockCallback).toHaveBeenCalled();
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const mockTimeInterval = 1000;
    doStuffByInterval(mockCallback, mockTimeInterval);

    expect(setInterval).toHaveBeenCalledWith(mockCallback, mockTimeInterval);
  });

  test('should call callback multiple times after multiple intervals', () => {
    jest.spyOn(global, 'setInterval');
    const mockCallback = jest.fn();
    const mockTimeInterval = 1000;
    const numberIntervals = 3;

    doStuffByInterval(mockCallback, mockTimeInterval);

    expect(mockCallback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(mockTimeInterval * numberIntervals);

    expect(mockCallback).toBeCalledTimes(numberIntervals);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');
    const fileName = 'fileName.txt';
    await readFileAsynchronously(fileName);
    expect(mockJoin).toHaveBeenCalledWith(__dirname, fileName);
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockReturnValue(false);
    const fileName = 'fileName.txt';
    const res = await readFileAsynchronously(fileName);
    expect(res).toBeNull;
  });

  test('should return file content if file exists', async () => {
    const fileName = 'fileName123.txt';
    const testData = 'file content';

    jest.spyOn(fs, 'existsSync').mockReturnValue(true);
    jest.spyOn(fsPromise, 'readFile').mockResolvedValue(testData);

    const res = await readFileAsynchronously(fileName);
    expect(res).toBe(testData);
  });
});
