const fs = require('fs');
const esprima = require('esprima');

// Read the JavaScript file
fs.readFile('./src/serviceWorkerRegistration.js',
    'utf8', (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    // Parse the JavaScript code
    const ast = esprima.parseScript(data, { range: true });

    // Count the number of anonymous functions
    let count = 0;

    // Traverse the abstract syntax tree (AST)
    traverseAST(ast, (node) => {
        if (node.type === 'FunctionExpression'
            || (node.type === 'ArrowFunctionExpression'
                && !node.id)) {
            // Check for FunctionExpression (regular anonymous function) or ArrowFunctionExpression without a name
            count++;
        }
    });

    console.log(`Number of anonymous functions: ${count}`);
});

// Helper function to traverse the AST
function traverseAST(node, visitor) {
    visitor(node);
    for (const key in node) {
        if (node.hasOwnProperty(key)) {
            const child = node[key];
            if (typeof child === 'object' && child !== null) {
                if (Array.isArray(child)) {
                    child.forEach((arrayChild) => {
                        traverseAST(arrayChild, visitor);
                    });
                } else {
                    traverseAST(child, visitor);
                }
            }
        }
    }
}
