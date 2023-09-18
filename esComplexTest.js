const escomplex = require('escomplex');
const fs = require('fs');
const filePath = './src/serviceWorkerRegistration.js';
const fileContents = fs.readFileSync(filePath, 'utf8');

const source = [{
    path: filePath,
    code: fileContents
}]
const options = {};
const result = escomplex.analyse(source, options);


console.log(result);
console.log(JSON.stringify(result, null, 2));