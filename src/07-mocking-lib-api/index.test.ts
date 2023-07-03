// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should create instance with provided base url', async () => {
    const providedUrl = {
      baseURL: 'https://jsonplaceholder.typicode.com',
    };
    const dataResponse = { data: '1234' };

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(dataResponse);

    const spyAxiosCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/test');
    jest.runAllTimers();

    expect(spyAxiosCreate).toBeCalledWith(providedUrl);
  });

  test('should perform request to correct provided url', async () => {
    const providedUrl = {
      baseURL: 'https://jsonplaceholder.typicode.com',
    };
    const dataResponse = { data: '1234' };

    const spyAxiosGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValue(dataResponse);

    const spyAxiosCreate = jest.spyOn(axios, 'create');

    await throttledGetDataFromApi('/test');
    jest.runAllTimers();

    expect(spyAxiosCreate).toBeCalledWith(providedUrl);
    expect(spyAxiosGet).toBeCalled();
  });

  test('should return response data', async () => {
    const dataResponse = { data: '1234' };

    jest.spyOn(axios.Axios.prototype, 'get').mockResolvedValue(dataResponse);

    const res = await throttledGetDataFromApi('/test');
    jest.runAllTimers();

    expect(res).toBe(dataResponse.data);
  });
});
