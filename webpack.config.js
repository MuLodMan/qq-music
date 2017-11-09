
module.exports = {
  entry: {app:'./javascripts/app.js',
  },
  output: {
    filename: 'dist/[name].js'
  },
  devtool: 'source-map',
  watch:true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
      ,{
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings 
        }, {
            loader: "css-loader", // translates CSS into CommonJS 
            options:{
              root:'..',
              url:false
            }
        }, {
            loader: "less-loader", // compiles Less to CSS
           
        }]
      }
    ]
  }
}