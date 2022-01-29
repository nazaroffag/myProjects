//получаем имя папки проекта

import * as nodePath from "path";
const rootFolder = nodePath.basename(nodePath.resolve());

const buildFolder = `./dist`;
const srcFolder = `./src`;

export const path = {
  build: {
    html: `${buildFolder}/`,
    files: `${buildFolder}/files/`,
    css: `${buildFolder}/css/`,
    js: `${buildFolder}/js/`,
    images: `${buildFolder}/img/`,
    fonts: `${buildFolder}/fonts/`,
  },
  src: {
    // html: `${srcFolder}/*.html`,   // если собираем из html
    html: `${srcFolder}/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
    scss: `${srcFolder}/scss/style.scss`,
    js: `${srcFolder}/js/app.js`,
    images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp}`,
    svg: `${srcFolder}/img/**/*.svg`,
    svgicons: `${srcFolder}/svgicons/*.svg`,
  },
  watch: {
    // html: `${srcFolder}/**/*.html`, // если собираем из html
    html: `${srcFolder}/**/*.pug`,
    files: `${srcFolder}/files/**/*.*`,
    scss: `${srcFolder}/scss/**/*.scss`,
    js: `${srcFolder}/js/**/*.js`,
    images: `${srcFolder}/img/**/*.{jpg, jpeg, png, gif, webp, ico, svg}`,
  },
  clean: buildFolder,
  buildFolder: buildFolder,
  srcFolder: srcFolder,
  rootFolder: rootFolder,
  ftp: ``,
};
