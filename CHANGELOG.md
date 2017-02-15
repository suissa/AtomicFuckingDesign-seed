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

> Te lembra algo?


```js

reactions.filter( getEnzymes ).map( catalyze ).reduce( toProduct )

```



> **E agora?**


![](http://i2.kym-cdn.com/entries/icons/original/000/008/798/Too_Easy_2.png)
 

Após essa introdução básica vamos entender como a Enzima trabalha:


 > As enzimas convertem uma substância, chamada de substrato, noutra denominada produto, 
 > e são extremamente específicas para a reação que catalisam. Isso significa que, em geral, uma 
 > enzima catalisa um e só um tipo de reacção química. Consequentemente, o tipo de enzimas encontradas numa célula determina o tipo de metabolismo que a célula efetua.


```js

module.exports = (Organism) => 
  (req, res) => {
    const substrate = {}
    const enzyme = __filename.split(`_organelles/`)[1].split('.js')[0]
    const convertToProduct = require(`./ribossomos/success-200-json`)(res)
    const inhibitor = require(`./ribossomos/error-json`)(res)
    const catalyze = require(`./../_enzymes/${enzyme}`)

    return catalyze( Organism, substrate )
                                .then( convertToProduct )
                                .catch( inhibitor )
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
