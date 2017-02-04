module.exports = (_file) => _file
                            .split('atom-')[1]
                            .split('-config.js')[0]
                            .toLowerCase()