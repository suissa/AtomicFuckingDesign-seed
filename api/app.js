const db = require('./_config/db')
const express = require('express')
const app = express()
const port = process.env.PORT || 8000
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const cors = require('cors')
const compress = require('compression')
const favicon = require('serve-favicon')
// console.log('__dirname', __dirname)
const MODULES_PATH = __dirname+'/modules'
const modules = require('./_config/module/get.modules.js')(MODULES_PATH)
const api = {}

app.use(morgan('dev'))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())
app.use(compress()) // Compress response data with gzip
  // app.use(favicon(__dirname + '/favicon.ico'))


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

