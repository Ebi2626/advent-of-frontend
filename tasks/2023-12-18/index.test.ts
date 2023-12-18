import { RateLimiter } from './index';

describe('RateLimiter', () => {
  const maxRequests = 2;
  const intervalMs = 1000;
  let rateLimiter: RateLimiter;

  beforeEach(() => {
    rateLimiter = new RateLimiter(maxRequests, intervalMs);
  });

  test('allows sending requests under the rate limit', () => {
    expect(rateLimiter.attemptAccess()).toBe(true);
    expect(rateLimiter.attemptAccess()).toBe(true);
  });

  test('blocks requests over the rate limit', () => {
    rateLimiter.attemptAccess();
    rateLimiter.attemptAccess();
    expect(rateLimiter.attemptAccess()).toBe(false);
  });

  test('allows requests again after the interval has passed', (done) => {
    rateLimiter.attemptAccess();
    rateLimiter.attemptAccess();
    setTimeout(() => {
      expect(rateLimiter.attemptAccess()).toBe(true);
      done();
    }, intervalMs + 50);
  });
});