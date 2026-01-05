### ZeComments
泽泽Typecho通用评论组建,基于 `tailwindscss3` 构建，致力于解决评论皮肤难以开发的痛点，方便快速解决古董主题没有评论功能的问题；

功能：基础评论功能；支持显示文章作者标识；支持开启登录才能评论；支持隐藏网址输入栏

### 效果预览
https://demo.typecho.fans/?theme=Totoro-Skin

### 特性
支持显示@父级评论昵称，评论头像源默认 `https://cravatar.cn/avatar/`，也支持 `defined('__TYPECHO_GRAVATAR_PREFIX__','头像源地址')` Typecho原生自定义方法自定义源

### 使用
将`comments.php`和`comments`文件放到你主题文件夹下面，然后在文章或页面模板中引入 `comments.php`。

然后可以使用`css`变量自定义配色风格，具体支持变量以及使用案例如下：
```
<style>
.ze-comments-parent{
--text: #374151; /*评论区文字颜色，主要是覆盖可能没有指定颜色的区域*/
--textsize: 14px;/*评论区文字大小*/

--gravatar-size:40px;/*默认头像大小*/
--max-gravatar-size:48px;/*大屏幕头像大小*/

--title-bar-bg: #3b82f6; /*评论区标题左侧装饰条背景颜色*/
--text-title-size: 20px; /*评论区标题文字大小*/

--text-input-size: 14px; /*输入框文字大小*/
--input-text: #374151; /*输入框文字颜色*/
--input-bg: #f0f0f0; /*输入框背景颜色*/
--input-placeholder: #d1d5db; /*输入框占位符颜色*/

--submit-text: #ffffff; /*提交按钮文字颜色*/
--submit-bg: #f26b83;  /*提交按钮颜色*/
--submit-hover-bg: red;/*提交按钮悬停颜色*/
--submit-size:36px;/*提交按钮大小*/
--submit-svg-size:20px;/*提交按钮,作者认证图标，翻页按钮图标大小*/

--user-name: #1f2937; /*评论列表用户昵称颜色*/
--text-size: 14px; /*评论列表文字大小*/
--text-color: #374151; /*评论列表文字颜色*/
--text-link: #3b82f6; /*评论列表链接颜色*/
--text-link-hover: #2563eb; /*评论列表链接悬停颜色*/
--text-bg: #f0f0f0; /*评论列表背景颜色*/

--text-meta-size:12px;/*评论区时间，回复等文字大小*/
--text-meta-color:#676767;/*评论区时间，回复等文字颜色*/

--pagination-text: #374151; /*分页器文字颜色*/
--page-navigator-bg: #f1f5f9; /*分页器背景颜色*/
--page-navigator-current: #e5e7eb; /*分页器当前页或悬停时背景颜色*/
}
</style>
```
也可以通过修改css变量的方式适配深色模式，如
```
<style>
    @media (prefers-color-scheme: dark) {
        .ze-comments-parent{
            --text:#fff;
            --input-text: #f6f3f4; /*输入框文字颜色*/
            --input-bg: #364153; /*输入框背景颜色*/
            --input-placeholder: #99a1af; /*输入框占位符颜色*/
            
            --user-name: #f6f3f4; /*评论列表用户昵称颜色*/
            --text-color: #fff; /*评论列表文字颜色*/
            --text-bg: #364153; /*评论列表背景颜色*/
            --text-meta-color:#afafaf;/*评论区时间，回复等文字颜色*/
            
            --pagination-text: #f6f3f4; /*分页器文字颜色*/
            --page-navigator-bg: #364153; /*分页器背景颜色*/
            --page-navigator-current: #3c82f6; /*分页器当前页或悬停时背景颜色*/
        }
    }
</style>
```

### 开发
- 1，原主题如果有`id`为`comments`的元素请修改成别的或者删掉避免冲突
- 2，主题的头部插件接口 `<?php $this->header(); ?>` 改成 `<?php $this->header('commentReply='); ?>` 去除掉默认加载的评论相关`js`脚本，推荐这样：`<?php $this->header('generator=&template=&commentReply='); ?>` 这样是隐藏typecho版本号隐藏主题名隐藏评论脚本
（PS：此步骤忽略也可以，不会有冲突，此步骤只是为了减少用不到的默认`js`脚本）
- 3，支持开启登录才能评论；支持隐藏网址输入栏；详见`comments.php`开头注释说明
- 4，评论组建样式不一定适合所有主题，可以自行修改 `comments/main.css` 文件调整样式，然后运行 `npm run build` 生成 `css` 文件

### 更新记录
> **2025.12.8/9**
修复翻页按钮图标不跟随css变量的问题；解决部分css变量名书写错误；布局排版调整；调整css预设适配提升兼容性；加入深色模式适配文档说明；

> **2025.12.7**
支持使用css变量的方式自定义配色风格

>**2025.12.2**
支持开启登录才能评论，支持隐藏网址输入栏，解决部分`class`未独立问题，解决部分框架`css`类名冗余问题减少与主题本体`class`冲突的可能性

>**2025.12.1**
泽泽Typecho通用评论组建诞生
