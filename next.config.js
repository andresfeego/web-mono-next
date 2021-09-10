const path = require('path')
const withImages = require('next-images')


module.exports = {
  ...withImages(),
  sassOptions: {
    includePaths: [path.join(__dirname, './Components/Inicialized')],
    prependData: `@import "variables.scss";`,
    
    
  },
  future: {
    webpack5: true,
  }
  
}
