import { DevLogger } from './devLogger';

describe('DevLogger basic output', () => {
  let logger: DevLogger;

  beforeEach(() => {
    logger = new DevLogger();

    jest.spyOn(process.stdout, 'write').mockImplementation(() => true);
    jest.spyOn(process.stderr, 'write').mockImplementation(() => true);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should log a simple message', () => {
    const message = 'Hello World!';
    logger.log(message);

    const calls = (process.stdout.write as jest.Mock).mock.calls;
    const containsMessage = calls.some(call => call[0].includes(message));
    expect(containsMessage).toBe(true);
  });

  it('should log a warning message', () => {
    const message = 'Warning!';
    logger.warn(message);

    const calls = (process.stdout.write as jest.Mock).mock.calls;
    const containsMessage = calls.some(call => call[0].includes(message));
    expect(containsMessage).toBe(true);
  });

  it('should log an error message', () => {
    const message = 'Error!';
    logger.error(message);

    const calls = (process.stderr.write as jest.Mock).mock.calls;
    const containsMessage = calls.some(call => call[0].includes(message));
    expect(containsMessage).toBe(true);
  });
});