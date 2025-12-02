### ZeComments
泽泽Typecho通用评论组建（2025.12.2）,基于 `tailwindscss3` 构建，致力于解决评论皮肤难以开发的痛点，方便快速解决古董主题没有评论功能的问题；

### 特性
支持显示@父级评论昵称，评论头像源默认 `https://cravatar.cn/avatar/`，也支持 `defined('__TYPECHO_GRAVATAR_PREFIX__','头像源地址')` Typecho原生自定义方法自定义源

### 深色模式支持
在父级原生上添加 `class="dark"` 启用深色模式

### 开发
1,原主题如果有`id`为`comments`的元素请修改成别的或者删掉避免冲突

2,主题的头部插件接口可以改成 `<?php $this->header(); ?>` 改成 `<?php $this->header('commentReply='); ?>` 去除掉默认加载的评论相关`js`脚本，推荐这样：`<?php $this->header('generator=&template=&commentReply='); ?>` 这样是隐藏typecho版本号隐藏主题名隐藏评论脚本
（PS：此步骤忽略也可以，不会有冲突，此步骤只是为了减少用不到的默认`js`脚本）

3,支持开启登录才能评论，支持隐藏网址输入栏，详见`comments.php`开头注释说明

4,评论组建样式不一定适合所有主题，可以自行修改 `comments/main.css` 文件调整样式

运行 `npm run build` 生成 `css` 文件

### 更新记录

**2025.12.2**
支持开启登录才能评论，支持隐藏网址输入栏，解决部分`class`未独立问题，解决部分框架`css`类名冗余问题减少与主题本体`class`冲突的可能性

**2025.12.1**
泽泽Typecho通用评论组建诞生