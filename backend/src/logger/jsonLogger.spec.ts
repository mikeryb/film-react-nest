import { JsonLogger, LogMessage } from './jsonLogger';

describe('JsonLogger format', () => {
  let logger: JsonLogger;

  beforeEach(() => {
    logger = new JsonLogger();

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    jest.spyOn(console, 'debug').mockImplementation(() => {});
    jest.spyOn(console, 'info').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function expectJsonStructure(
    jsonStr: string,
    expectedLevel: string,
    expectedMessage: LogMessage,
    expectedTrace?: string,
    expectedContext: unknown[] = [],
  ) {
    const obj = JSON.parse(jsonStr);
    expect(obj).toHaveProperty('timestamp');
    expect(new Date(obj.timestamp).toISOString()).toBe(obj.timestamp);
    expect(obj.level).toBe(expectedLevel);
    expect(obj.message).toEqual(expectedMessage);
    expect(obj.trace).toBe(expectedTrace || null || undefined);
    expect(obj.context).toEqual(expectedContext);
  }

  it('should log a simple message', () => {
    const msg = 'Hello JSON';
    logger.log(msg);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    expectJsonStructure(callArg, 'log', msg, undefined, []);
  });

  it('should log an error with trace', () => {
    const msg = 'Something went wrong';
    const trace = 'Error: stack trace';
    logger.error(msg, trace, 123, 'extra');

    const callArg = (console.error as jest.Mock).mock.calls[0][0];
    expectJsonStructure(callArg, 'error', msg, trace, [123, 'extra']);
  });

  it('should log a warning with multiple params', () => {
    const msg = 'Be careful';
    const extra = ['param1', { key: 'val' }];
    logger.warn(msg, ...extra);

    const callArg = (console.warn as jest.Mock).mock.calls[0][0];
    expectJsonStructure(callArg, 'warn', msg, undefined, extra);
  });

  it('should log debug', () => {
    const msg = 'Debugging';
    logger.debug(msg, 42);

    const callArg = (console.debug as jest.Mock).mock.calls[0][0];
    expectJsonStructure(callArg, 'debug', msg, undefined, [42]);
  });

  it('should log verbose', () => {
    const msg = 'Verbose message';
    logger.verbose(msg);

    const callArg = (console.info as jest.Mock).mock.calls[0][0];
    expectJsonStructure(callArg, 'verbose', msg, undefined, []);
  });
});
