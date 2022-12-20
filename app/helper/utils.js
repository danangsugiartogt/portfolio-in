const _ = require('lodash');

/**
 * Checks value to determine whether a default value should be returned in its place.
 * The defaultValue is returned if value is NaN, null, empty, or undefined.
 * Using lodash isEmpty to with check the empty value.
 *
 * @param {*} value
 * @param {*} defaultValue
 */
exports.defaultToIfEmpty = (value, defaultValue) => {
  if (_.isEmpty(value)) {
    return _.isInteger(value) ? value : defaultValue;
  }
  return value;
};
