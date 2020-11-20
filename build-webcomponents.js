const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
    const files = [
        './dist/angular-web-components/runtime.js',
        './dist/angular-web-components/polyfills.js',
        // './dist/angular-web-components/es2015-polyfills.js',
        // './dist/angular-web-components/scripts.js',
        './dist/angular-web-components/main.js'
      ];
      await concat(files, 'web-components.js');
}
build();