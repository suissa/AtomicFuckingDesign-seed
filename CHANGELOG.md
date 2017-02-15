# Atomic FUCKING Design seed

Fiz uma pequena grande mudança nas *Organelles* para melhorar meu conceito biológico, 
dessa vez adicionei o conceito de *Enzyme* (enzima), o qual possui algumas características, 
que EU, achei deveras interessante.

Vamos iniciar nossa jornada pela Biologia conhecendo para que serve a enzima. 

![](https://ka-perseus-images.s3.amazonaws.com/7cfb71d72534e7c98b02fd1afc815a4100dccfcc.svg)

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