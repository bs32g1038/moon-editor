# Moon Editor

## 介绍

**Moon Editor** —— 一个漂亮，轻量级的 web 富文本编辑器，配置方便，使用简单。支持 IE10+ 浏览器。

[![Netlify Status](https://api.netlify.com/api/v1/badges/96c5de0b-8f68-4acb-ae8f-c135a1367488/deploy-status)](https://app.netlify.com/sites/compassionate-bassi-984db1/deploys)

- 预览: [http://editor.lizc.net/](http://editor.lizc.net/ "moon editor")

![moon-editor](https://raw.githubusercontent.com/bs32g1038/moon-editor/master/doc/images/screenshot-1.jpg)

同时支持:

-   React
-   Vue
-   支持浏览器端直接调用
-   支持中英文转换

## 使用

```javascript
MoonEditor({
    locale: 'zh_cn', // zh_cn or en
    isImageBase64: true,  // 当为true时，编辑器不会执行上传服务器的动作
    isImageExtensions: true, // 当为false时，编辑器不会开启图片的拓展支持，比如说修改图片尺寸
    uploadServer: {
        url: 'http://127.0.0.1:3000/upload',
        method: 'post'
    },
    content: `
        <h2>
        基于tiptap的编辑器,
        </h2>
        <p>
        这是一个开箱即用，可灵活配置，漂亮的编辑器.
        </p>
        <pre><code>body { display: none; }</code></pre>
        <ul>
        <li>
            我是一个无序列表
        </li>
        <li>
            这是我的子元素
        </li>
        </ul>
        <blockquote>
        这款编辑器实在太棒了，我叫它做月亮编辑器 👏👏😎😎
        <br />
        – bs32g1038
        </blockquote>
        <br />
    `,
    onChange: function(html){
        console.log(html)
    }
});
```

## 运行 demo

-   下载源码 `https://github.com/bs32g1038/moon-editor.git`
-   安装或者升级最新版本 node（最低`v8.x.x`）
-   进入目录，安装依赖包 `cd moon-editor && npm install`
-   安装包完成之后，运行`npm run dev`
-   打开浏览器访问[http://localhost:8080/](http://localhost:8080/)

### 提问

-   直接在 [github issues](https://github.com/bs32g1038/moon-editor/issues) 提交问题

## 关于作者

-   关注作者的博客 - 《[个人博客](http://www.lizc.net)》
