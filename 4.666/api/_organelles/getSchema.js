const CONFIG_PATH = './../_config/module'
const TYPES = require(`${CONFIG_PATH}/frontend.types.js`)
const INPUTS = ['password','email']

module.exports = (Organism) => 
  (req, res) => {
    const removeUnderlineFields = (field) => !field.includes('_')
    const fromConfigToSchema = (field, i) => 
      ({ type: Organism.schema.paths[field].instance,
        name: field })

    const fromSchemaToComponent = (field, i) => 
      (TYPES[field.type])
        ? Object.assign({name: field.name}, TYPES[field.type])
        : Object.assign({name: field.name}, TYPES['String'])

    const transformToHTMLTypes = (field, i) => 
      (INPUTS.includes(field.name))
        ? Object.assign(field, TYPES[field.name])
        : Object.assign(field, TYPES[field.type])

    const getFieldsToPopulate = (field, i) => (field.element === 'select')

    const schema = Object
                    .keys(Organism.schema.paths)
                    .filter(removeUnderlineFields)
                    .map(fromConfigToSchema)
                    .map(fromSchemaToComponent)
                    .map(transformToHTMLTypes)

    // const schemaPopulated = schema.filter(getFieldsToPopulate)
   console.log('schema', schema)
    return res.send(schema)
  }