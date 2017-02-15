# Atomic FUCKING BIO Design - 

Fiz uma pequena grande mudança nas *Organelles* para melhorar meu conceito biológico, 
dessa vez adicionei o conceito de *Enzyme* (enzima), o qual possui algumas características, 
que EU, achei deveras interessante.

Vamos iniciar nossa jornada pela Biologia conhecendo para que serve a enzima. 

![](https://ka-perseus-images.s3.amazonaws.com/7cfb71d72534e7c98b02fd1afc815a4100dccfcc.svg)

> Enzimas são grupos de substâncias orgânicas de natureza normalmente proteica 
> (existem também enzimas constituídas de RNA [1], as ribozimas), com atividade intra ou 
> extracelular que têm funções catalisadoras, catalisando reações químicas que, sem a sua presença, 
> dificilmente aconteceriam. 
> 
> Isso é conseguido através do abaixamento da energia de ativação necessária para que se dê uma 
> reação química, resultando no aumento da velocidade da reação e possibilitando o metabolismo 
> dos seres vivos. A capacidade catalítica das enzimas torna-as adequadas para aplicações industriais, 
> como na indústria farmacêutica ou na alimentar.

**Perceba como elas são importantes:**

> Em sistemas vivos, a maioria das reações bioquímicas dá-se em vias metabólicas, que são 
> sequências de reações em que o produto de uma reação é utilizado como reagente na reação 
> seguinte. Diferentes enzimas catalisam diferentes passos de vias metabólicas, agindo de forma 
> concertada de modo a não interromper o fluxo nessas vias.


Quero que você atenha-se a essa frase: 

> Diferentes enzimas catalisam diferentes passos de vias metabólicas, 
> agindo de forma concertada de modo a não interromper o fluxo nessas vias.`


Traduzindo isso para nós, programadores, podemos pensar nas enzimas como funções e 
nas vias metabólicas como as rotas da nossa API.


**Fazendo apenas um adendo,** analise essa frase: "o produto de uma reação é utilizado 
como reagente na reação seguinte"

Podemos exemplificar assim:

```js

const Reaction = ( reagent ) => react( reagent )

const product1 = Reaction( reagent )
const product2 = Reaction( product1 )
const product3 = Reaction( product2 )

// ...

```


> **E agora?**


![](http://i2.kym-cdn.com/entries/icons/original/000/008/798/Too_Easy_2.png)
 

Após essa introdução básica vamos entender como a Enzima trabalha:


 > As enzimas convertem uma substância, chamada de substrato, noutra denominada produto, 
 > e são extremamente específicas para a reação que catalisam. Isso significa que, em geral, uma 
 > enzima catalisa um e só um tipo de reacção química. Consequentemente, o tipo de enzimas 
 > encontradas numa célula determina o tipo de metabolismo que a célula efetua.


Podemos fazer a seguinte analogia: **se as enzimas convertem X em Y podemos dizer 
que ela é uma função (catalizadora).**


```js

const product = Enzyme.catalyze( Reaction( substrate ) )

```


> A atividade enzimática pode depender da presença de determinadas moléculas, 
> genericamente chamadas cofatores.


Vamos lembrar que fizemos uma analogia com as rotas, sendo assim essa função precisa ter a seguinte
assinatura dos parâmetros: `( req, res )`.


```js

module.exports = (Organism) => (req, res) => {

  const cofactors = { req, res }

}

```


Criamos a `const cofactors` com o `req` e `res` para que possamos injeta-los na Enzima.

Após esse pequeno esclarecimento acerca da Enzima podemos partir para nossa função de rota:

```js

module.exports = (Organism) => 
  (req, res) => {
    const query = {}
    const success = require('./ribossomos/success-200-json')(res)
    const error = require('./ribossomos/error-json')(res)
    
    return Organism.find(query)
                    .exec()
                    .then(success)
                    .catch(error)
  }

```


Primeira coisa que faremos é separar a Enzima desse código.

![](http://i.giphy.com/GmdFiZtdJtQty.gif)

> **CALMA!** 

> Juro que será mais fácil que mijar sentado.


```js
// _enzymes/find.js
module.exports = ( Organism, query ) => Organism.find( query ).exec()

```


> Viu? Indolor!


Ainda precisamos conhecer mais um conceito para podermos refatorar nossa função da rota.


> Determinadas substâncias, podem inibir a atividade de algumas enzimas, diminuindo-a ou 
> eliminando-a totalmente; são os chamados inibidores enzimáticos.


Como não queremos inibir a execução da Enzima iremos fazer uma analogia desse conceito 
com o *callback* de **erro** da *Promise* (`catch`). 

> Agora sim chegou **A HORA**!

Vamos refatorar a `_organelles/find.js` assim:


```js

module.exports = (Organism) => 
  (req, res) => {
    const substrate = {}
    const enzyme = `find`
    const convertToProduct = require(`./ribosomes/success-200-json`)(res)
    const inhibitor = require(`./ribosomes/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate, cofactors )
                                .then( convertToProduct )
                                .catch( inhibitor )
  }

```


Para facilitar o entendimento pense no seguinte: o `substrate` é nossa antiga `query`, pois é com 
esse valor que iremos gerar um `product` como resultado da reação.

Como o sucesso dessa reação será nosso produto, chamei ele de `convertToProduct` porque será 
utilizado no `then`, ficando: `then( convertToProduct )`. 

**Caso você não entenda essas simples palavras em Inglês dar-te-ei essa dica já!**

>**ESTUDE! Pois para um programador isso é obrigatório e não uma opção.**

*Traduzindo: então converta para produto*

Já sabemos que o *callback* de erro foi instanciado em `inhibitor`, sei que parece estranho 
nomear **tão diferentemente** o sucesso do erro, porém para esse contexto achei que foi a 
melhor solução, mas estou sempre aberto a sugestōes.

Você deve se indagar:

> Mas e a **porra** do `cofactors` você fez só de bonito?
>  
> - Não, fiz de lindo.

Ainda não usamos o `cofactors` pois a Enzima de *find* não precisou, mas vamos ver uma Enzima 
que precise: `findByFilter`.

```js

module.exports = (Organism) => (req, res) => {

    const substrate = req.query
    const cofactors = { req, res }
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribosomes/success-200-json`)(res)
    const inhibitor = require(`./ribosomes/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate, cofactors )
                                .then( convertToProduct )
                                .catch( inhibitor )
}
```

Agora apenas observe nossa Enzima:

```js

module.exports = (Organism, query, {req, res}) => {

    let filtros = Object
                        .keys( query )
                        .map( el => ( Number.isNaN( parseInt( query[el] ) ) )
                                              ? {[el]: new RegExp(query[el].trim(), 'gi') }
                                              : {[el]: query[el]} )
                        .reduce(( acc, cur ) => Object.assign( acc, cur ), {})

    return Organism
                  .find(filtros)
                  .limit(limit)
                  .skip(skip)
                  .exec() 
}

```

![](https://ka-perseus-images.s3.amazonaws.com/1d7e59bb1a3bfce307a001c2d4bbf763d0d11641.svg)


## Fontes

- [Enzyme](https://en.wikipedia.org/wiki/Enzyme)
- [Enzyme inhibitor](https://en.wikipedia.org/wiki/Enzyme_inhibitor)
- [Enzyme kinetics](https://en.wikipedia.org/wiki/Enzyme_kinetics)
- [Enzymes and the active site](https://www.khanacademy.org/science/biology/energy-and-enzymes/introduction-to-enzymes/a/enzymes-and-the-active-site)
- [Enzyme structure and function](https://www.khanacademy.org/test-prep/mcat/biomolecules/enzyme-structure-and-function/a/enzyme-structure-and-function)
- [Catalysis](https://en.wikipedia.org/wiki/Catalysis)
- [Substrate](https://en.wikipedia.org/wiki/Substrate_(chemistry))
- [Metabolism](https://en.wikipedia.org/wiki/Metabolism)
- [Metabolic pathway](https://en.wikipedia.org/wiki/Metabolic_pathway)


![](https://cdn.meme.am/cache/instances/folder230/47194230.jpg)
