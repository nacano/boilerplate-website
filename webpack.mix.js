/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path')
const glob = require('glob')
const fs = require('fs')
const StylelintPlugin = require('stylelint-webpack-plugin')
const mix = require('laravel-mix')
require('laravel-mix-clean')
require('laravel-mix-ejs')

const srcDir = 'resources'
const staticDir = 'static'
const distDir = 'dist'

const contentsJson = require('./resources/data/contents.json')
const globalData = {
  $data: contentsJson,
  $rootPath: path.resolve(__dirname, 'resources/views'),
  $partials: path.resolve(__dirname, 'resources/views/partials') + '/',
  $layouts: path.resolve(__dirname, 'resources/views/layouts') + '/',
  $timestamp: Date.now(),
}

// Disable mix-manifest.json
Mix.manifest.refresh = (_) => void 0

// Mix Webpack Override
const ASSET_PATH = process.env.ASSET_PATH || '/'
mix
  .setPublicPath('dist/')
  .clean()
  .webpackConfig({
    module: {
      rules: [
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'eslint-loader',
          exclude: /node_modules/,
          options: {
            fix: true,
          },
        },
        {
          test: /\.scss/,
          loader: 'import-glob-loader',
        },
      ],
    },
    plugins: [
      new StylelintPlugin({
        fix: true,
      }),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: ASSET_PATH,
    },
  })
  .js(`${srcDir}/assets/js/app.js`, `${distDir}/assets/js/bundle.js`)
  .sass(`${srcDir}/assets/css/styles.scss`, `${distDir}/assets/css/styles.css`, {
    sassOptions: {
      outputStyle: 'compressed',
    },
  })
  .options({
    postCss: [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        grid: true,
      }),
      require('css-mqpacker')(),
      require('css-declaration-sorter')({
        order: 'smacss',
      }),
    ],
  })
  .ejs(`${srcDir}/views/**/*.ejs`, `${distDir}`, globalData, {
    base: `${srcDir}/views/pages`,
    // rmWhitespace: true,
    partials: [`${srcDir}/views/partials`, `${srcDir}/views/layouts`],
  })
  .copyDirectory(glob.sync(`${staticDir}`), `${distDir}`)
  .then(() => {
    const removeFilePattern = '(.gitkeep|README.md)'
    glob.sync(`./${distDir}/**/+${removeFilePattern}`, { dot: true }).map((file) => {
      fs.unlinkSync(file)
    })
  })
  .browserSync({
    proxy: false,
    server: 'dist/',
    files: [`${distDir}/**/*.{css,js,html,php}`],
  })

if (mix.inProduction()) {
  mix.options({
    cssNano: {
      // discardComments: {removeAll: true},
    },
  })
}
