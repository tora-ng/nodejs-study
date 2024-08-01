var fs = require('fs');

// readFileSync 결과: A B C
console.log('A');
var result = fs.readFileSync('syntax/sample.txt', 'utf-8');
console.log(result);
console.log('C');

// readFile 결과: A C B
console.log('A');
fs.readFile('syntax/sample.txt', 'utf-8', (err, result) => {
    console.log(result);
});
console.log('C');