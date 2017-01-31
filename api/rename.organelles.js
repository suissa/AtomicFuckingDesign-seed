var fs = require('fs');

const PATH = '_organelles/'
// fs.createReadStream('test.log').pipe(fs.createWriteStream('newLog.log'));

const removeOrganelle = (file, i) => file.split('organelle-')[1]
// const renameFile = (file, i) => console.log('renameFile', file)
const renameFile = (file, i) => fs
                                  .createReadStream(PATH + 'organelle-' + file)
                                  .pipe(fs.createWriteStream(PATH + file))

const files = fs
                .readdirSync(PATH)
                .filter(file => (file.includes('organelle-') ) )
                .map(removeOrganelle)
                .map(renameFile)

// console.log('files', files)