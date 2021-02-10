/* eslint-disable no-underscore-dangle */
import { src, dest } from 'gulp'
import uglify from 'gulp-uglify-es'
import cp from 'gulp-copy'

function compress() {
  return src('.cache/src/**/*.js').pipe(uglify()).pipe(dest('dist'))
}

function copy() {
  return src([
    'env.yaml',
    'src/**/*.yml',
    'src/**/*.json',
    'src/**/*.gql',
    'src/bin/*',
  ]).pipe(cp('./dist', { prefix: 1 }))
}

const _compress = compress
export { _compress as compress }
const _copy = copy
export { _copy as copy }
