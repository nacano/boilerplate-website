/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const StylelintPlugin = require('stylelint-webpack-plugin');
const mix = require('laravel-mix');
require('laravel-mix-clean');
require('laravel-mix-ejs');

const srcDir = 'resources';
const staticDir = 'static';
const distDir = 'dist';

const contentsJson = require(`./${srcDir}/data/contents.json`);
const globalData = {
  $data: contentsJson,
  $rootPath: path.resolve(__dirname, `${srcDir}/views`),
  $partials: path.resolve(__dirname, `${srcDir}/views/partials`) + '/',
  $layouts: path.resolve(__dirname, `${srcDir}/views/layouts`) + '/',
  $timestamp: Date.now(),
};

// Disable mix-manifest.json
Mix.manifest.refresh = (_) => void 0;

// Mix Webpack Override
const ASSET_PATH = process.env.ASSET_PATH || '/assets';
const BASE_PATH = process.env.BASE_PATH || '/';
const RESOURCES_PATH = {
  script: `${srcDir}/assets/js/app.js`,
  style: `${srcDir}/assets/css/styles.scss`,
};
const DIST_PATH = {
  script: `${distDir}${ASSET_PATH}/js/bundle.js`,
  style: `${distDir}${ASSET_PATH}/css/styles.css`,
};
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
      path: path.resolve(__dirname, `${distDir}`),
      publicPath: ASSET_PATH,
    },
  })
  .js(RESOURCES_PATH.script, DIST_PATH.script)
  .sass(RESOURCES_PATH.style, DIST_PATH.style, {
    sassOptions: {
      // outputStyle: '',
    },
  })
  .options({
    processCssUrls: false,
    postCss: [
      require('postcss-flexbugs-fixes'),
      require('autoprefixer')({
        grid: true,
      }),
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
    const removeFilePattern = '(.gitkeep|README.md)';
    glob.sync(`./${distDir}/**/+${removeFilePattern}`, { dot: true }).map((file) => {
      fs.unlinkSync(file);
    });
  })
  .browserSync({
    startPath: BASE_PATH,
    proxy: false,
    server: `${distDir}`,
    files: [`${distDir}/**/*.{css,js,html,php}`],
  });

if (mix.inProduction()) {
  mix.options({
    cssNano: {
      // discardComments: {removeAll: true},
    },
    // postCss: [require('css-mqpacker')()],
  });
}
