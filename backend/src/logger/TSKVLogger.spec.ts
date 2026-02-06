import { TskvLogger } from './tskvLogger';

describe('TskvLogger format', () => {
  let logger: TskvLogger;

  beforeEach(() => {
    logger = new TskvLogger();

    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  function parseTskv(line: string): Record<string, string> {
    const entries = line.split('\t').map(pair => pair.split('='));
    const record: Record<string, string> = {};
    for (const [key, value] of entries) {
      record[key] = value;
    }
    return record;
  }

  function expectBasicFields(record: Record<string, string>, level: string, msg: any, context?: string, trace?: string) {
    expect(record).toHaveProperty('time');
    expect(new Date(record.time).toISOString()).toBe(record.time);
    expect(Number(record.pid)).toBe(process.pid);
    expect(record.service).toBe('afisha-api');
    expect(record.level).toBe(level);
    expect(record.msg).toBe(typeof msg === 'string' ? msg : JSON.stringify(msg));
    expect(record.context).toBe(context || '');
    if (trace !== undefined) {
      expect(record.trace).toBe(trace);
    }
  }

  it('should log a simple message', () => {
    const msg = 'Hello TSKV';
    logger.log(msg);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'log', msg);
  });

  it('should log a warning with context', () => {
    const msg = 'Be careful';
    const context = 'UserService';
    logger.warn(msg, context);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'warn', msg, context);
  });

  it('should log an error with trace', () => {
    const msg = 'Something failed';
    const trace = 'Error: stack trace';
    const context = 'ApiController';
    logger.error(msg, trace, context);

    const callArg = (console.error as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'error', msg, context, trace);
  });

  it('should log debug message', () => {
    const msg = 'Debug info';
    logger.debug(msg, 'DebugService');

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'debug', msg, 'DebugService');
  });

  it('should log verbose message', () => {
    const msg = 'Verbose details';
    logger.verbose(msg);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'verbose', msg);
  });

  it('should handle object message', () => {
    const msg = { foo: 'bar' };
    logger.log(msg);

    const callArg = (console.log as jest.Mock).mock.calls[0][0];
    const record = parseTskv(callArg);
    expectBasicFields(record, 'log', msg);
  });
});
