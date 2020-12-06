# Webpack 4 - простая сборка проекта

[video](https://www.youtube.com/watch?v=MRlBKfGktwI)

Настройка простой сборки проекта с нуля с помощью webpack 4. В видео формируется понимание базовых приёмов работы с webpack.

```bash
npm init -y
npm i -D webpack webpack-cli
```

add to scripts:

```json
"build": "webpack --mode production",
"dev": "webpack --mode development"
```

if we run this command, webpack will throw error:

>  ERROR in main
> Module not found: Error: Can't resolve './src' in...

This happens because of webpack default config `src/index.js` file is defined, but really we hav not it.

```bash
mkdir src && touch src/index.js
```

now webpack compiles project

```bash
touch index.html
```

## Modules

allow split code into separate files.

```bash
touch src/some.js
```

```js
function sum(...numbers){
  let sum = 0
  for(let i = 0; i < numbers.length; i++) {
    sum += numbers[i]
  }
  return sum
}

function avg(...numbers){
  return sum(...numbers) / numbers.length
}

export default avg
```

`index.js`

```js
import avg from './some'

let hello = 'Hello World'
hello = hello.substr(0, 5)

console.log(avg(4,6,8));
console.log(hello)
```

`index.html`

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Webpack</title>
</head>
<body>
  <script src="dist/main.js"></script>
</body>
</html>
```

[time 24:40](https://www.youtube.com/watch?v=MRlBKfGktwI&t=1480s)

[time 26:30](https://www.youtube.com/watch?v=MRlBKfGktwI&t=1590s)

then make this:

```bash
npm i --save jquery
```

`index.js`

```js
import $ from 'jquery'
//
$('.title').html('some text')
```

`inex.html`

```html
<h1 class="title"></h1>
```

## Watching files

```bash
npm i -D webpack-dev-server
```

add script to `package.json`:

```
"watch": "webpack-dev-server --mode development --open",
```

## Introduction in webpack.config

```bash
npm i -D path
```

```bash
touch webpack.config.js
```

```js
let path = require('path')

let conf = {
  entry: './src/index.js', // entry file
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    publicPath: 'dist/' // this adds to result paths
  }
}

module.exports = conf
```

this is same as default settings and can be omitted.

[time 53:30](https://www.youtube.com/watch?v=MRlBKfGktwI&t=3210s)

## Babel

```bash
npm i -D babel-core babel-loader babel-preset-env babel-preset-stage-3
touch .babelrc
```

sometimes this can help...

```bash
npm i -D babel-loader@7
```



in `webpack.config` add:

```js
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }
  ]
}
```

## Source map

add to `webpack.config`

```js
devtool: 'eval-sourcemap'
```

this inserts source code in output file. increases size. To optimize this,

```js
module.exports = (env, options) => {
  let production = options.mode === 'production'
  conf.devtool = production
                 ? 'source-map' // can insert false
                 : 'eval-sourcemap'
  return conf
}
```

## CSS

```bash
mkdir src/css
touch src/css/style.css
```

```css
.title{
  color: red;
}
```

`index.js`

```js
import './css/style.css'
```

```bash
npm i -D style-loader css-loader
```

in `webpack.config ` in **rules**: 

```js
{
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
}
```

works fine!

## Bootstrap

```bash
npm i --save bootstrap
```

`index.js`

```js
import 'bootstrap/dist/css/bootstrap.min.css'
```

```bash
npm install --save-dev mini-css-extract-plugin
```

`webpack.plugin`

```js
plugins: [new MiniCssExtractPlugin()],
module: {
  rules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    },
    {
      test: /\.css$/,
      // use: ['style-loader', 'css-loader'],
      use: [MiniCssExtractPlugin.loader, 'css-loader'],
    }
  ]
},
```



[plugin page](https://github.com/webpack-contrib/mini-css-extract-plugin)

[time 1:30](https://www.youtube.com/watch?v=MRlBKfGktwI&t=5400s)