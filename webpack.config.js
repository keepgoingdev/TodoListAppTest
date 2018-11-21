const path = require('path');

module.exports = {
    mode: 'development',  
    entry: [ 
      './assets/js/test.js.coffee'
    ],
    output: {
      filename: 'main.js',
      path: path.resolve(__dirname, 'dist')
    },
    module: {
      rules: [
        {
          test: /\.coffee$/,
          use: [
            {
              loader: 'coffee-loader',
              options: { 
                transpile: {
                  presets: ['env']
                }
              }
            }
          ]
        }
      ]
    }
  }