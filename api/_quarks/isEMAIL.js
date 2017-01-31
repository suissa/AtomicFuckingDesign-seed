module.exports = (value) => {
  const regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
  const isEmpty = require('./isEmpty')(value)
  const isString = require('./isString')(value)

  const MIN = 9
  const MAX = 50
  
  if (isEmpty) return false
  if (!isString) return false
  return (value.length > MIN && value.length < MAX && regex.test(value))
}