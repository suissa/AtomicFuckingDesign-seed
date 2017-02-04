const validateString = (val) => console.log(val !== '')

const types = {
  'String': {
    element: 'input', 
    type: 'text',
    // validate: validateString.toString()
  },
  'password': {
    element: 'input', 
    type: 'password',
    // validate: validateString.toString()
  },
  'email': {
    element: 'input', 
    type: 'email',
    // validate: validateString.toString()
  },
  'Number': {
    element: 'input', 
    type: 'number'
  },
  'Date': {
    element: 'input', 
    type: 'date'
  },
  'Boolean': {
    element: 'input', 
    type: 'checkbox'
  },
  'ObjectID': {
    element: 'select', 
    type: 'normal'
  }
}

module.exports = types