const webpack = require('webpack');
const config = require('../webpack.config.js');
const compiler = webpack(config.map(obj => Object.assign({}, obj, {
    debug: false,
    devtool: null,
    plugins: [],
    output: Object.assign({}, obj.output, { path: './' })
})));

compiler.run((err, stats) => {
    console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
});
