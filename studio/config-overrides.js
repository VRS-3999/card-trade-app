const { override, fixBabelImports, addLessLoader } = require('customize-cra');
const path = require('path');
const overrides = require('./src/styles/antd-variable-overrides.js');

module.exports = override(
    fixBabelImports('import', {
        libraryName: 'antd',
        libraryDirectory: 'es',
        style: true,
    }),
    addLessLoader({
        paths: [path.resolve(__dirname, 'node_modules'), path.resolve(__dirname, 'src/styles')],
        javascriptEnabled: true,
        modifyVars: overrides
    })
);