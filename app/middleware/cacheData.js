const { redis } = require('../vendors/index');
const { successResponse } = require('../helper/response.util');

exports.getCacheData = async (req, res, next) => {
  try {
    const key = req.params.id;
    const data = await redis.get(key);

    if (data) {
      return res.status(200).json(successResponse('success get cache data', JSON.parse(data)));
    }

    return next();
  } catch (err) {
    return next();
  }
};
