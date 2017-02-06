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

Basicamente você **NUNCA** irá iniciar **NADA** com um arquivo novo, **SEMPRE** irá abrir um já existente e deve salva-lo com outro nome e aí sim colocar sua lógica.

Existem apenas 3 pastas onde você poderá criar arquivos novos:

- _atoms
- _organelles
- _quarks

**NUNCA mexa nos arquivos dentro de:**

- _factories
- _hadrons

Sobrando a pasta de `modules` a qual armazena os módulos que usarão os módulos atômicos


Caso você ainda não esteja habituado com esses termos de Física Quântica (quarks, hadrons), Química


## Arquitetura

Para facilitar a visualização dessa arquitetura montei esse simples Diagrama de Venn, onde podemos ver que o *Organism* é composto de:

- *Molecule*
- *Organelle*

A *Organelle* é a função que será executada quando houver uma requisição em uma rota, sua resposta será devolvida pelo *Ribosome*.

A *Molecule* é a definição da estrutura dos campos (*Atoms*) os quais são validados pelos *Quarks*.


![](http://i.imgur.com/zZQpbBN.png)


> Ficou *bão*?

![](http://1.bp.blogspot.com/-3wXsbwuVzDY/T7OKmrAFXpI/AAAAAAAABCU/YJt1jCVahI8/s640/AreYouFuckingKiddingMe.png)

> **Por acaso você é louco???**




> Sim, mas isso não vem ao caso. Posso explicar-lhe o porquê dessa nomenclatura, acompanhe-me na minha viagem.

**Tudo começou com o ...**


### ATOM

![atomo](http://cacm.acm.org/system/assets/0001/3040/090613_iStock_Gold-Atom.large.jpg?1476779479&1378475075)



**Inicialmente questionei-me:**

> Sempre uso o campo `name` em vários *Schemas/Molecules* **por que não modularizar essa PORRA???**

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

Eu nomeei de Átomo a configuração de `PROPS` e de Hádron o objeto de `VALIDATE`.

> **Suissa por que raios você chamou de Hádron?**


> Hádron, em Física de Partículas, é uma partícula composta, formada por um estado ligado de quarks.

*fonte: https://pt.wikipedia.org/wiki/H%C3%A1dron*


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

**Entretanto se todos os ATOMS tiverem sempre apenas 1 HADRON todos eles seriam o Hidrogênio!**


### Molecule

![molécula da cafeína](https://s-media-cache-ak0.pinimg.com/originals/ad/5b/b0/ad5bb0ad27f4917ad6912049fa6f1800.png)

Como eu disse anteriormente que a *Molecule* é uma agregação dos *Atoms* vamos criar um exemplo para o módulo de *User*:


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

> Percebeu que apenas criamos a estrutura mas não o *Schema* com o `mongoose`? Quis fazer dessa forma para podermos reutilizar a mesma estrutura de campos com outras *libs* e também outros bancos. Logo mais quero adicionar suporte ao *[Sequelize]()*.

> **Explicarei mais adiante como esses módulos irão se transformar em *Schema* e *Model* do `mongoose`**.



### Organism

> **Antes de tudo não esqueça que ainda estamos vendo apenas o conceito de cada parte, pois o que faz essa arquitetura ser toda automatizada de verdade são suas *FACTORIES* que geram as estruturas específicas de forma dinâmica.**

![celula](https://bam.files.bbci.co.uk/bam/live/content/zgqd2hv/large)

O *ORGANISM* que criamos pode ser comparado à uma célula, onde a mesma é gerada por um *DNA* que contém a sua própria configuração a qual inclui da sua *MOLECULE* também.

Comparando ao que estamos acostumados esse módulo seria um *Controller* que utiliza um *Model*, logo será ele que possuíra as funções que serão executadas em cada rota, essas funções eu nomeei de: *ORGANELLES*.

Porém não criamos essas funções diretamente em cada *ORGANISM*, em vez disso criamos cada uma em um módulo separado que irá receber esse *ORGANISM* para daí sim executar a função, bom vamos ver um exemplo:

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

Nessa arquitetura as *ORGANELLES* precisam receber qual *ORGANISM* receberá essa função que será executada em alguma rota, por isso essa parte:


```js

module.exports = (Organism) => 
  (req, res) => { ... }

```

Isso só funciona porque **TODOS** os *ORGANISMS* são criados a partir de um *Model*, logo todos possuem as mesmas funções disponíveis no `mongoose`. Com isso conseguimos criar funções genéricas que podem ser reutilizadas em **qualquer** *ORGANISM*.