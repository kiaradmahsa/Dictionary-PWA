const fs = require('fs');
const esprima = require('esprima');
const code = fs.readFileSync('./src/service-worker.js', 'utf-8');

const ast = esprima.parseScript(code);
let totalParameters = 0;

function traverse(node) {
    if (node.type === 'ArrowFunctionExpression' && node.params) {
        totalParameters += node.params.length;
    }

    for (const key in node) {
        if (node[key] && typeof node[key] === 'object') {
            traverse(node[key]);
        }
    }
}

traverse(ast);

console.log('Total number of function parameters:', totalParameters);
