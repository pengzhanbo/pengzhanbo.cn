(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{193:function(s,t,a){"use strict";a.r(t);var n=a(4),e=Object(n.a)({},(function(){var s=this,t=s.$createElement,a=s._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[a("p",[s._v("最近公司在招聘前端，偶尔作为面试官负责技术面，对一些会问到的问题，做下个人分析和答案, CSS篇。")]),s._v(" "),a("h3",{attrs:{id:"css：什么是盒模型？盒模型有哪些？具体的表现和不同点是什么？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css：什么是盒模型？盒模型有哪些？具体的表现和不同点是什么？"}},[s._v("#")]),s._v(" CSS：什么是盒模型？盒模型有哪些？具体的表现和不同点是什么？")]),s._v(" "),a("p",[s._v("盒模型是CSS规范定义的模块，它规定了一个矩形盒子（标准盒模型），描述任意元素在文档树中占据的空间区域。每个盒子有四个边："),a("code",[s._v("外边距边（margin edge or outer edge）")]),s._v("、"),a("code",[s._v("边框边（border edge）")]),s._v("、"),a("code",[s._v("内填充边（padding edge）")]),s._v("和"),a("code",[s._v("内容边（content edge or inner edge）")]),s._v("，可以划分四个区域"),a("code",[s._v("外边距区域（margin area）")]),s._v("、"),a("code",[s._v("边框区域（border area）")]),s._v("、"),a("code",[s._v("内填充区域（padding area）")]),s._v("和"),a("code",[s._v("内容区域（content area）")]),s._v("。")]),s._v(" "),a("p",[a("img",{attrs:{src:"https://drafts.csswg.org/css-box-3/images/box.png",alt:"css box model"}})]),s._v(" "),a("p",[s._v("为什么会有盒模型类型，严格来说，多数浏览器都按照规范实现了标准盒模型，而盒模型的类型主要是来自于不同浏览器对元素宽高的方式不同而导致，IE浏览器认为元素的"),a("code",[s._v("width/height")]),s._v("应该是由元素的"),a("code",[s._v("内容+内填充+边框")]),s._v("组成，而W3C规定的元素的"),a("code",[s._v("width/height")]),s._v("应该是元素的"),a("code",[s._v("内容")]),s._v("，从而衍生了不同的盒子模型。到"),a("code",[s._v("CSS3")]),s._v("，添加了"),a("code",[s._v("box-sizing")]),s._v("属性，用于更改用于计算元素宽高的默认盒子模型，并将IE浏览器和W3C规范纳入了实现中。可以使用此属性来模拟不正确支持CSS盒子模型规范的浏览器的行为。")]),s._v(" "),a("p",[a("em",[s._v("注："),a("code",[s._v("width/height")]),s._v("最终并不能完全决定元素的实际占用宽高。")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 关键字值 */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" border-box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 默认值 */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" content-box"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 全局值 */")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inherit"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" initial"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("box-sizing")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" unset"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[a("code",[s._v("border-box")]),s._v("规定了元素的"),a("code",[s._v("width")]),s._v("由"),a("code",[s._v("内容+内填充+边框")]),s._v("组成，即IE浏览器的实现。 元素的实际占据宽度由 width属性+外边距。内容宽度为"),a("code",[s._v("width - padding - border")]),s._v("。")]),s._v(" "),a("p",[a("code",[s._v("content-box")]),s._v("规定了元素的"),a("code",[s._v("width")]),s._v("即"),a("code",[s._v("内容宽度")]),s._v(", W3C规范的标准。元素的实际占据宽度由"),a("code",[s._v("widht + padding + border + margin")]),s._v("。内容宽度为"),a("code",[s._v("width")]),s._v("。")]),s._v(" "),a("p",[a("code",[s._v("box-sizing")]),s._v("还有一个待废除的值"),a("code",[s._v("padding-box")]),s._v("，"),a("code",[s._v("width")]),s._v(" 和 "),a("code",[s._v("height")]),s._v(" 属性包括内容和内边距，但是不包括边框和外边距。只有Firefox实现了这个值，它在Firefox 50中被删除。")]),s._v(" "),a("p",[s._v("在高度计算上以上规则同样适用，但对非替换行内元素，尽管内容周围存在内边距与边框，但其占用空间受到"),a("code",[s._v("line-height")]),s._v("属性影响。")]),s._v(" "),a("hr"),s._v(" "),a("h3",{attrs:{id:"css-什么是外边距合并？什么情况下会发生外边距合并？"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css-什么是外边距合并？什么情况下会发生外边距合并？"}},[s._v("#")]),s._v(" CSS: 什么是外边距合并？什么情况下会发生外边距合并？")]),s._v(" "),a("p",[s._v("块元素的上外边距和下外边距有时候会发生合并，其大小取其中绝对值最大的值，这种行为叫做外边距合并。")]),s._v(" "),a("p",[a("strong",[s._v("浮动元素")]),s._v(" 和 "),a("strong",[s._v("绝对定位元素")]),s._v(" 的外边距不会发生合并。这是因为触发了 "),a("strong",[s._v("块格式化上下文")]),s._v(" 。")]),s._v(" "),a("ol",[a("li",[s._v("相邻元素之间的外边距会发生合并（如果后一个元素需要清除前面的浮动，则不一定发生合并）。")]),s._v(" "),a("li",[s._v("父元素与其第一个子元素之间不存在边框、内边距、行内内容、没有创建 "),a("strong",[s._v("块格式化上下文")]),s._v("、没有清除浮动；或者父元素与其最后一个子元素之间不存在边框、内边距、行内内容、heigh、min-height、max-height，那么子元素的外边距会溢出到父元素外面。")]),s._v(" "),a("li",[s._v("如果一个块级元素不包含任何内容，并且在不存在边框、内边距、行内内容、heigh、min-height，则该元素的上下外边距会发生合并。")])]),s._v(" "),a("p",[s._v("三种情况的外边距合并是可以组合产生更加复杂的外边距合并情况的。")]),s._v(" "),a("p",[a("em",[s._v("如果外边距合并的值都是负值，则合并的值为最小的外边距的值。")])]),s._v(" "),a("p",[a("em",[s._v("如果发生外边距合并的值包含负值，则合并后的值为最大的正外边距与最小的负外边距之和。")])]),s._v(" "),a("hr"),s._v(" "),a("h3",{attrs:{id:"css：垂直水平居中"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#css：垂直水平居中"}},[s._v("#")]),s._v(" CSS：垂直水平居中")]),s._v(" "),a("p",[a("em",[s._v("这是个老生常谈的问题了，场景可以有很多，答案也有很多，答案而言其实本身不重要，重要是明白为什么这个方法为什么可以实现垂直居中。")])]),s._v(" "),a("p",[a("strong",[s._v("设立一个场景：在一个宽高不固定的容器中，实现一个宽高不固定的内容盒子，并垂直水平居中。")])]),s._v(" "),a("div",{staticClass:"language-html line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-html"}},[a("code",[a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("\x3c!-- 假设 warpper、container 宽高不固定 实现container相对于wrapper垂直水平居中--\x3e")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("wrapper"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("<")]),s._v("div")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token attr-name"}},[s._v("class")]),a("span",{pre:!0,attrs:{class:"token attr-value"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("=")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')]),s._v("container"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v('"')])]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token tag"}},[a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("</")]),s._v("div")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(">")])]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("方法一：")]),s._v(" 使用 flex 布局")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" flex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" auto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br")])]),a("p",[s._v("适用于支持 flex布局的浏览器（IE11以上，其他现代浏览器）。这里是利用flex弹性布局的特性，弹性容器改变了其子元素填充可用空间的方式，子元素默认从容器左上角开始排列，在不设置宽高时，子元素填充空间由"),a("code",[s._v("flex")]),s._v("声明，默认值为"),a("code",[s._v("0 1 auto")]),s._v(",即\n"),a("code",[s._v("flex-grow: 0;flex-shrink: 1;flex-basis: auto")]),s._v("; 其中 "),a("code",[s._v("flex-basis")]),s._v("定义了子元素的宽和高的尺寸大小，"),a("code",[s._v("auto")]),s._v("值表示自动尺寸，根据子元素内容计算宽高，在子元素上设置"),a("code",[s._v("margin: auto")]),s._v("，这是利用"),a("code",[s._v("auto")]),s._v("平均分配水平或垂直方向上的额外的空间，从而达到目的。（此方法实现的结果是“真正的”垂直水平居中）")]),s._v(" "),a("p",[s._v("或者")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" flex"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("justify-content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" center"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("align-content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" center"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br")])]),a("p",[a("strong",[s._v("方法二：")]),s._v(" 使用 table 布局")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" table-cell"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("vertical-align")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" middle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("margin")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" auto"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br")])]),a("p",[s._v("利用的是table布局的特性，不过该方法有个缺点就是，"),a("code",[s._v("display: table-cell")]),s._v("元素的宽高设置百分比数值是“无效的”，原因是父元素非"),a("code",[s._v("table")]),s._v("元素或"),a("code",[s._v("display: table")]),s._v("元素，"),a("code",[s._v("display: table-cell")]),s._v("元素的宽高百分比数字是相对于"),a("code",[s._v("table")]),s._v("计算的。")]),s._v(" "),a("p",[a("strong",[s._v("方法三：")]),s._v(" "),a("code",[s._v("position")]),s._v(" + "),a("code",[s._v("transform")])]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" relative"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("position")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" absolute"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("top")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("left")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("transform")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token function"}},[s._v("translate")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("-50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" -50%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br")])]),a("p",[s._v("该方法与前面两个方法的作用机理有很大的不同，首先第一点是"),a("code",[s._v("container")]),s._v("脱离了文档流，并且"),a("code",[s._v("container")]),s._v("自身的宽高发生了坍塌，在不设置宽高属性下，尺寸由内容撑开，"),a("code",[s._v("container")]),s._v("相对"),a("code",[s._v("wrapper")]),s._v("元素进行绝对定位，水平方向与垂直方向上，"),a("code",[s._v("container")]),s._v("的左上角顶点偏移到"),a("code",[s._v("wrapper")]),s._v("中点，"),a("code",[s._v("container")]),s._v("的"),a("code",[s._v("transform")]),s._v("是相对于自身的，"),a("code",[s._v("translate(-50%, -50%)")]),s._v("相对于自身，将左上角顶点做左上偏移自身的一半，从而实现了目的。")]),s._v(" "),a("p",[a("em",[s._v("有一些面试者给出了"),a("code",[s._v("container")]),s._v("元素上设置"),a("code",[s._v("margin-left: -50%; margin-top: -50%")]),s._v("的答案，然而，margin的百分比值，是相对于其父元素计算的。")])]),s._v(" "),a("p",[a("strong",[s._v("方法四：")]),s._v(" 使用 行内块元素")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("text-align")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" center"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper:after")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("content")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token string"}},[s._v("''")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("vertical-align")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" middle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("height")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 100%"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("display")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" inline-block"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("vertical-align")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" middle"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("text-align")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" left"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br"),a("span",{staticClass:"line-number"},[s._v("9")]),a("br"),a("span",{staticClass:"line-number"},[s._v("10")]),a("br"),a("span",{staticClass:"line-number"},[s._v("11")]),a("br"),a("span",{staticClass:"line-number"},[s._v("12")]),a("br"),a("span",{staticClass:"line-number"},[s._v("13")]),a("br"),a("span",{staticClass:"line-number"},[s._v("14")]),a("br")])]),a("p",[s._v("该方法实现的垂直水平居中其实是一个近似垂直水平居中，兼容IE7以上的浏览器。水平方向上"),a("code",[s._v(".wrapper")]),s._v("设置"),a("code",[s._v("text-align: center;")]),s._v("实现了水平居中；垂直方向上，给定"),a("code",[s._v("container")]),s._v("声明行内块元素，并"),a("code",[s._v("vertical-align: middle")]),s._v("，但由于"),a("code",[s._v("container")]),s._v("高度不确定，无法声明具体的行高，所以借助了父元素的伪类元素，创建了一个宽度为0高度为100%的行内块元素，从而使"),a("code",[s._v("container")]),s._v("元素在垂直方向上实现了居中。但由于"),a("code",[s._v("vertical-align: middle")]),s._v("是元素的中线与字符X的中心点对齐，大多数字体设计字体的中心点偏下，也导致了实现的垂直居中并不是绝对的垂直居中。而要实现绝对的垂直居中，需要添加一下属性：")]),s._v(" "),a("div",{staticClass:"language-css line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-css"}},[a("code",[a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".wrapper")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 0"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("white-space")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" nowrap"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token selector"}},[s._v(".container")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("font-size")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" 14px"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v(" "),a("span",{pre:!0,attrs:{class:"token comment"}},[s._v("/* 重置回默认字体大小 */")]),s._v("\n    "),a("span",{pre:!0,attrs:{class:"token property"}},[s._v("white-space")]),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(":")]),s._v(" normal"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),a("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[s._v("1")]),a("br"),a("span",{staticClass:"line-number"},[s._v("2")]),a("br"),a("span",{staticClass:"line-number"},[s._v("3")]),a("br"),a("span",{staticClass:"line-number"},[s._v("4")]),a("br"),a("span",{staticClass:"line-number"},[s._v("5")]),a("br"),a("span",{staticClass:"line-number"},[s._v("6")]),a("br"),a("span",{staticClass:"line-number"},[s._v("7")]),a("br"),a("span",{staticClass:"line-number"},[s._v("8")]),a("br")])]),a("p",[s._v("实现方法有很多，这里暂时只列出其中的四种。")]),s._v(" "),a("hr"),s._v(" "),a("p",[a("em",[s._v("想到还有其他问题继续补充...")])])])}),[],!1,null,null,null);t.default=e.exports}}]);