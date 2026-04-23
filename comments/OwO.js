// 立即执行函数，避免污染全局作用域
(() => {
    /**
     * OwO 表情包选择器类
     * 功能：加载表情包数据、渲染表情面板、插入表情到输入框
     */
    class OwO {
        /**
         * 构造函数：初始化配置、加载表情数据
         * @param {Object} option - 自定义配置项
         */
        constructor(option) {
            // 默认配置项
            const defaultOption = {
                container: document.getElementsByClassName('ze-OwO')[0], // 表情容器
                target: document.getElementsByTagName('textarea')[0], // 目标输入框
                position: 'down', // 表情面板弹出位置 down/up
                width: '100%', // 面板宽度
                maxHeight: '250px', // 面板最大高度
                api: '' // 表情数据接口地址
            };

            // 合并用户配置与默认配置（用户配置优先）
            for (let defaultKey in defaultOption) {
                if (defaultOption.hasOwnProperty(defaultKey) && !option.hasOwnProperty(defaultKey)) {
                    option[defaultKey] = defaultOption[defaultKey];
                }
            }

            // 保存配置到实例
            this.container = option.container;
            this.target = option.target;

            // 如果配置向上弹出，添加对应样式类
            if (option.position === 'up') {
                this.container.classList.add('OwO-up');
            }

            // 创建 AJAX 请求加载表情数据
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = () => {
                // 请求完成
                if (xhr.readyState === 4) {
                    // 请求成功（2xx 或 304 缓存）
                    if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
                        // 解析 JSON 数据并初始化
                        this.odata = JSON.parse(xhr.responseText);
                        this.init(option);
                    } else {
                        // 请求失败打印错误
                        console.log('OwO data request was unsuccessful: ' + xhr.status);
                    }
                }
            };

            // 发送 GET 请求
            xhr.open('get', option.api, true);
            xhr.send(null);
        }

        /**
         * 初始化：渲染 HTML 结构、绑定事件
         * @param {Object} option - 配置项
         */
        init(option) {
            // 目标输入框
            this.area = option.target;
            // 获取所有表情分组名称
            this.packages = Object.keys(this.odata);

            // 开始拼接表情面板 HTML
            let html = `<div class="ze-OwO-body" style="width: ${option.width}">`;

            // 遍历所有表情分组
            for (let i = 0; i < this.packages.length; i++) {
                let type = this.odata[this.packages[i]].type; // 表情类型
                let opackage = this.odata[this.packages[i]].container; // 表情列表

                // 拼接表情列表容器
                html += `<ul class="ze-OwO-items ze-OwO-items-${type}" style="max-height: ${parseInt(option.maxHeight) - 53}px;">`;

                // ============== 根据不同类型渲染表情 ==============
                // 类型1：hostimage 图片表情
                if (type === "hostimage") {
                    for (let j = 0; j < opackage.length; j++) {
                        html += `<li class="ze-OwO-item" data-id="${opackage[j].data}" title="${opackage[j].text}">
                            <img loading="lazy" no-view class="biaoqing" src="${ZeComments.theme_url + opackage[j].icon}">
                        </li>`;
                    }
                }

                // 类型2：hostsvg SVG图标表情
                if (type === "hostsvg") {
                    let svgurl = this.odata[this.packages[i]].icon;
                    console.log(svgurl);
                    for (let j = 0; j < opackage.length; j++) {
                        html += `<li class="ze-OwO-item" data-id="::(${opackage[j]})" title="${opackage[j]}">
                            <svg class="biaoqing"><use xlink:href="${ZeComments.theme_url + svgurl}#${opackage[j]}"></use></svg>
                        </li>`;
                    }
                }

                // 类型3：emoticon 文字表情
                if (type === "emoticon") {
                    for (let j = 0; j < opackage.length; j++) {
                        html += `<li class="ze-OwO-item ze-emoticon" data-id="not-given" title="${opackage[j].text}">${opackage[j].icon}</li>`;
                    }
                }

                html += `</ul>`;
            }

            // 拼接底部切换栏
            html += `
                <div class="ze-OwO-bar">
                    <ul class="ze-OwO-packages">`;

            // 遍历生成分组切换按钮
            for (let i = 0; i < this.packages.length; i++) {
                html += `<li><span>${this.packages[i]}</span></li>`;
            }

            html += `
                    </ul>
                </div>
            </div>`;

            // 将拼接好的 HTML 插入到容器中
            this.container.innerHTML = html;

            // ============== 绑定交互事件 ==============
            // 1. 表情logo点击：切换面板显示/隐藏
            this.logo = document.getElementsByClassName('ze-OwO-button')[0];
            this.logo.addEventListener('click', () => {
                this.toggle();
            });

            // 2. 表情项点击：插入内容到输入框
            this.container.getElementsByClassName('ze-OwO-body')[0].addEventListener('click', (e) => {
                // 找到点击的表情项
                let target = e.target.closest('.ze-OwO-item');
                if (target) {
                    // 获取输入框光标位置
                    const cursorPos = this.area.selectionEnd;
                    let areaValue = this.area.value;

                    // 根据 data-id 判断插入内容
                    if (target.dataset.id === "not-given") {
                        // 特殊类型：直接插入表情HTML/文字
                        this.area.value = areaValue.slice(0, cursorPos) + target.innerHTML + areaValue.slice(cursorPos);
                    } else {
                        // 常规类型：插入 data-id 中的表情代码
                        this.area.value = areaValue.slice(0, cursorPos) + target.dataset.id + areaValue.slice(cursorPos);
                    }

                    // 聚焦输入框并关闭面板
                    this.area.focus();
                    this.toggle();
                }
            });

            // 3. 表情分组切换事件
            this.packagesEle = this.container.getElementsByClassName('ze-OwO-packages')[0];
            for (let i = 0; i < this.packagesEle.children.length; i++) {
                // 闭包保存索引
                ((index) => {
                    this.packagesEle.children[i].addEventListener('click', () => {
                        this.tab(index);
                    });
                })(i);
            }

            // 默认选中第一个分组
            this.tab(0);
        }

        /**
         * 切换表情面板显示/隐藏
         */
        toggle() {
            if (this.container.classList.contains('ze-OwO-open')) {
                this.container.classList.remove('ze-OwO-open');
            } else {
                this.container.classList.add('ze-OwO-open');
            }
        }

        /**
         * 切换表情分组
         * @param {number} index - 分组索引
         */
        tab(index) {
            // 隐藏当前显示的表情列表
            const itemsShow = this.container.getElementsByClassName('ze-OwO-items-show')[0];
            if (itemsShow) {
                itemsShow.classList.remove('ze-OwO-items-show');
            }
            // 显示选中的分组
            this.container.getElementsByClassName('ze-OwO-items')[index].classList.add('ze-OwO-items-show');

            // 移除上一个激活的分组按钮样式
            const packageActive = this.container.getElementsByClassName('ze-OwO-package-active')[0];
            if (packageActive) {
                packageActive.classList.remove('ze-OwO-package-active');
            }
            // 给当前选中分组按钮添加激活样式
            this.packagesEle.getElementsByTagName('li')[index].classList.add('ze-OwO-package-active');
        }
    }

    // 模块化导出：支持 CommonJS 和 浏览器全局变量
    if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
        module.exports = OwO;
    } else {
        window.OwO = OwO;
    }
})();