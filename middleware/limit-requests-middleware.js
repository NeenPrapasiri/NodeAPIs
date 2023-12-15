class TokenBucket {
    constructor(capacity, tokensPerInterval, interval) {
      this.capacity = capacity;
      this.tokensPerInterval = tokensPerInterval;
      this.interval = interval;
  
      this.tokens = 0;
      this.lastFilled = Date.now();
    }
  
    fill() {
      const now = Date.now();
      const timePassed = now - this.lastFilled;
      const tokensToAdd = Math.floor(timePassed / this.interval) * this.tokensPerInterval;
  
      this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
      this.lastFilled = now;
    }
  
    tryConsume(tokens) {
      this.fill();
  
      if (this.tokens >= tokens) {
        this.tokens -= tokens;
        return true;
      }
  
      return false;
    }
  }
  
  module.exports = TokenBucket;