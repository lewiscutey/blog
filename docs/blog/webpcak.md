---
title: 一文速览Webpack
date: '2019/06/30 17:00:56'
type: post
tag: webpcak
meta:
  -
    name: description
    content: 一篇文章大致了解webpack
  -
    name: keywords
    content: webpack
---

>[Webpack](https://www.webpackjs.com/)是一个打包模块化**JavaScript**的工具，在**Webpack**里一切文件皆模块，通过**Loader**转换文件，通过**Plugin**注入钩子，最后输出由多个模块组合成的文件。**Webpack**专注于构建模块化项目，称为模块打包机。

<!-- more -->

![](https://user-gold-cdn.xitu.io/2019/6/29/16ba38af21c6301e?w=436&h=198&f=gif&s=98193)
## 1. 核心概念
#### entry
入口，Webpack执行构建的第一步将从entry开始，可抽象成输入；
```
module.exports = {
  entry: './main.js'
};
```

#### output
输出结果，在Webpack经过一系列处理并得到最终想要的代码后输出结果；
```
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist');
  }
};
```
#### loader
模块转换器，用于将模块的原内容按照需求转换成新内容；
```
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist');
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?minimize'],
      }
    ]
  }
};
```
#### plugins
扩展插件，在Webpack构建流程中的特定时机注入扩展逻辑，来改变构建结果或我们想做的事情；
```
module.exports = {
  entry: './main.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, './dist');
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loaders: ExtractTextPlugin.extract({
          use: ['css-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      fliename: `[name]_[contenthash:8].css`,
    })
  ]
};
```
#### module
模块，在Webpack里一切皆模块，一个模块对应一个文件。Webpack会从配置的entry开始递归找出所有依赖的模块；

#### chunk
代码块，一个chunk由多个模块组合而成，用于代码合并与分割；


**总结： Webpack在启动后会从Entry里配置的Module开始，递归解析Entry依赖的所有Module。每找到一个Module，就会根据配置的Loader去找出对应的转换规则，对Module进行转换后，再解析出当前Module依赖的Module。这些模块会以Entry为单位进行分组，一个Entry及其所有依赖的Module被分到一个组也就是一个Chunk。最后Webpack会将所有Chunk转换成文件输出，在整个流程中，Webpack会在恰当的时机执行Plugin里定义的逻辑。**

## 2. 基本配置
#### 1. Entry

* context

Webpack在寻找相对路径的文件时会以context为根目录，context默认为当前所在的工作目录，**注意context必须是一个绝对路径的字符串**。
```
module.exports = {
  context: path.resolve(__dirname, 'app'),
};
```

* Entry类型

| 类型     | 例子       | 含义 |
| ------------ |:-------------|:-------------|
|String | './main.js' | 入口模块的文件路径，可以是相对路径 |
|Array | ['./main.js', './app.js'] | 入口模块的文件路径，可以是相对路径 |
|Object | {a: './main.js', b: './app.js'} | 配置多个入口，每个入口生成一个chunk |

* chunk的名称

chunk的名称和entry的配置有关，如果entry是一个String或Array，只会生成一个chunk；如果entry是一个Object，就会生成多个chunk，名称为Object中的key。

* 配置动态Entry

如果不确定有多少个页面入口，可以设置为一个函数动态的返回entry配置；
```
// 同步函数
entry: () => {
  return {
    a: './page1/index',
    b: './page2/index'
  }
}
// 异步函数
entry: () => {
  return new Promise( (resolve) => {
    resolve({
      a: './page1/index',
      b: './page2/index'
    })
  })
}
```

#### 2. Output

* filename

filename是配置输出的文件名称，为string类型，如果只有一个输出文件可以写死为bundle.js,但是有多个输出时可以借助模板变量`[name].js`，常用的变量包括：
| 变量明晨  | 含义 |
| ------------ |:-------------|:-------------|
|id | Chunk的唯一标识，默认从0开始 |
|name | Chunk的名称 |
|hash | Chunk的唯一标识的Hash值,[hash:8]代表取8位Hash值，默认是20位 |
|chunkhash | Chunk内容的Hash值，取值同上 |

* chunkFilename

用于指定在运行过程中生成的Chunk在输出时的文件名称，常见场景为使用CommonChunkPlugin;支持和filename一致的内置变量；

* path

配置输出文件的本地目录，为string类型的绝对路径,支持字符串模板，内置变量只有一个Hash；
```
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist_[hash]')
  }
};
```

* publicPath

配置发布到线上资源的URL前缀，为string类型的相对路径，默认为'',也支持字符串模板，内置变量只有一个Hash；
```
module.exports = {
  output: {
    filename: '[name]_[chunkhash:8].js',
    publicPath: 'https://XX.cdn.com/static/' 
  }
};
```

* crossOriginLoading

Webpcak输出的部分代码块可能需要异步加载，是通过JSONP方式实现的，所以可以在`<script>`标签中设置crossorigin属性，常用来获取异步加载的脚本执行时的详细错误信息。
| crossorigin属性值  | 含义 |
| ------------ |:-------------|:-------------|
|anonymous(默认) | 在加载此脚本资源时**不会**带上用户的cookie |
|use-credentials | 在加载此脚本资源时**会**带上用户的cookie |

* LibraryTarget和library

当用Webpack去构建一个可以被其他模块导入使用的库时，需要用到LibraryTarget和library，它们通常搭配在一起使用，推荐使用**Rollup**来构建基础库；

    LibraryTarget配置以何种方式导出库，常用的有var/this/commonjs/window/global等；
    
    Library配置导出库的名称，配合LibraryTarget一起使用；

* LibraryExport

配置为要导出的模块中哪些子模块需要被导出，它只有在output.libraryTarget被设置为commonjs或者commonjs2时使用才有意义；
```
// 某模块源代码
export const a = 1;
export default b = 2;

// 如果在output.libraryExport设置为a；那么将构建输出的代码和使用方法将变成以下内容：
// Webpack输出的代码
module.export = lib_code['a'];
// 使用库的方法
require('library-name') === 1;
```

#### 3. Module
* 配置Loader

rules配置模块的读取和解析规则，通常用来配置Loader。类型为数组，数组里的每一项都描述了如何处理部分文件，每一项大致有如下三种方式来完成；

1. 条件匹配： 通过**test、include、exclude**三个配置项来选中Loader要处理的文件；
2. 应用规则： 对选中的文件通过**use**配置项来应用Loader，也可以是一个，也可以是按照从后往前的顺序一组Loader，同时可以分别向Loader传入参数；
3. 重要顺序： 一组Loader的默认顺序是从右往左执行的，通过**enforce**选项可以将其中一个Loader放在最前（**pre**）或最后（**post**）；
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          },
          enforce: 'post'
        }],
        include: path.resolve(__dirname, 'src'),
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        exclude: path.resolve(__dirname, 'node_modules')
      }
    ]
  }
};
```

* noParse

该可选配置项可以让Webpack忽略对部分没采用模块化的文件的递归解析和处理，从而提高构建性能，类型为RegExp、[RegExp]、Function中的一种，**注意被忽略的文件里不能包含import、require、define等模块化语句**，不然会导致在浏览器中无法执行该模块化语句；
```
// 正则形式
noParse: /jquery|chartjs/
// 函数形式
noParse: (content) => {
  return /jquery|chartjs/.test(content);
}
```

* parser

该配置项可以精确到语法层面，让Webpack只解析对应的模块化文件；
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: path.resolve(__dirname, 'src'),
        parser: {
          amd: false,
          commonjs: true,
          requirejs: false,
          harmony: true
        }
      }
    ]
  }
};
```

#### 4. Resolve

* alias
该配置项通过别名来将原导入路径映射成一个新的导入路径；
```
module.exports = {
  resolve: {
    alias: {
      @components: './src/common/components',
      @assets: './src/common/assets'
    }
  }
};
```

* mainFields

有一些第三方模块会针对不同的环境提供几份代码，例如分别提供ES5和ES6两份代码，Webpack会根据mainFields的配置去决定优先采用哪份代码，如果想优先采用ES6的代码，则可以这样配置：
```
mainFields: ['jsnext:main', 'browser', 'main'],
```

* extensions

在导入语句没带文件后缀时，Webpack会自动带上后缀尝试访问文件是否存在，默认是：
```
extensions: ['.js', '.json'],
```
如果我们想让Webpack优先使用typescript文件，则可以这样配置：
```
extensions: ['.ts', '.js', '.json']
```

* modules

配置Webpack去哪些目录下寻找第三方模块，有时候我们项目中的大量模块会放在common下面，则可以这样去配置：
```
modules: ['./src/common', 'node_modules']
```
* descriptionFiles

该配置项是描述第三方模块的文件名称，也就是package.json文件，默认如下：
```
descriptionFiles: ['package.json']
```
* enforceExtension

如果resolve.enforceExtension为true，则所有导入语句都必须带后缀，如import  './main.js';
* enforceModuleExtension

和resolve.enforceExtension作用类似，**专门针对node_modules下的模块生效**，因为第三方模块大部分是不带后缀的，如果resolve.enforceExtension设置为true了，需要把resolve.enforceModuleExtension设为false来兼容第三方模块;

#### 5. Plugin

Plugin的配置很简单，plugins接收一个数组，数组中的每一项都是一个Plugin的实例，Plugin的参数通过构造函数传入；
```
module.exports = {
  plugins: [
    new CommonChunkPlugin({
      name: 'common',
      chunks: ['a', 'b']
    })
  ]
};
```

#### 6. DevServer

* hot 

开启模块热替换功能，在不刷新整个页面的情况下，通过用新模块替换老模块来做到实时预览；
* inline

用于配置是否将这个代理客户端自动注入将运行在页面中的chunk里，默认自动注入；

-- 如果开启inline，则devserver会在构建变化后的代码时通过代理客户端控制网页刷新；

-- 如果关闭inline，则devserver会通过iframe的方式去运行要开发的网页，在构建完变化后的代码时，会通过刷新iframe来实现实时预览，这时需要去http://localhost:8080/webpack-dev-server/ 实时预览自己的网页；

* historyApiFallback

用于方便的开发使用了HTML5的History API的单页应用，总是返回同一个html文件，浏览器会从URL里解析出当前页面的状态，从而显示对应的界面；

* contentBase

用来配置devserver HTTP服务器的文件根目录，在默认情况下为当前的执行目录，通常是项目的根目录，所以在一般情况下不必设置；

* headers

可以在http响应中注入一些http响应头，使用如下：
```
module.exports = {
  devServer: {
    headers: {
      'x-cookie': 12345
    }
  }
};
```

* host

用于配置devServer服务监听的地址，如果想让局域网的其他设备访问自己的本地服务，则可以在启动devserver时带上参数--host 0.0.0.0;

* port

用于配置devServer服务监听的端口，默认使用8080端口，如果80端口被其他程序占用则依次+1类推；

* allowedHosts

配置一个白名单列表，只有http请求的host在该列表中才会正常返回；

* disableHostCheck

配置是否关闭用于DNS重新绑定的http请求的host检查，devserver默认只接受本地的请求，关闭后可以接收来自任意host的请求；

* https

devsever默认使用http服务，在某些情况下需要使用https服务时，可以开启此配置，此时devsever会自动为我们在本地生成一份https证书，这时需要重启服务，如HTTP2和Service Worker就必须运行在https上；

* clientLogLevel

配置客户端的日志等级，会影响我们在浏览器控制台里看到的内容，默认为info级别，即输出所以类型（none/error/warning/info）的日志;

* compress

配置是否启用Gzip压缩，为Boolean类型，默认为false；

* open

用于在devserver启动且第一次构建完成时，自动用系统默认浏览器打开我们开发的页面，还提供了openPage配置项来打开指定URL的页面；

#### 7. 其它

* Target

target配置可以让Webpack构建除针对不同运行环境的代码，常见的有：
| target值  | 含义 |
| ------------ |:-------------|:-------------|
|web| 针对浏览器（默认），所有代码都集中在一个文件里 |
|node | 针对nodejs,使用require语句加载chunk代码
|async-node | 针对nodejs,异步加载chunk代码 |
|webworker | 针对webworker |
|electron-mian | 针对Electron主线程 |
|electron-render | 针对Electron渲染线程 |

* Devtool

配置Webpack如何生成Source Map，默认值是false即不生成，若想构建出的代码生成Source Map方便调试，则可以这样配置：
```
module.exports = {
  devtool: 'source-map'
};
```

* Watch和WatchOptions

Webpack支持监听文件更新，在文件发生变化时重新编译，监听模式默认是关闭的,如想打开则配置为：
```
module.exports = {
  watch: true
};
```
**在使用devserver时，监听模式默认开启；**除此之外，还可以灵活的控制监听模式；
```
module.exports = {
  watch: true,
  watchOptions: {
    // 不监听的文件或文件夹，支持正则匹配
    ignored: /node_modules/,
    // 监听到变化后会等300ms再去执行，防抖
    // 默认是300ms
    aggregateTimeout: 300,
    // 判断文件是否发生变化通过不停地询问系统指定文件有没有变化
    // 默认每秒询问1000次
    poll: 1000
  }
};
```

* Externals

用于告诉Webpack要构建的代码中使用了哪些不用被打包的模块，也就是说这些模版是外部环境提供的，Webpack在打包时可以忽略它们；
```
module.exports = {
  externals: {
    jquery: 'jQuery'
  }
};
```

* ResloveLoader

用来告诉Webapck如何去寻找Loader，该配置项常用来加载本地的Loader，默认配置如下：
```
module.exports = {
  resolveLoader: {
    modules: ['node_modules'],
    extensions: ['js', 'json'],
    mainFields: ['loader', 'main']
  }
};
```

## 3. 性能优化

### 优化开发体验：

#### 1. 缩小文件搜索范围

#### 2. 使用DllPlugin

#### 3. 使用HappyPack

#### 4. 使用ParallelUglifyPlugin

#### 5. 使用自动刷新

#### 6. 开启模块热替换

### 优化输出质量：

#### 1. 压缩代码

#### 2. CDN加速

#### 3. 抽取公共代码

#### 4. 使用Tree Shaking

#### 5. 使用Code Spliting

#### 6. 开启Scope Hoisting

#### 7. 输出分析

## 4. 常用Loader

## 文件
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`raw-loader`](https://www.webpackjs.com/loaders/raw-loader) | 加载文件原始内容（utf-8）
| [`val-loader`](https://www.webpackjs.com/loaders/val-loader) | 将代码作为模块执行，并将 exports 转为 JS 代码
| [`url-loader`](https://www.webpackjs.com/loaders/url-loader) | 像 file loader 一样工作，但如果文件小于限制，可以返回 [data URL](https://tools.ietf.org/html/rfc2397)
| [`file-loader`](https://www.webpackjs.com/loaders/file-loader) | 将文件发送到输出文件夹，并返回（相对）URL


## JSON
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`json-loader`](https://www.webpackjs.com/loaders/json-loader) | 加载 [JSON](http://json.org/)文件（默认包含）
| [`json5-loader`](https://www.webpackjs.com/loaders/json5-loader) | 加载和转译 [JSON 5](https://json5.org/)文件


## 转换编译(Transpiling)
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`script-loader`](https://www.webpackjs.com/loaders/script-loader) | 在全局上下文中执行一次 JavaScript 文件（如在 script 标签），不需要解析
| [`babel-loader`](https://www.webpackjs.com/loaders/babel-loader) | 加载 ES2015+ 代码，然后使用 [Babel]('https://babeljs.io/) 转译为 ES5
| [`buble-loader`](https://github.com/sairion/buble-loader) | 使用 [Bublé]('https://buble.surge.sh/guide/) 加载 ES2015+ 代码，并且将代码转译为 ES5
| [`traceur-loader`](https://github.com/jupl/traceur-loader) | 加载 ES2015+ 代码，然后使用 [Traceur](https://github.com/google/traceur-compiler#readme)转译为 ES5
| [`ts-loader`](https://github.com/TypeStrong/ts-loader) 或 [`awesome-typescript-loader`](https://github.com/s-panferov/awesome-typescript-loader) | 像 JavaScript 一样加载 [TypeScript]('https://www.typescriptlang.org/)2.0+
| [`coffee-loader`](https://www.webpackjs.com/loaders/coffee-loader) | 像 JavaScript 一样加载 [CoffeeScript]('http://coffeescript.org/)


## 模板(Templating)
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`html-loader`](https://www.webpackjs.com/loaders/html-loader) | 导出 HTML 为字符串，需要引用静态资源
| [`pug-loader`](https://www.webpackjs.com/loaders/html-loader) | 加载 Pug 模板并返回一个函数
| [`jade-loader`](https://www.webpackjs.com/loaders/html-loader) |  加载 Jade 模板并返回一个函数
| [`markdown-loader`](https://www.webpackjs.com/loaders/html-loader) |  将 Markdown 转译为 HTML
| [`react-markdown-loader`](https://github.com/javiercf/react-markdown-loader) | 使用 markdown-parse parser(解析器) 将 Markdown 编译为 React 组件
| [`posthtml-loader`](https://www.webpackjs.com/loaders/html-loader) |  使用 [PostHTML]('https://github.com/posthtml/posthtml) 加载并转换 HTML 文件
| [`handlebars-loader`](https://www.webpackjs.com/loaders/html-loader) |  将 Handlebars 转移为 HTML
| [`markup-inline-loader`](https://github.com/asnowwolf/markup-inline-loader) | 将内联的 SVG/MathML 文件转换为 HTML。在应用于图标字体，或将 CSS 动画应用于 SVG 时非常有用。

## 样式
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`style-loader`](https://www.webpackjs.com/loaders/style-loader) | 将模块的导出作为样式添加到 DOM 中
| [`css-loader`](https://www.webpackjs.com/loaders/css-loader) | 解析 CSS 文件后，使用 import 加载，并且返回 CSS 代码
| [`less-loader`](https://www.webpackjs.com/loaders/less-loader) | 加载和转译 LESS 文件
| [`sass-loader`](https://www.webpackjs.com/loaders/sass-loader) | 加载和转译 SASS/SCSS 文件
| [`postcss-loader`](https://www.webpackjs.com/loaders/postcss-loader) | 使用 [PostCSS](http://postcss.org)加载和转译 CSS/SSS 文件
| [`stylus-loader`](https://www.webpackjs.com/loaders/postcss-loader) | 加载和转译 Stylus 文件


## 清理和测试(Linting && Testing)
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`mocha-loader`](https://www.webpackjs.com/loaders/mocha-loader) | 使用 [mocha]('https://mochajs.org/') 测试（浏览器/NodeJS）
| [`eslint-loader`](https://github.com/webpack-contrib/eslint-loader) | PreLoader，使用 [ESLint]('https://eslint.org/) 清理代码
| [`jshint-loader`](https://www.webpackjs.com/loaders/jshint-loader/) | PreLoader，使用 [JSHint]('http://jshint.com/about/') 清理代码
| [`coverjs-loader`](https://www.webpackjs.com/loaders/coverjs-loader) | PreLoader，使用 [CoverJS]('https://github.com/arian/CoverJS') 确定测试覆盖率


## 框架(Frameworks)
| Loader名称     | 功能描述       |
| ------------ |:-------------|
| [`vue-loader`](https://vue-loader.vuejs.org/) | 加载和转译 [Vue 组件]('https://vuejs.org/v2/guide/components.html')
| [`polymer-loader`](https://github.com/webpack-contrib/polymer-webpack-loader) | 使用选择预处理器(preprocessor)处理，并且 `require()` 类似一等模块(first-class)的 Web 组件
| [`angular2-template-loader`](https://github.com/TheLarkInn/angular2-template-loader) | 加载和转译 [Angular]('https://angular.io/') 组件

## 5. 常用Plugin

| Plugin名称     | 功能描述       |
| ------------ |:-------------|
| [`AggressiveSplittingPlugin`](https://www.webpackjs.com/plugins/aggressive-splitting-plugin) | 将原来的 chunk 分成更小的 chunk
| [`BabelMinifyWebpackPlugin`](https://www.webpackjs.com/plugins/babel-minify-webpack-plugin) | 使用 [babel-minify](https://github.com/babel/minify)进行压缩
| [`BannerPlugin`](https://www.webpackjs.com/plugins/banner-plugin)                 | 在每个生成的 chunk 顶部添加 banner
| [`CommonsChunkPlugin`](https://www.webpackjs.com/plugins/commons-chunk-plugin)    | 提取 chunks 之间共享的通用模块
| [`CompressionWebpackPlugin`](https://www.webpackjs.com/plugins/compression-webpack-plugin) | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务
| [`ContextReplacementPlugin`]('https://www.webpackjs.com/plugins/context-replacement-plugin') | 重写 `require` 表达式的推断上下文
| [`CopyWebpackPlugin`](https://www.webpackjs.com/plugins/copy-webpack-plugin) | 将单个文件或整个目录复制到构建目录
| [`DefinePlugin`](https://www.webpackjs.com/plugins/define-plugin)           | 允许在编译时(compile time)配置的全局常量
| [`DllPlugin`](https://www.webpackjs.com/plugins/dll-plugin)                 | 为了极大减少构建时间，进行分离打包
| [`EnvironmentPlugin`](https://www.webpackjs.com/plugins/environment-plugin) | [`DefinePlugin`](./define-plugin) 中 `process.env` 键的简写方式。
| [`ExtractTextWebpackPlugin`](https://www.webpackjs.com/plugins/extract-text-webpack-plugin) | 从 bundle 中提取文本（CSS）到单独的文件
| [`HotModuleReplacementPlugin`](https://www.webpackjs.com/plugins/hot-module-replacement-plugin) | 启用模块热替换(Enable Hot Module Replacement - HMR)
| [`HtmlWebpackPlugin`](https://www.webpackjs.com/plugins/html-webpack-plugin)          | 简单创建 HTML 文件，用于服务器访问
| [`I18nWebpackPlugin`](https://www.webpackjs.com/plugins/i18n-webpack-plugin)          | 为 bundle 增加国际化支持
| [`IgnorePlugin`](https://www.webpackjs.com/plugins/ignore-plugin)                     | 从 bundle 中排除某些模块
| [`LimitChunkCountPlugin`](https://www.webpackjs.com/plugins/limit-chunk-count-plugin) | 设置 chunk 的最小/最大限制，以微调和控制 chunk
| [`LoaderOptionsPlugin`](https://www.webpackjs.com/plugins/loader-options-plugin)      | 用于从 webpack 1 迁移到 webpack 2
| [`MinChunkSizePlugin`](https://www.webpackjs.com/plugins/min-chunk-size-plugin)       | 确保 chunk 大小超过指定限制
| [`NoEmitOnErrorsPlugin`](https://www.webpackjs.com/plugins/no-emit-on-errors-plugin)  | 在输出阶段时，遇到编译错误跳过
| [`NormalModuleReplacementPlugin`](https://www.webpackjs.com/plugins/normal-module-replacement-plugin) | 替换与正则表达式匹配的资源
| [`NpmInstallWebpackPlugin`](https://www.webpackjs.com/plugins/npm-install-webpack-plugin) | 在开发时自动安装缺少的依赖
| [`ProvidePlugin`](https://www.webpackjs.com/plugins/provide-plugin)                       | 不必通过 import/require 使用模块
| [`SourceMapDevToolPlugin`](https://www.webpackjs.com/plugins/source-map-dev-tool-plugin)  | 对 source map 进行更细粒度的控制
| [`EvalSourceMapDevToolPlugin`](https://www.webpackjs.com/plugins/eval-source-map-dev-tool-plugin)  | 对 eval source map 进行更细粒度的控制
| [`UglifyjsWebpackPlugin`](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin)      | 可以控制项目中 UglifyJS 的版本
| [`ZopfliWebpackPlugin`](https://www.webpackjs.com/plugins/zopfli-webpack-plugin/)          | 通过 node-zopfli 将资源预先压缩的版本

>更多第三方**Loader**和**Plugin**，查看 [awesome-webpack]('https://github.com/webpack-contrib/awesome-webpack/blob/master/README.md') 列表。