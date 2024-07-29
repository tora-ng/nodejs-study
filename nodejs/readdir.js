var testFolder = 'data';
var fs = require('fs');

fs.readdir(testFolder, (err, fileList) => {
    console.log('fileList: ', fileList); // 배열로 출력됨 [ 'CSS', 'HTML', 'javaScript' ]
})