export class RateLimitError extends Error {
  constructor(
    public limit: number,
    public remaining: number,
    public reset: number,
    public retryAfter: number
  ) {
    super(`Rate limit exceeded. Limit: ${limit}, Remaining: ${remaining}`);
    this.name = "RateLimitError";
  }
}
