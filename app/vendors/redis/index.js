const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_URL,
  port: process.env.REDIS_PORT,
  username: process.env.REDIS_USERNAME,
  password: process.env.REDIS_PASSWORD,
});

redis.on('error', (err) => console.log(err));

module.exports = redis;
