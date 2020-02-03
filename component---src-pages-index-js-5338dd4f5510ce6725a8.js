(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{141:function(n,t,e){"use strict";e.r(t),e.d(t,"query",function(){return z});var a=e(147),r=e.n(a),o=e(0),i=e.n(o),c=e(148),u=e(157),l=e(155),s=e(160),p=e(150),d=e(145),m=e(146);function f(){var n=r()(["font-size: 16px;"]);return f=function(){return n},n}function g(){var n=r()(["font-size: 24px;"]);return g=function(){return n},n}function h(){var n=r()(["font-size: 28px;"]);return h=function(){return n},n}function b(){var n=r()(["margin-bottom: 40px;"]);return b=function(){return n},n}function x(){var n=r()(["margin-bottom: 50px;"]);return x=function(){return n},n}function k(){var n=r()(["margin-bottom: 70px;"]);return k=function(){return n},n}var y=Object(d.d)(p.b).withConfig({displayName:"pages__HomepageTitle",componentId:"sc-6kvjaa-0"})(["margin-bottom:100px;"," ",""],m.a.tablet(k()),m.a.phone(x())),v=d.d.div.withConfig({displayName:"pages__Container",componentId:"sc-6kvjaa-1"})(["margin-bottom:60px;",' a{font-family:"Raleway",sans-serif;font-weight:900;font-size:36px;text-transform:uppercase;text-decoration:none;display:block;line-height:1;'," ","}"],m.a.tablet(b()),m.a.tablet(h()),m.a.phone(g())),w=d.d.p.withConfig({displayName:"pages__Date",componentId:"sc-6kvjaa-2"})(["margin:0 0 10px;font-size:14px;"]),E=d.d.p.withConfig({displayName:"pages__Summary",componentId:"sc-6kvjaa-3"})(["font-size:18px;",""],m.a.tablet(f()));t.default=function(n){var t=n.data;return i.a.createElement(u.a,null,i.a.createElement(l.a,{keywords:["matt perry, popmotion, react, pose, framer, framer motion, ui animation"]}),i.a.createElement(y,null,"A blog about motion & UI"),i.a.createElement(p.a,null,Object(s.b)(t).map(function(n){var t=Object(s.a)(n.node),e=t.id,a=t.title,r=t.date,o=t.excerpt;return i.a.createElement(v,{key:e},i.a.createElement(c.Link,{to:e},a),i.a.createElement(w,null,r),i.a.createElement(E,null,o))})))};var z="2090493397"},146:function(n,t,e){"use strict";e.d(t,"a",function(){return o});e(73),e(51),e(158);var a=e(145),r={desktop:992,tablet:768,phone:576},o=Object.keys(r).reduce(function(n,t){return n[t]=function(){return Object(a.c)(["@media (max-width:","em){","}"],r[t]/16,a.c.apply(void 0,arguments))},n},{})},148:function(n,t,e){"use strict";e.r(t),e.d(t,"graphql",function(){return f}),e.d(t,"StaticQueryContext",function(){return d}),e.d(t,"StaticQuery",function(){return m});var a=e(0),r=e.n(a),o=e(4),i=e.n(o),c=e(144),u=e.n(c);e.d(t,"Link",function(){return u.a}),e.d(t,"withPrefix",function(){return c.withPrefix}),e.d(t,"navigate",function(){return c.navigate}),e.d(t,"push",function(){return c.push}),e.d(t,"replace",function(){return c.replace}),e.d(t,"navigateTo",function(){return c.navigateTo});var l=e(149),s=e.n(l);e.d(t,"PageRenderer",function(){return s.a});var p=e(32);e.d(t,"parsePath",function(){return p.a});var d=r.a.createContext({}),m=function(n){return r.a.createElement(d.Consumer,null,function(t){return n.data||t[n.query]&&t[n.query].data?(n.render||n.children)(n.data?n.data.data:t[n.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function f(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}m.propTypes={data:i.a.object,query:i.a.string.isRequired,render:i.a.func,children:i.a.func}},149:function(n,t,e){var a;n.exports=(a=e(153))&&a.default||a},150:function(n,t,e){"use strict";e.d(t,"b",function(){return p}),e.d(t,"a",function(){return d});var a=e(147),r=e.n(a),o=e(145),i=e(146);function c(){var n=r()(["\n    h2 {\n      font-size: 24px;\n    }\n  "]);return c=function(){return n},n}function u(){var n=r()(["\n    > p:first-child {\n      font-size: 18px;\n    }\n\n    h2 {\n      font-size: 28px;\n    }\n\n    h3 {\n      font-size: 18px;\n    }\n  "]);return u=function(){return n},n}function l(){var n=r()(["\n    text-align: left;\n    font-size: 32px;\n  "]);return l=function(){return n},n}function s(){var n=r()(["font-size: 48px;"]);return s=function(){return n},n}var p=o.d.h1.withConfig({displayName:"bits__Title",componentId:"dkhe0b-0"})(["color:#32005c;font-size:72px;font-weight:900;letter-spacing:-1px;text-transform:uppercase;text-align:center;margin-bottom:50px;"," ",""],i.a.tablet(s()),i.a.phone(l())),d=o.d.div.withConfig({displayName:"bits__ContentContainer",componentId:"dkhe0b-1"})([""," "," ",""],function(n){var t=n.theme;return"\n  > * {\n    display: block;\n    margin: 0 auto;\n    max-width: 650px;\n  }\n\n  > p {\n    font-size: 18px;\n    margin-bottom: 25px;\n    line-height: 1.6;\n  }\n\n  > p:first-child {\n    font-size: 24px;\n    font-weight: 600;\n    line-height: 1.4;\n  }\n\n  > blockquote {\n    border-left: 2px solid "+t.main+";\n    padding: 20px;\n    background: #f0f0f0;\n    margin-bottom: 25px;\n    border-radius: 5px;\n  }\n\n  > ul, > ol {\n    margin-bottom: 25px;\n  }\n\n  h2, h3 {\n    color: "+t.secondary+";\n    text-transform: uppercase;\n    font-size: 36px;\n    margin: 50px auto 25px;\n  }\n\n  h3 {\n    font-size: 28px;\n  }\n\n  a {\n    text-decoration: none;\n  }\n\n  p code {\n    background: "+t.highlight+';\n    padding: 5px;\n    border-radius: 5px;\n  }\n\n  .gatsby-highlight {\n    margin-bottom 25px;\n    max-width: 700px;\n  }\n\n  /**\n  * xonokai theme for JavaScript, CSS and HTML\n  * based on: https://github.com/MoOx/sass-prism-theme-base by Maxime Thirouin ~ MoOx --\x3e http://moox.fr/ , which is Loosely based on Monokai textmate theme by http://www.monokai.nl/\n  * license: MIT; http://moox.mit-license.org/\n  */\n  code[class*="language-"],\n  pre[class*="language-"] {\n      -moz-tab-size: 2;\n      -o-tab-size: 2;\n      tab-size: 2;\n      -webkit-hyphens: none;\n      -moz-hyphens: none;\n      -ms-hyphens: none;\n      hyphens: none;\n      white-space: pre;\n      white-space: pre-wrap;\n      word-wrap: normal;\n      font-size: 16px;\n      text-shadow: none;\n  }\n\n  pre[class*="language-"],\n  :not(pre)>code[class*="language-"] {\n      background: '+t.dark+";\n      color: "+t.main+';\n  }\n  pre[class*="language-"] {\n      padding: 15px;\n      border-radius: 5px;\n      overflow: auto;\n  }\n\n  pre[class*="language-"] {\n      position: relative;\n  }\n  pre[class*="language-"] code {\n      white-space: pre;\n      display: block;\n  }\n\n  :not(pre)>code[class*="language-"] {\n      padding: 0.15em 0.2em 0.05em;\n      border-radius: .3em;\n      box-shadow: 1px 1px 0.3em -0.1em #000 inset;\n  }\n  .token.namespace {\n      opacity: .7;\n  }\n  .token.comment,\n  .token.prolog,\n  .token.doctype,\n  .token.cdata {\n      color: #6f705e;\n  }\n  .token.operator,\n  .token.boolean,\n  .token.number {\n      color: #a77afe;\n  }\n  .token.attr-name,\n  .token.string {\n      color: #FFDE4D;\n  }\n  .token.entity,\n  .token.url,\n  .language-css .token.string,\n  .style .token.string {\n      color: #FFDE4D;\n  }\n  .token.selector,\n  .token.inserted {\n      color: #a6e22d;\n  }\n  .token.atrule,\n  .token.attr-value,\n  .token.keyword,\n  .token.important,\n  .token.deleted {\n      color: '+t.action+";\n  }\n  .token.regex,\n  .token.statement {\n      color: #76d9e6;\n  }\n  .token.placeholder,\n  .token.variable {\n      color: #fff;\n  }\n  .token.important,\n  .token.statement,\n  .token.bold {\n      font-weight: bold;\n  }\n  .token.punctuation {\n      color: #bebec5;\n  }\n  .token.entity {\n      cursor: help;\n  }\n  .token.italic {\n      font-style: italic;\n  }\n\n  code.language-markup {\n      color: #f9f9f9;\n  }\n  code.language-markup .token.tag {\n      color: "+t.action+';\n  }\n  code.language-markup .token.attr-name {\n      color: #a6e22d;\n  }\n  code.language-markup .token.attr-value {\n      color: #FFDE4D;\n  }\n  code.language-markup .token.style,\n  code.language-markup .token.script {\n      color: #76d9e6;\n  }\n  code.language-markup .token.script .token.keyword {\n      color: #76d9e6;\n  }\n\n  /* Line highlight plugin */\n  pre[class*="language-"][data-line] {\n      position: relative;\n      padding: 1em 0 1em 3em;\n  }\n  pre[data-line] .line-highlight {\n      position: absolute;\n      left: 0;\n      right: 0;\n      padding: 0;\n      margin-top: 1em;\n      background: rgba(255, 255, 255, 0.08);\n      pointer-events: none;\n      line-height: inherit;\n      white-space: pre;\n  }\n  pre[data-line] .line-highlight:before,\n  pre[data-line] .line-highlight[data-end]:after {\n      content: attr(data-start);\n      position: absolute;\n      top: .4em;\n      left: .6em;\n      min-width: 1em;\n      padding: 0.2em 0.5em;\n      background-color: rgba(255, 255, 255, 0.4);\n      color: black;\n      font: bold 65%/1 sans-serif;\n      height: 1em;\n      line-height: 1em;\n      text-align: center;\n      border-radius: 999px;\n      text-shadow: none;\n      box-shadow: 0 1px 1px rgba(255, 255, 255, 0.7);\n  }\n  pre[data-line] .line-highlight[data-end]:after {\n      content: attr(data-end);\n      top: auto;\n      bottom: .4em;\n  }\n'},i.a.tablet(u()),i.a.phone(c()))},151:function(n,t,e){n.exports=e.p+"static/photo-of-matt-perry-78cf3c1b9af9e4daa9e56cc77b940835.jpg"},152:function(n){n.exports={data:{site:{siteMetadata:{title:"Inventing With Monster"}}}}},153:function(n,t,e){"use strict";e.r(t);e(33);var a=e(0),r=e.n(a),o=e(4),i=e.n(o),c=e(52),u=e(2),l=function(n){var t=n.location,e=u.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(c.a,Object.assign({location:t,pageResources:e},e.json))};l.propTypes={location:i.a.shape({pathname:i.a.string.isRequired}).isRequired},t.default=l},154:function(n,t,e){},155:function(n,t,e){"use strict";var a=e(156),r=e(0),o=e.n(r),i=e(4),c=e.n(i),u=e(159),l=e.n(u),s=e(148);function p(n){var t=n.description,e=n.lang,r=n.meta,i=n.keywords,c=n.title;return o.a.createElement(s.StaticQuery,{query:d,render:function(n){var a=t||n.site.siteMetadata.description;return o.a.createElement(l.a,{htmlAttributes:{lang:e},title:c||n.site.siteMetadata.title,titleTemplate:c?"%s | "+n.site.siteMetadata.title:"%s",meta:[{name:"description",content:a},{property:"og:title",content:c},{property:"og:description",content:a},{property:"og:type",content:"website"},{name:"twitter:card",content:"summary"},{name:"twitter:creator",content:n.site.siteMetadata.author},{name:"twitter:title",content:c},{name:"twitter:description",content:a},{name:"twitter:image",content:"/icons/icon-144x144.png"}].concat(i.length>0?{name:"keywords",content:i.join(", ")}:[]).concat(r)})},data:a})}p.defaultProps={lang:"en",meta:[],keywords:[]},p.propTypes={description:c.a.string,lang:c.a.string,meta:c.a.array,keywords:c.a.arrayOf(c.a.string),title:c.a.string},t.a=p;var d="1025518380"},156:function(n){n.exports={data:{site:{siteMetadata:{title:"Inventing With Monster",description:"Thoughts about web and user interface development, by Matt Perry.",author:"@mattgperry"}}}}},157:function(n,t,e){"use strict";var a=e(147),r=e.n(a),o=e(152),i=e(0),c=e.n(i),u=e(4),l=e.n(u),s=e(148),p=e(145),d=e(146);function m(){var n=r()(["font-size: 18px;"]);return m=function(){return n},n}function f(){var n=r()(["font-size: 24px;"]);return f=function(){return n},n}function g(){var n=r()(["margin-bottom: 30px;"]);return g=function(){return n},n}function h(){var n=r()(["margin-bottom: 50px;"]);return h=function(){return n},n}function b(){var n=r()(["margin-bottom: 70px;"]);return b=function(){return n},n}var x=p.d.header.withConfig({displayName:"header__Container",componentId:"sc-31ozxh-0"})(["margin-bottom:100px;"," "," ",""],d.a.desktop(b()),d.a.tablet(h()),d.a.phone(g())),k=p.d.h2.withConfig({displayName:"header__Title",componentId:"sc-31ozxh-1"})([""," a{"," ","}"],function(n){return"\n    a {\n      color: "+n.theme.main+";\n      text-decoration: none;\n      text-transform: uppercase;\n      font-size: 28px;\n    }\n  "},d.a.tablet(f()),d.a.phone(m())),y=function(n){var t=n.siteTitle;return c.a.createElement(x,null,c.a.createElement(k,null,c.a.createElement(s.Link,{to:"/"},t)))};y.propTypes={siteTitle:l.a.string},y.defaultProps={siteTitle:""};var v=y,w=e(150),E=e(151),z=e.n(E);function C(){var n=r()(["\n    width: 32px;\n    height: 32px;\n  "]);return C=function(){return n},n}var _=p.d.div.withConfig({displayName:"footer__Container",componentId:"r54yyk-0"})(["margin-top:40px;border-top:1px solid #eee;padding-bottom:20px;p{margin-bottom:10px;}"]),T=p.d.img.withConfig({displayName:"footer__Avatar",componentId:"r54yyk-1"})(["width:70px;height:70px;border-radius:50%;margin-right:20px;float:left;",""],d.a.phone(C())),M=function(){return c.a.createElement(w.a,{as:"footer"},c.a.createElement(_,null,c.a.createElement("h2",null,"About me"),c.a.createElement(T,{src:z.a,alt:""}),c.a.createElement("p",null,"Hey! I’m Matt Perry. I write"," ",c.a.createElement("a",{href:"https://framer.com/motion"},"Framer Motion")," and take the"," ",c.a.createElement("a",{href:"https://instagram.com/inventingwithmonster"},"occasional photo"),"."),c.a.createElement("p",null,c.a.createElement("a",{href:"https://twitter.com/mattgperry"},"Twitter")," |"," ",c.a.createElement("a",{href:"https://github.com/inventingwithmonster"},"Github"))))},I={background:"#fff",main:"#1fedcb",secondary:"#31005C",action:"#F5148C",highlight:"rgba(33, 237, 203, 0.2)",dark:"#333"};e(154);function j(){var n=r()(["padding: 10px;"]);return j=function(){return n},n}function q(){var n=r()(["padding: 20px;"]);return q=function(){return n},n}function S(){var n=r()(["\n  {","}\n"]);return S=function(){return n},n}var N=Object(p.b)(S(),function(n){var t=n.theme;return"\n    body {\n      padding: 10px;\n      background: linear-gradient(180deg, "+t.main+", "+t.secondary+");\n      min-height: 100vh;\n\n      > * {\n        font-family: 'Source Sans Pro', sans-serif;\n        font-weight: 400;\n      }\n\n      a {\n        color: "+t.action+";\n      }\n  \n      h1, h1 *, h2, h2 *, h3, h4, h5, h6 {\n        font-family: 'Raleway', sans-serif;\n        font-weight: 900;\n        line-height: 0.8;\n      }\n    }\n  "}),R=p.d.div.withConfig({displayName:"layout__Container",componentId:"ii2kc2-0"})([""," min-height:calc(100vh - 20px);padding:30px;"," ",""],function(n){return"background: "+n.theme.background+";"},d.a.tablet(q()),d.a.phone(j())),O=function(n){var t=n.children;return c.a.createElement(s.StaticQuery,{query:"755544856",render:function(n){return c.a.createElement(p.a,{theme:I},c.a.createElement(R,null,c.a.createElement(N,null),c.a.createElement(v,{siteTitle:n.site.siteMetadata.title}),t,c.a.createElement(M,null)))},data:o})};O.propTypes={children:l.a.node.isRequired};t.a=O},160:function(n,t,e){"use strict";e.d(t,"b",function(){return a}),e.d(t,"a",function(){return u}),e.d(t,"c",function(){return l});var a=function(n){return n.allMarkdownRemark.edges},r=function(n){return n.fields.slug},o=function(n){return n.frontmatter.title},i=function(n){return n.frontmatter.date},c=function(n){return n.fields.description},u=function(n){return{id:r(n),title:o(n),date:i(n),excerpt:c(n)}},l=function(n){var t=n.markdownRemark;return{id:r(t),title:o(t),date:i(t),author:t.frontmatter.author,html:t.html,excerpt:c(t)}}}}]);
//# sourceMappingURL=component---src-pages-index-js-5338dd4f5510ce6725a8.js.map