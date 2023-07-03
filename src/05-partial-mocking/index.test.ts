// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => {
  const originalModule =
    jest.requireActual<typeof import('./index')>('./index');

  return {
    __esModule: true,
    ...originalModule,
    mockOne: () => 1,
    mockTwo: () => 1,
    mockThree: () => 2,
  };
});

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    mockOne();
    mockTwo();
    mockThree();
    expect(spyConsoleLog).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    const spyConsoleLog = jest.spyOn(console, 'log');
    unmockedFunction();
    expect(spyConsoleLog).toHaveBeenCalled();
  });
});
