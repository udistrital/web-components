const fs = require('fs-extra');
const concat = require('concat');

build = async () =>{
    const files = [
        './dist/webcomponents/runtime.js',
        './dist/webcomponents/polyfills.js',
        // './dist/angular-web-components/es2015-polyfills.js',
        // './dist/angular-web-components/scripts.js',
        './dist/webcomponents/main.js'
      ];
      await concat(files, 'web-components.js');
}
build();