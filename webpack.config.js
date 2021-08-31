const path = require('path')
const { CleanWebpackPlugin } = require('clean - webpack - plugin')
module.exports = {
  mode: 'development',
  entry: './ src / main / index.tsx',
  output: {
    path: path.join(__dirname, 'public / js'),
    publicPath: '/ public / js',
  filename: 'bundle.js'
},
  resolve: {
  extensions: ['.ts', '.tsx', '.js', 'scss'],
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
  rules: [{
    test: /\.ts(x?)$/,
    loader: 'ts- loader',
    exclude: /node_modules/
},
{
  test: /\.scss$/,
    use: [{
      loader: 'style- loader'
}, {
  loader: 'css - loader',
    options: {
    modules: true
  }
}, {
  loader: 'scss - loader'
}]
}
]
},
devServer: {
  contentBase: './public',
  whiteToDisk: true,
    historyApiFallback: true
},
externals: {
  react: 'React',
  'react - dom': 'ReactDOM'
},
plugins: [
  new CleanWebpackPlugin()
]
}
