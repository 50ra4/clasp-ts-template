import { outputHelloWorld } from '../src/services';
import { HELLO_WORLD_MESSAGE } from '../src/constants';

describe('utils', () => {
  describe('outputHelloWorld', () => {
    it('should be called console.log and output `Hello world!`', () => {
      const spy = jest.spyOn(console, 'log');
      outputHelloWorld();
      expect(console.log).toBeCalled();
      expect(spy.mock.calls[0][0]).toBe(HELLO_WORLD_MESSAGE);
    });
  });
});
