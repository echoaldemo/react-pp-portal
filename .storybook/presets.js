module.exports = [
  {
    name: '@storybook/addon-docs/react/preset',
    options: {
      configureJSX: true,
      babelOptions: {
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
              corejs: '3',
              targets: {
                ie: '11'
              }
            }
          ]
        ],
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              pragmaFrag: 'React.Fragment'
            },
            'storybook-transform-jsx'
          ]
        ]
      },
      sourceLoaderOptions: null
    }
  }
]
