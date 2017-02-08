# Atomic FUCKING Design seed

> Antes de tudo, indico esse livro para que vocë possa entender essa nomenclatura.

![uma breve história do tempo](https://i1.zst.com.br/images/uma-breve-historia-do-tempo-capa-comum-9788580576467-photo44272988-12-29-d.jpg)

> Brinks! Mas indico o livro fortemente porque ele é do **CARALHO**!

Arquitetura modular e atômica criada no [Be MEAN]() para facilitar a vida dos programadores **vagabundos** como eu.

> Por que ficar copiando e colando código toda vez que irá iniciar um projeto?

Pensando na minha preguiça de velho modularizei **tudo** que podia para facilitar minha vida e a de vocês.

> Quanto mais você fizer, menos terá que fazer no futuro.

> **Como isso tio Suissa?**

Pense comigo: quantas vezes na sua vida você usou o campo `name`?

Cheguei num limite de não aceitar refazer mais nenhum código e percebi diversos padrōes neles, fui refatorando para deixa-los o mais genérico possível e de uma forma onde tudo que é criado será um módulo que poderá ser reutilizado em **qualquer outra parte do sistema.**

Por exemplo:

> O campo `name` é um módulo atômico que pode ser reutilizado em qualquer outro módulo que o necessite, como também em qualquer outro sistema que você fizer.

> Ou seja, quanto mais sistemas você fizer menos terá que fazer.


**Para você ter uma ideia de como está essa arquitetura atual veja [esse meu pequeno exemplo em vídeo](https://www.youtube.com/watch?v=q3403lWy6ZU&t=1s).**

[![](http://i.imgur.com/h2PxjWG.png)](https://www.youtube.com/watch?v=q3403lWy6ZU&t=1s)

## Ideia 

Essa arquitetura atômica foi baseada na minha arquitetura de Atomic Design Behavior do frontend, porém nessa eu fui longeeeeee.

Basicamente você **NUNCA** iniciará **NADA** com um arquivo novo, **SEMPRE** abrirá um já existente e deverá salva-lo com outro nome, para aí sim escrever sua lógica.

Existem apenas 3 pastas onde você poderá criar arquivos novos:

- _atoms
- _ORGANELLEs
- _quarks

**NUNCA mexa nos arquivos dentro de:**

- _factories
- _hadrons

Sobra apenas a pasta de `modules` a qual armazena os módulos que usarão os módulos atômicos.


Caso você ainda não esteja habituado com esses termos de Física Quântica (*quarks*, *hadrons*), Química (*atom*, *MOLECULE*) e Biologia (*ORGANELLE*, *ribosome*) não se preocupe, explicarei nessa documentação.


## Arquitetura

Para facilitar a visualização dessa arquitetura montei esse simples Diagrama de Venn onde podemos ver que o *Organism* é composto de:

- *MOLECULE*
- *ORGANELLE*

A *ORGANELLE* é a função que será executada quando houver uma requisição em uma rota, sua resposta será devolvida pelo *Ribosome*.

A *MOLECULE* é a definição da estrutura dos campos (*Atoms*) os quais são validados pelos *Quarks*.


![](http://i.imgur.com/zZQpbBN.png)


> Ficou *bão*?

![](http://1.bp.blogspot.com/-3wXsbwuVzDY/T7OKmrAFXpI/AAAAAAAABCU/YJt1jCVahI8/s640/AreYouFuckingKiddingMe.png)

> **Por acaso você é louco???**


.

> Sim, mas isso não vem ao caso. 
> 
> Explicar-lhe-ei o porquê dessa nomenclatura. Acompanhe-me na minha viagem...

**Tudo começou com o ...**


### ATOM

![atomo](http://cacm.acm.org/system/assets/0001/3040/090613_iStock_Gold-Atom.large.jpg?1476779479&1378475075)



**Inicialmente questionei-me:**

> Sempre uso o campo `name` em vários *Schemas/MOLECULEs* **por que não modularizar essa PORRA???**

Vamos analisar como é o campo `name` no *Schema* do Mongoose:

```js

const schema = {
  name: {
    type: String,
    required: [true, 'name is required']
    validate: {
      validator: (v) => /[a-zA-Z]/.test(v)
      },
      message: '{VALUE} its not only letters!'
    }
  }
}

```

Na minha lógica separei em duas partes:

```js

const ATOM_NAME = 'name'

const PROPS = { 
  type: String
  required: [true, 'name is required']
}

const VALIDATE = {
  validate: {
    validator: (v) => /[a-zA-Z]/.test(v)
    },
    message: '{VALUE} its not only letters!'
  },
}

const schema = {
  [ATOM_NAME]: {
    PROPS,
    VALIDATE
  }
}

```

Eu nomeei de *ATOM* a configuração de `PROPS` e de *HADRON* o objeto `VALIDATE`.

> **Suissa por que raios você chamou de Hádron?**


.


> Hádron, em Física de Partículas, é uma partícula composta, formada por um estado ligado de quarks.


*fonte: [https://pt.wikipedia.org/wiki/H%C3%A1dron](https://pt.wikipedia.org/wiki/H%C3%A1dron)*


Então vamos analisar nosso objeto:

```js

const VALIDATE = {
  validate: {
    validator: (v) => /[a-zA-Z]/.test(v)
    },
    message: '{VALUE} its not only letters!'
  },
}

```

Mesmo o Hádron sendo formado por 3 Quarks, nesse caso teremos apenas 2:

- validator
- message

Ou seja, vamos atomizar:



```js

module.exports = (v) => /[a-zA-Z]/.test(v)

```

```js

module.exports = '{VALUE} its not only letters!'

```

> Agora você já advinhou né?

> SIM! Unindo esses 2 quarks em uma estrutura formamos um hádron, podendo ser próton ou nêutron, mas não vamos falar disso agora.


```js
const HADRON = {
  validate: {
    validator: require('../_quarks/onlyLetters')
    },
    message: require('../_quarks/onlyLettersMessage')
  },
}

```

Agora voltando ao nosso *Schema*, que agora virou *MOLECULE* pois esse módulo é um agregado de *ATOMS*:

```js

module.exports = {
  type: String,
  required: [true, 'name is required'],

}

```

Porém além da sua definição ainda temos sua validação e sua mensagem de erro, a qual também devemos deixar traduzível, por isso importamos apenas a definição

```js
// _atoms/name
const name = require('../_atoms/name')
const validate = require('../_hadrons/name')
 
const ATOM = Object.assign({}, name, validate)

module.exports = ATOM
```

> Até aí foi...

![suave na nave](http://geradormemes.com/media/created/mn5fmi.jpg)

Agora vamos subir um pouco na nossa arquitetura e criar o que comumente conhecemos como *Schema*, lembrando que começamos do **quântico**:

```
1 ATOM possui 1 HADRON 
1 HADRON possui 2 QUARKS

1 QUARK de validação
1 QUARK de mensagem

1 HADRON de validação do ATOM
1 ATOM com suas configurações e seu HADRON

// nota: pensei em modificar essa parte da config do ATOM
// para virar 1 QUARK
```

**Escrevendo essa documentação notei que o módulo de configuração do ATOM também poderia ser 1 QUARK, com isso o HADRON de cada ATOM realmente teria 3 QUARKS.**

**Entretanto se todos os ATOMS sempre tiverem apenas 1 HADRON todos eles seriam iguais ao núcleo do Hidrogênio!**


### MOLECULE

![molécula da cafeína](https://s-media-cache-ak0.pinimg.com/originals/ad/5b/b0/ad5bb0ad27f4917ad6912049fa6f1800.png)

Como eu disse anteriormente que a *MOLECULE* é uma agregação dos *Atoms*, vamos criar um exemplo para o módulo de *User*:


```js
// _atoms/name
const name = require('../_atoms/name')
const username = require('../_atoms/username')
const email = require('../_atoms/email')
const password = require('../_atoms/password')
const created_at = require('../_atoms/created_at')
const updated_at = require('../_atoms/updated_at')

const MOLECULE = {
  name,
  username,
  email,
  password,
  created_at,
  updated_at
}

module.exports = MOLECULE
```

> Percebeu que apenas criamos a estrutura mas não o *Schema* com o `mongoose`? 
> 
> Eu quis fazer dessa forma para podermos reutilizar essa mesma estrutura de campos com outras *libs* e também outros bancos. Logo mais quero adicionar suporte ao *[Sequelize](http://docs.sequelizejs.com/en/v3/)*.


**Explicarei mais adiante como esses módulos irão se transformar em *Schema* e *Model* do `mongoose`**.



### Organism

> **Antes de tudo não esqueça que ainda estamos vendo apenas o conceito de cada parte, pois o que faz essa arquitetura ser toda automatizada de verdade são suas *FACTORIES* que geram as estruturas específicas de forma dinâmica.**

![celula](http://www.estudopratico.com.br/wp-content/uploads/2014/11/organelas-celulares-quais-sao-e-suas-funcoes.jpg)

O *ORGANISM* que criamos pode ser comparado a uma célula, onde a mesma é gerada 
por um *DNA* que contém sua própria configuração a qual inclui a da sua *MOLECULE* também.



### ORGANELLE


> Em biologia celular, organelas, organelos, ou ainda organitos, ("pequenos órgãos") são compartimentos delimitados por membrana que têm papeis específicos a desempenhar na função global de uma célula. As organelas trabalham de maneira integrada, cada uma assumindo uma ou mais funções celulares.



*fonte: [https://pt.wikipedia.org/wiki/Organelo](https://pt.wikipedia.org/wiki/Organelo)*
  

Comparando com o que estamos acostumados esse módulo seria um *Controller* que utiliza um *Model*, logo será ele o responsável pelas funções que serão executadas em cada rota, essas funções eu nomeei de: *ORGANELLES*.

Porém não criamos essas funções diretamente em cada *ORGANISM*, em vez disso criamos cada uma em um módulo separado que irá receber esse *ORGANISM* para daí sim executar a função.


Vamos ver um exemplo:


```js

module.exports = (Organism) => 
  (req, res) => {
    const query = req.body
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    
    return Organism.create(query)
                              .then(success)
                              .catch(error)
  }

```

Nessa arquitetura a *ORGANELLE* precisa receber um *ORGANISM* que receberá essa função, a qual será executada em alguma rota, por isso essa parte:


```js

module.exports = (Organism) => 
  (req, res) => { ... }

```

Isso só funciona porque **TODOS** os *ORGANISMS* são criados a partir de um *Model*, portanto todos possuem as mesmas funções disponíveis no `mongoose`. 


Com esses **módulos atômicos** conseguimos criar funções genéricas o suficiente para que sejam reutilizadas em **qualquer** *ORGANISM*.


### RIBOSOME

São as funções que irão trabalhar o resultado da *ORGANELLE*.

**DEPOIS EXPLICO MELHOR**


## Project

Está na hora entender como tudo isso funciona como um Sistema Web.

Iniciaremos pelo `app.js` que é o módulo no nosso servidor Web, utilizando [Express]():

```js

const db = require('./_config/db')
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const compress = require('compression')
const favicon = require('serve-favicon')

app.use(express.static(path.join(__dirname, '/public')));

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(compress()) // Compress response data with gzip
  // app.use(favicon(__dirname + '/favicon.ico'))

// Pego os módulos
const MODULES_PATH = __dirname+'/modules'
const modules = require('./_config/module/get.modules.js')(MODULES_PATH)
const api = {}

/* Cria as rotas dinamicamente a partir dos módulos */
const getRoutes = require('./_config/routes/get.routes')
const createRoutes = require('./_config/routes/create.routes')(app)

modules 
  .map(getRoutes)
  .reduce(createRoutes, app)

app.get('/ping', (req, res, next) => res.send('pong') )

app.listen(port, () => {
  console.log('---------------------------------------------------------------------------')
  console.log('Express server listening on port ' + port)
  console.log('env = ' + app.get('env') +
    '\n__dirname = ' + __dirname +
    '\nprocess.cwd = ' + process.cwd())
  console.log('---------------------------------------------------------------------------')
})

```

Pela lógica vamos começar pelo Banco de Dados, o qual importamos logo na primeira linha:

```js

const db = require('./_config/db')

```

É nesse módulo que você deve definir o nome do seu banco de dados, como também as funçōes que serão executadas nos eventos da conexão:

```js

const DB_NAME = 'db-ead-test'
const HOST = 'localhost'

mongoose.connect(`mongodb://${HOST}/${DB_NAME}`)
mongoose.Promise = require('bluebird')

const db = mongoose.connection

db.on('error', (err) => console.log('Erro de conexao.', err) )
db.on('open', () => console.log('Conexão aberta.') )
db.on('connected', (err) => console.log('Conectado na base: ', DB) )
db.on('disconnected', (err) => console.log('Desconectado') )

module.exports = db

```

### Detalhando carregamento dos módulos

A parte que mais me interessa explicar é essa:

```js

// Pego os módulos
const MODULES_PATH = __dirname+'/modules'
const modules = require('./_config/module/get.modules.js')(MODULES_PATH)
const api = {}

/* Cria as rotas dinamicamente a partir dos módulos */
const getRoutes = require('./_config/routes/get.routes')
const createRoutes = require('./_config/routes/create.routes')(app)

modules 
  .map(getRoutes)
  .reduce(createRoutes, app)

```

Vejamos o conteúdo do módulo importado:

```js

// _config/module/get.modules.js
const fs = require('fs')
const path = require('path')

module.exports = (MODULES_PATH) => 
  fs.readdirSync(MODULES_PATH)
    .filter( (file) => (file.startsWith('_') || file.startsWith('.'))
                        ? false
                        : fs.statSync( path.join(MODULES_PATH, file) )
                            .isDirectory()
            )

```

Detalhando um pouco, essa função `fs.readdirSync(MODULES_PATH)`  retorna um *Array*, 
com o nome dos arquivos que estão na pasta `MODULES_PATH`


```js

// _config/routes/get.routes
const MODULES_PATH = './../../modules/'

module.exports = (module, i) => {
  
  let path = '/api/' + module.toLowerCase()
  if (!path.endsWith('s')) path += 's'
  
  console.log('return', { 
    path, 
    module: MODULES_PATH + module 
  })  
  return { 
    path, 
    module: MODULES_PATH + module 
  }
}

```

```js

// _config/routes/create.routes
module.exports = (app) => (app, route) => 
  app.use(route.path, require(route.module))

```

