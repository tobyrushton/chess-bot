const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
    entry: path.resolve(__dirname,'src/index.tsx'),
    externals: {
        fs: 'empty'
    },
    devtool: 'inline-source-map',
    mode: 'development',
    module: {
        rules: [
            {
                include: [path.join(__dirname)],
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                options: {
                    presets: ['@babel/preset-react'],
                },
            },
            {
                test: /\.wasm$/,
                loader: 'file-loader',
                type: 'javascript/auto',
            },
            {
                include: [path.join(__dirname, 'src')],
                test: /\.(ts|tsx)?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js', '.jsx', '.wasm'],
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'src/index.html')}), new NodePolyfillPlugin()],
}