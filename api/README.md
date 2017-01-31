# Atomic Design - Seed

## Como fazer

- modifique o arquivo `_config/project.js` 
   modificando apenas o valor da constante `PROJECT_NAME`
- basta copiar uma pasta que exista em modules
- mude seu nome para o nome do módulo **NO SINGULAR**
- abra o arquivo `config.module.js`
  + adicione (o nome das )suas funções específicas em `organelles`
- abra o arquivo `molecular.structure.js`
  + adicione o nome dos campos dessa Entidade

```js
const name = require('./../../_config/module/getName')(__filename)
const organelles = [
  'findByFilter',
  'findByIdPopulate',
  'findAllPopulate'
]
const molecule = {
  structure: require('./molecular.structure')
}
const organism = { name, organelles }
const DNA = { organism, molecule }

module.exports = require('./../../_factories/module')(DNA)
```

```js
module.exports = [
  'name',
  'description',
  'vagas',
  'owner',
  'employes',
  'created_at'
]
```

**Todos os módulos são gerados com suas rotas para uma API de CRUD com as seguintes funções automaticamente: `['create', 'find', 'findOne', 'findById' ,'update', 'remove']`**. Mais as definidas na configuração do seu módulo.

## Átomos / Campos

Precisamos apenas adicionar o nome do campo desejado no *Array* da estrutura da molécula(Schema), porém se esse campo ainda não existir em `_atoms` você deverá criar.

```js
const CONFIG = require('./../_config/atoms')(__filename)
const DEFAULT = {
  ATOM_NAME: CONFIG.ATOM_NAME,
  VALIDATE: false,
  labels: {
    'pt-br': 'nome',
    'en': 'name',
  }
}
const PROPS = {
  type: String,
  // required: true
}

const atomConfig = Object.assign({}, DEFAULT, PROPS)

const Atom = require('./../_factories/atom')(atomConfig)

module.exports = Atom
```