const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const NODE_ENV = process.env.NODE_ENV || 'development';

console.log('NODE_ENV =', NODE_ENV);

const PATHS = {
    bookList: path.join(__dirname, 'front_end', 'static', 'js', 'BookList', 'BookList.js'),
    build: path.join(__dirname, 'front_end', 'bundles', 'js')
};

let config = {
    devtool: 'cheap-module-source-map',

    entry: {
        bookList: PATHS.bookList,
    },

    output: {
        path: PATHS.build,
        filename: "[name]_bundle.js"
    },

    watch: process.argv.indexOf('--watch') !== -1,
    watchOptions: {
        aggregateTimeout: 100
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(NODE_ENV)
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'es2016'],
                    plugins: []
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.png$/,
                loader: "url-loader?limit=100000"
            },
            {
                test: /\.jpg$/,
                loader: "file-loader"
            },
            {
                test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url-loader'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            }
        ]
    }
};

// Production
if (NODE_ENV === 'production') {
    config.plugins.push(
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: {
                    reserved: [
                        'Buffer',
                    ]
                }
            },
            parallel: true
        })
    );
}

module.exports = config;