module.exports = (Organism, query, {req, res}) => {

    let filtros = Object
                        .keys( query )
                        .map( el => ( Number.isNaN( parseInt( query[el] ) ) )
                                              ? {[el]: new RegExp(query[el].trim(), 'gi') }
                                              : {[el]: query[el]} )
                        .reduce((acc, cur) => Object.assign(acc, cur), {})

    delete filtros.page

    const limit = 20
    let page = (req.query.page) ? parseInt(req.query.page) : 0
    const skip = limit * parseInt(page)
    page += 1 

    console.log('req.query.page', req.query.page)
    console.log('filtros', filtros)
    console.log('limit', limit)
    console.log('skip', skip)

    const success = (data) => Organism
                                            .find(filtros)
                                              .count((err, total) => {
                                                // console.log('count', total)
                                                const pages = (total <= 20) ? 1 : Math.ceil(total / limit)
                                                data.push({pages, page})
                                                return res.json(data)  })
    // const success = (data) => res.json(data)
    const error = (err) => res.json(err)

    return Organism
                  .find(filtros)
                  .limit(limit)
                  .skip(skip)
                  .exec() 
}

