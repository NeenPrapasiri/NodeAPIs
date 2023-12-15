const express = require('express');
const app = express();
const { errorHandler } = require('./controllers/error-controller')
const TokenBucket = require('./middleware/limit-requests-middleware')

const tokenBucket = new TokenBucket(10, 1, 1000); 
const rateLimitMiddleware = (req, res, next) => {
  if (tokenBucket.tryConsume(1)) {
    next();
  } else {
    res.status(429).send('Too Many Requests');
  }
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(rateLimitMiddleware);
app.use('/', require('./routes'))
app.use(errorHandler)

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app