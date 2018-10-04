import moment from 'moment';

function date(format, value) {
  return moment(value).format(format);
}

function day(value) {
  return date('YYYY-MM-DD', value);
}

/**
 * dollars formatter
 *
 * JS implementation of the Jekyll dollars filter. Convert a number-ish to a
 * whole USD dollar amount. Show negatives in parentheses.
 */
function dollars(value) {
  if (typeof value !== 'number') {
    return value;
  }

  const money = `$${Math.round(Math.abs(value))}`;
  return value < 0 ? `(${money})` : money;
}

export {
  date,
  day,
  dollars,
};
