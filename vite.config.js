// @ts-check
const reactPlugin = require('vite-plugin-react')
const path = require('path');

/**
 * @type { import('vite').UserConfig }
 */
const config = {
  jsx: 'react',
  alias: {
    '/@/': path.resolve(__dirname, 'src/')
  },
  plugins: [reactPlugin]
}

module.exports = config
