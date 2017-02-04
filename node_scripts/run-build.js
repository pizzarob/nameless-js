const webpack = require('webpack');
const config = require('../webpack.config.js');
const configs = config.map(obj => Object.assign({}, obj, {
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: true,
        }),
    ],
    output: Object.assign({}, obj.output, { path: './' })
}));

const compiler = webpack(configs);

compiler.run((err, stats) => {
    console.log(stats.toString({
        chunks: false, // Makes the build much quieter
        colors: true
    }));
});
