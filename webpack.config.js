const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/main/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  devServer: {
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
      alias: {
      '@': path.join(__dirname, 'src'),
      '@entities': path.join(__dirname, 'src/domain/entities'),
      '@usecases': path.join(__dirname, 'src/domain/usecases'),
      '@repositories': path.join(__dirname, 'src/data/repositories'),
      '@datasource': path.join(__dirname, 'src/data/datasource'),
      '@models': path.join(__dirname, 'src/data/models'),
      '@service': path.join(__dirname, 'src/service'),
      '@pages': path.join(__dirname, 'src/presentation/pages'),
      '@components': path.join(__dirname, 'src/presentation/components'),
      '@factories': path.join(__dirname, 'src/main/factories'),
      '@main': path.join(__dirname, 'src/main'),
    }
  },
  module: {
    rules: [
      {
        test: /\.js(x)?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
        options: {
          presets: [
            "@babel/preset-react",
            "@babel/preset-typescript",           
            "@babel/preset-env"
          ]
        }
      },
      {
        test: /\.ts(x)?$/,
        loader: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          {
            loader: 'scss-loader'
          },
          
          ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      filename: 'index.html'
    })
  ]
}
