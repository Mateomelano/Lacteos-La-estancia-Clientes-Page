import { src, dest, watch, series } from 'gulp'
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
import cleanCSS from 'gulp-clean-css'
import rename from 'gulp-rename'

const sass = gulpSass(dartSass)


// compila SCSS -> CSS minificado (una línea) a build/css/app.css + sourcemap
export function css() {
  return src('src/scss/layout/main.scss', { sourcemaps: true }) // <-- tu entrada
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())              // minifica a una sola línea
    .pipe(rename('app.css'))       // nombre de salida
    .pipe(dest('build/css', { sourcemaps: '.' }))
}

// watch
export function dev() {
  watch('src/scss/**/*.scss', css)
}

export default series( css, dev)
