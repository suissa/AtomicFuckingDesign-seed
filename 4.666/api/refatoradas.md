

## Organelles

### Populate

```js
module.exports = (Organism) => 
  (req, res) => {
    // ...
    const toPopulate = (field, i) => {
      let atomConfig = '../_atoms/atom-'+field.trim()+'-config'
      let ref = require(atomConfig)['ref']
      return {path: field.trim(), model: ref}
    }
    const fieldsToPopulate = req.query.entities
                              .split(',')
                              .map(toPopulate)
    const query = {_id: req.params.id}
    
    return Organism.findOne(query)
      .populate(fieldsToPopulate)
      .exec()
      .then(success)
      .catch(error)
  }

```

## Organism - Factory

```js
const createOrganelles = (element, index) => {
   if (element.includes('populate') && DNA.populate) {
     Cell[element] = require(organellesPath+'organelle-'+element)(Organism, DNA.populate)
   } else {
     Cell[element] = require(organellesPath+'organelle-'+element)(Organism)
   }
  }
```

Para:

```js
  const createOrganelles = (acc, name) => 
    Object.assign(acc, {
      [name]: require(organellesPath+name)(Organism, DNA.populate)})
```

Saímos desse:

```js
const mongoose = require('mongoose')
const moleculesPath = './../modules/'
const organellesPath = './../_organelles/'

module.exports = (organism, Molecule) => {

  const organismName = organism.name  
  const Organism = mongoose.model(organismName, Molecule) // deixar generico

  let Cell = {}
  const Organelles = require('./../_config/organelles-default')

  if (Array.isArray(organism.organelles))
    organism.organelles.forEach((element, index) => Organelles.push(element))

  const createOrganelles = (element, index) => {
    if (element.includes('populate') && organism.populate) {
      Cell[element] = require(organellesPath+'organelle-'+element)(Organism, organism.populate)
    } else {
      Cell[element] = require(organellesPath+'organelle-'+element)(Organism)
    }
  }

  Organelles.forEach(createOrganelles)

  return Cell
}
```

PARA ESSE:

```js
const CONFIG_PATH = './../_config/atoms/'

const REQUIRED = require(CONFIG_PATH + 'fields-required')
const OPTIONAL = require(CONFIG_PATH + 'fields-optional')
const FIELDS_REMOVE = require(CONFIG_PATH + 'fields-remove')

const createRequired = (CONFIG) => 
  CONFIG.VALIDATE_FACTORY_PATH
    ? ({type: CONFIG.type,
        validate: require(CONFIG.VALIDATE_FACTORY_PATH)(CONFIG.ATOM_NAME.toUpperCase()) 
      })
    : ({type: CONFIG.type})

const filterOptionals = (key) => OPTIONAL.includes(key)
const reduceToObject = (acc, cur) => Object.assign(acc, {
        [Object.keys(cur)[0]]: cur[Object.keys(cur)[0]]
      })

const createOptional = (CONFIG) => Object.keys(CONFIG)
    .filter( filterOptionals )
    .map( (option, i) => Object.assign({}, {[option]: CONFIG[option]}) )
    .reduce( reduceToObject, {})

module.exports = (CONFIG) => Object.assign( {}, createRequired(CONFIG), createOptional(CONFIG))


```