const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
   mode: 'production',
   entry: './src/index.ts',
   devtool: 'inline-source-map',
   performance: {
      hints: false,
      maxEntrypointSize: 1000000,
      maxAssetSize: 1000000
   },

   devServer: {
      port: 9002,
      compress: true,
      hot: true,
      static: {
         directory: path.join(__dirname, 'dist')
      }
   },

   module: {
      rules: [
         {
            test: /\.tsx?$/,
            use: 'ts-loader',
            exclude: /node_modules/,
         },
         {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
         },
         {
            test: /\.(png|svg|jpg|jpeg)$/i,
            type: 'asset/resource'
         },
         {
            test: /\.html$/,
            use: ["html-loader"],
         },
         {
            test: /\.json$/,
            loader: 'json-loader'
         }

      ],
   },





   resolve: {
      extensions: ['.tsx', '.ts', '.js'],
   },
   output: {
      filename: 'script.js',
      path: path.resolve(__dirname, 'dist'),
   },
   plugins: [
      new htmlWebpackPlugin({
         title: 'Comments',
         template: './src/index.html'

      }),


      new CopyWebpackPlugin({
         patterns: [
            { from: 'src/jpg', to: 'jpg' },
            { from: 'src/png', to: 'png' },
            { from: 'src/svg', to: 'svg' },
            { from: 'src/css', to: 'css' },
         ]
      })
   ]

};
