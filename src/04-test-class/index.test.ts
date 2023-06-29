// Uncomment the code below and write your tests
import {
  getBankAccount,
  BankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const initialBalance = 125;
    const testAccount = getBankAccount(initialBalance);

    expect(testAccount).toBeInstanceOf(BankAccount);
    expect(testAccount.getBalance()).toBe(initialBalance);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const initialBalance = 125;
    const moreThanInitialBalance = 130;
    const testAccount = getBankAccount(initialBalance);

    expect(() => testAccount.withdraw(moreThanInitialBalance)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring more than balance', () => {
    const initialBalance = 125;
    const moreThanInitialBalance = 130;
    const testAccount = getBankAccount(initialBalance);
    const newAccount = getBankAccount(initialBalance);

    expect(() =>
      testAccount.transfer(moreThanInitialBalance, newAccount),
    ).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring to the same account', () => {
    const initialBalance = 125;
    const testAccount = getBankAccount(initialBalance);

    expect(() => testAccount.transfer(initialBalance, testAccount)).toThrow(
      TransferFailedError,
    );
  });

  test('should deposit money', () => {
    const initialBalance = 125;
    const depositValue = 100;
    const testAccount = getBankAccount(initialBalance);

    testAccount.deposit(depositValue);

    expect(testAccount.getBalance()).toBe(initialBalance + depositValue);
  });

  test('should withdraw money', () => {
    const initialBalance = 125;
    const withdrawValue = 100;
    const testAccount = getBankAccount(initialBalance);

    testAccount.withdraw(withdrawValue);

    expect(testAccount.getBalance()).toBe(initialBalance - withdrawValue);
  });

  test('should transfer money', () => {
    const initialBalance = 125;
    const transferValue = 100;
    const testAccount = getBankAccount(initialBalance);
    const newAccount = getBankAccount(initialBalance);

    testAccount.transfer(transferValue, newAccount);

    expect(testAccount.getBalance()).toBe(initialBalance - transferValue);
    expect(newAccount.getBalance()).toBe(initialBalance + transferValue);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    const initialBalance = 125;
    const testAccount = getBankAccount(initialBalance);
    const fetchMockValue = 10;
    jest.spyOn(testAccount, 'fetchBalance').mockResolvedValue(fetchMockValue);

    const res = await testAccount.fetchBalance();
    expect(typeof res).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const initialBalance = 125;
    const fetchMockValue = 10;
    const testAccount = getBankAccount(initialBalance);

    jest.spyOn(testAccount, 'fetchBalance').mockResolvedValue(fetchMockValue);

    await testAccount.synchronizeBalance();

    expect(testAccount.getBalance()).toBe(fetchMockValue);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const initialBalance = 125;
    const testAccount = getBankAccount(initialBalance);

    jest.spyOn(testAccount, 'fetchBalance').mockResolvedValue(null);

    await expect(testAccount.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
