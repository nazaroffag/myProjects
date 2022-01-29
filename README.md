Сборка GULP (pug, html, scss)
подключен swiper

---

npm install

npm run dev - в режиме разработки
npm run build - в продакшн-режиме
npm run svgSprive - создание спрайтов

Подключены модули:
"browser-sync": "^2.27.7",
"del": "^6.0.0",
"gulp": "^4.0.2",
"gulp-autoprefixer": "^8.0.0",
"gulp-clean-css": "^4.3.0",
"gulp-file-include": "^2.3.0",
"gulp-fonter": "^0.3.0",
"gulp-group-css-media-queries": "^1.2.2",
"gulp-if": "^3.0.0",
"gulp-imagemin": "^8.0.0",
"gulp-newer": "^1.4.0",
"gulp-notify": "^4.0.0",
"gulp-plumber": "^1.2.1",
"gulp-pug": "^5.0.0",
"gulp-rename": "^2.0.0",
"gulp-replace": "^1.1.3",
"gulp-sass": "^5.1.0",
"gulp-svg-sprite": "^1.5.0",
"gulp-ttf2woff2": "^4.0.1",
"gulp-version-number": "^0.2.4",
"gulp-webp": "^4.0.1",
"gulp-webp-html-nosvg": "^1.0.4",
"gulp-webpcss": "^1.1.1",
"sass": "^1.49.0",
"swiper": "^7.4.1",
"webp-converter": "^2.2.3",
"webpack": "^5.67.0",
"webpack-stream": "^7.0.0"

При установке на Mac (для исключения проблемы с копированием шрифтов) - найти gulp-fonter в папке node_modules, идете в dist->index.js, открываете и находите строчку: newFont.path = source.dirname + '\\' + source.stem + '.' + type;
Меняете "\\" на "/"
