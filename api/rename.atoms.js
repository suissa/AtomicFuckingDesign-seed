var fs = require('fs');

const ATOMS_PATH = '_atoms/'
// fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));

const removeAtom = (file, i) => file.split('atom-')[1]
// const removeConfig = (file, i) => console.log('removeConfig', file)
const removeConfig = (file, i) => file.split('-config.js')[0]
// const renameFile = (file, i) => console.log('renameFile', file)
const renameFile = (file, i) => fs
                                  .createReadStream(ATOMS_PATH + 'atom-' + file + '-config.js')
                                  .pipe(fs.createWriteStream(ATOMS_PATH + file + '.js'))

const files = fs
                .readdirSync(ATOMS_PATH)
                .filter(file => (file.includes('-config') ) )
                .map(removeAtom)
                .map(removeConfig)
                .map(renameFile)

console.log('files', files)