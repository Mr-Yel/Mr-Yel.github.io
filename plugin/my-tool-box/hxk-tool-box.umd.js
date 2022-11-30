(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.hxkToolBox = {}));
})(this, (function (exports) { 'use strict';

    class Event {
      // 订阅
      on(event, fn) {
        // let this = this;
        // 如果对象中没有对应的 event 值，也就是说明没有订阅过，就给 event 创建个缓存列表
        // 如有对象中有相应的 event 值，把 fn 添加到对应 event 的缓存列表里
        (this.list[event] || (this.list[event] = [])).push(fn);
        return this;
      } // 监听一次


      once(event, fn) {
        // 先绑定，调用后删除
        // let this = this;
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }

        on.fn = fn;
        this.on(event, on);
        return this;
      } // 取消订阅


      off(event, fn) {
        // let this = this;
        let fns = this.list[event]; // 如果缓存列表中没有相应的 fn，返回false

        if (!fns) return false;

        if (!fn) {
          // 如果没有传 fn 的话，就会将 event 值对应缓存列表中的 fn 都清空
          fns && (fns.length = 0);
        } else {
          // 若有 fn，遍历缓存列表，看看传入的 fn 与哪个函数相同，如果相同就直接从缓存列表中删掉即可
          let cb;

          for (let i = 0, cbLen = fns.length; i < cbLen; i++) {
            cb = fns[i];

            if (cb === fn || cb.fn === fn) {
              fns.splice(i, 1);
              break;
            }
          }
        }

        return this;
      } // 发布


      emit() {
        // let this = this;
        // 第一个参数是对应的 event 值，直接用数组的 shift 方法取出
        [].shift.call(arguments);
        let fns = [];

        for (let i in this.list) {
          if (Array.isArray(this.list[i])) {
            fns.push(...this.list[i]);
          } else {
            fns.push(this.list[i]);
          }
        } // if(!this.list) return 
        // let fns = [...this.list[event]];
        // 如果缓存列表里没有 fn 就返回 false


        if (!fns || fns.length === 0) {
          return false;
        } // 遍历 event 值对应的缓存列表，依次执行 fn


        fns.forEach(fn => {
          fn.apply(this, arguments);
        });
        return this;
      }

    }

    /*
      * 动态创建元素 
      * @param {Array} optionList 必填 渲染的元素列表
      * @param {HTMLNode} parentNode 必填 要插入的父元素
      */
    function createNode(optionList, parentNode) {
      if (!parentNode) return;
      optionList.forEach(option => {
        if (option.isNoRender) return;
        const node = document.createElement(option.nodeType || "div");
        node.className = option.className || "";
        node.innerHTML = option.contentHTML || "";

        if (option.buttonEvent) {
          node.addEventListener('click', option.buttonEvent);

          node.onmousedown = function (event) {
            this.onfocus = function () {
              this.blur();
            };

            (event || window.event).cancelBubble = true;
          };
        }

        parentNode.appendChild(node);

        if (option.childrenNode) {
          createNode(option.childrenNode, node);
        }
      });
    }

    function setStyle(elm, attribute, val) {
        console.log(elm, attribute, val);
        let style = elm.style;
        console.log(style);
        if (style[attribute]) ;
    }
    class Drag extends Event {
        data;
        dragBox;
        dragMinWidth;
        dragMinHeight;
        constructor(data) {
            super();
            this._init(data);
        }
        _init(data) {
            this.dragBox = null;
            this.data = data;
            this._newDrag(this.data);
            this.dragMinWidth = data.dragMinWidth || 300;
            this.dragMinHeight = data.dragMinHeight || 300;
        }
        _newDrag(data) {
            try {
                this._creatElm(data);
                console.log(111);
                this._changeSize(data);
                this._dragElm(data);
            }
            catch (error) {
                console.log(error);
            }
        }
        _creatElm(data) {
            this.dragBox = document.createElement("div");
            this.dragBox.className = "dragBox";
            this.dragBox.style.cssText = 'width: 100%; height: 100%;';
            setStyle(this.dragBox, 'style', `width: 100%; height: 100%;`);
            let arr = [];
            for (let i in this.data.buttonSet) {
                this.data.buttonSet[i].contentHTML = this.data.buttonSet[i].icon;
                this.data.buttonSet[i].buttonEvent = this.data.buttonSet[i].callBack;
                this.data.buttonSet[i].className = this.data.buttonSet[i].class;
                this.data.buttonSet[i].nodeType = 'a';
                arr.push(this.data.buttonSet[i]);
            }
            arr.push({
                contentHTML: `<svg t="1642731525215" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2174" width="15" height="15"><path d="M511.333 127.333c51.868 0 102.15 10.144 149.451 30.15 45.719 19.337 86.792 47.034 122.078 82.321 35.287 35.286 62.983 76.359 82.321 122.078 20.006 47.3 30.15 97.583 30.15 149.451s-10.144 102.15-30.15 149.451c-19.337 45.719-47.034 86.792-82.321 122.078-35.286 35.287-76.359 62.983-122.078 82.321-47.3 20.006-97.583 30.15-149.451 30.15s-102.15-10.144-149.451-30.15c-45.719-19.337-86.792-47.034-122.078-82.321-35.287-35.286-62.983-76.359-82.321-122.078-20.006-47.3-30.15-97.583-30.15-149.451s10.144-102.15 30.15-149.451c19.337-45.719 47.034-86.792 82.321-122.078 35.286-35.287 76.359-62.983 122.078-82.321 47.301-20.006 97.583-30.15 149.451-30.15m0-64c-247.424 0-448 200.576-448 448s200.576 448 448 448 448-200.576 448-448-200.576-448-448-448z" fill="#515151" p-id="2175"></path><path d="M557.254 512l147.373-147.373c12.497-12.497 12.497-32.758 0-45.255-12.496-12.497-32.758-12.497-45.254 0L512 466.746 364.627 319.373c-12.497-12.497-32.758-12.497-45.255 0s-12.497 32.758 0 45.255L466.746 512 319.373 659.373c-12.497 12.496-12.497 32.758 0 45.254C325.621 710.876 333.811 714 342 714s16.379-3.124 22.627-9.373L512 557.254l147.373 147.373C665.621 710.876 673.811 714 682 714s16.379-3.124 22.627-9.373c12.497-12.496 12.497-32.758 0-45.254L557.254 512z" fill="#515151" p-id="2176"></path></svg>`,
                buttonEvent: this._closeDrag,
                className: 'close',
                nodeType: 'a'
            });
            let createNodeList = [
                {
                    className: 'dragBox-title',
                    childrenNode: [
                        {
                            nodeType: 'h2',
                            contentHTML: data.title ? data.title : "拖动窗口"
                        },
                        {
                            className: '',
                            childrenNode: arr
                        },
                    ]
                },
                {
                    className: 'resizeL'
                }, {
                    className: 'resizeT'
                }, {
                    className: 'resizeR'
                }, {
                    className: 'resizeB'
                }, {
                    className: 'resizeLT'
                }, {
                    className: 'resizeTR'
                }, {
                    className: 'resizeBR'
                }, {
                    className: 'resizeLB'
                }, {
                    className: 'content',
                    contentHTML: this.data.content
                }
            ];
            createNode(createNodeList, this.dragBox);
            document
                .querySelector(data.id ? "#" + data.id : "." + data.class)
                .appendChild(this.dragBox);
            this.emit('drag:create-over');
        }
        _closeDrag() {
        }
        _changeSize(data) {
            console.log(data);
            let oDrag = document.querySelector("#drag");
            let oLT = document.querySelector(".resizeLT");
            let oTR = document.querySelector(".resizeTR");
            let oBR = document.querySelector(".resizeBR");
            let oLB = document.querySelector(".resizeLB");
            let oL = document.querySelector(".resizeL");
            let oT = document.querySelector(".resizeT");
            let oR = document.querySelector(".resizeR");
            let oB = document.querySelector(".resizeB");
            this.resize(oDrag, oLT, true, true, false, false);
            this.resize(oDrag, oTR, false, true, false, false);
            this.resize(oDrag, oBR, false, false, false, false);
            this.resize(oDrag, oLB, true, false, false, false);
            this.resize(oDrag, oL, true, false, false, true);
            this.resize(oDrag, oT, false, true, true, false);
            this.resize(oDrag, oR, false, false, false, true);
            this.resize(oDrag, oB, false, false, true, false);
            oDrag.style.left =
                (document.documentElement.clientWidth - 200) / 2 + "px";
            oDrag.style.top =
                (document.documentElement.clientHeight - 400) / 2 + "px";
        }
        _dragElm(data) {
            console.log(111);
            let oDrag = document.querySelector("#drag");
            let handle = document.querySelector(".dragBox-title");
            var disX = 0;
            var disY = 0;
            handle = handle || oDrag;
            handle.setAttribute('style', 'cursor: move');
            handle.onmousedown = function (event) {
                var event = event;
                disX = event.clientX - oDrag.offsetLeft;
                disY = event.clientY - oDrag.offsetTop;
                const mask = document.createElement('div');
                mask.style.cssText = `
              position:fixed;
              top:0;
              left:0;
              right:0;
              bottom:0;
              z-index: 99999`;
                mask.setAttribute('id', 'mousemoveMask');
                document.body.append(mask);
                mask.onmousemove = function (event) {
                    var event = event;
                    var iL = event.clientX - disX;
                    var iT = event.clientY - disY;
                    var maxL = document.documentElement.clientWidth - oDrag.offsetWidth;
                    var maxT = document.documentElement.clientHeight - oDrag.offsetHeight;
                    iL <= 0 && (iL = 0);
                    iT <= 0 && (iT = 0);
                    iL >= maxL && (iL = maxL);
                    iT >= maxT && (iT = maxT);
                    oDrag.style.left = iL + "px";
                    oDrag.style.top = iT + "px";
                    return false;
                };
                mask.onmouseup = function () {
                    const mask = document.getElementById('mousemoveMask');
                    mask && mask.remove();
                    mask.onmousemove = null;
                    mask.onmouseup = null;
                };
                return false;
            };
        }
        resize(oParent, handle, isLeft, isTop, lockX, lockY) {
            console.log(oParent);
            let dragMinWidth = this.dragMinWidth;
            let dragMinHeight = this.dragMinHeight;
            handle.onmousedown = function (event) {
                var event = event;
                var disX = event.clientX - handle.offsetLeft;
                var disY = event.clientY - handle.offsetTop;
                var iParentTop = oParent.offsetTop;
                var iParentLeft = oParent.offsetLeft;
                var iParentWidth = oParent.offsetWidth;
                var iParentHeight = oParent.offsetHeight;
                const mask = document.createElement('div');
                mask.style.cssText = 'position: absolute;top: 0;left: 0;width: 100vw;height: 100vh;z-index: 99999999999;';
                mask.setAttribute('id', 'mousemoveMask');
                document.body.append(mask);
                mask.onmousemove = function (event) {
                    var event = event;
                    var iL = event.clientX - disX;
                    var iT = event.clientY - disY;
                    var maxW = document.documentElement.clientWidth - oParent.offsetLeft - 2;
                    var maxH = document.documentElement.clientHeight - oParent.offsetTop - 2;
                    var iW = isLeft ? iParentWidth - iL : handle.offsetWidth + iL;
                    var iH = isTop ? iParentHeight - iT : handle.offsetHeight + iT;
                    isLeft && (oParent.style.left = iParentLeft + iL + "px");
                    isTop && (oParent.style.top = iParentTop + iT + "px");
                    iW < dragMinWidth && (iW = dragMinWidth);
                    iW > maxW && (iW = maxW);
                    lockX || (oParent.style.width = iW + "px");
                    iH < dragMinHeight && (iH = dragMinHeight);
                    iH > maxH && (iH = maxH);
                    lockY || (oParent.style.height = iH + "px");
                    if ((isLeft && iW == dragMinWidth) ||
                        (isTop && iH == dragMinHeight))
                        document.onmousemove = null;
                    return false;
                };
                mask.onmouseup = function () {
                    const mask = document.getElementById('mousemoveMask');
                    mask && mask.remove();
                    mask.onmousemove = null;
                    mask.onmouseup = null;
                };
                return false;
            };
        }
    }

    var e=[],t=[];function n(n,r){if(n&&"undefined"!=typeof document){var a,s=!0===r.prepend?"prepend":"append",d=!0===r.singleTag,i="string"==typeof r.container?document.querySelector(r.container):document.getElementsByTagName("head")[0];if(d){var u=e.indexOf(i);-1===u&&(u=e.push(i)-1,t[u]={}),a=t[u]&&t[u][s]?t[u][s]:t[u][s]=c();}else a=c();65279===n.charCodeAt(0)&&(n=n.substring(1)),a.styleSheet?a.styleSheet.cssText+=n:a.appendChild(document.createTextNode(n));}function c(){var e=document.createElement("style");if(e.setAttribute("type","text/css"),r.attributes)for(var t=Object.keys(r.attributes),n=0;n<t.length;n++)e.setAttribute(t[n],r.attributes[t[n]]);var a="prepend"===s?"afterbegin":"beforeend";return i.insertAdjacentElement(a,e),e}}

    var css$1 = "#drag {\n  flex-direction: column;\n  position: absolute;\n  top: 58px;\n  left: 792px;\n  width: 405px;\n  height: 493px;\n  background: #EDEDF2;\n  border-radius: 4px 4px 0 0 !important;\n  overflow: hidden;\n  z-index: 1000;\n}\n\n.dragBox {\n  display: flex;\n  flex-direction: column;\n}\n\n#drag .dragBox-title {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  height: 42px;\n  padding: 0 10px;\n  background: #DDDDE7;\n}\n\n#drag .dragBox-title a {\n  width: 21px;\n  height: 19px;\n  display: inline-block;\n  margin-left: 10px;\n  cursor: pointer;\n}\n\n#drag .dragBox-title a svg {\n  width: 100%;\n  height: 100%;\n}\n\n#drag .dragBox-title a.revert {\n  background-position: -149px 0;\n  display: none;\n}\n\n#drag .dragBox-title a.revert:hover {\n  background-position: -149px -29px;\n}\n\n#drag .dragBox-title a.close {\n  background-position: -89px 0;\n}\n\n#drag .dragBox-title a.close:hover {\n  background-position: -89px -29px;\n}\n\n#drag .content {\n  width: 100%;\n  height: 100%;\n  padding: 0 10px;\n  background: #EDEDF2;\n  overflow: hidden;\n}\n\n#drag .content #iframe-container {\n  width: 100%;\n  height: 100%;\n}\n\n#drag .content iframe {\n  width: 100%;\n  height: 100%;\n}\n\n#drag .resizeBR {\n  position: absolute;\n  width: 14px;\n  height: 14px;\n  right: 0;\n  bottom: 0;\n  overflow: hidden;\n  cursor: nw-resize;\n}\n\n#drag .resizeL,\n#drag .resizeT,\n#drag .resizeR,\n#drag .resizeB,\n#drag .resizeLT,\n#drag .resizeTR,\n#drag .resizeLB {\n  position: absolute;\n  background: #000;\n  overflow: hidden;\n  opacity: 0;\n  filter: alpha(opacity=0);\n}\n\n#drag .resizeL,\n#drag .resizeR {\n  top: 0;\n  width: 5px;\n  height: 100%;\n  cursor: w-resize;\n}\n\n#drag .resizeL {\n  left: 0;\n}\n\n#drag .resizeR {\n  right: 0;\n}\n\n#drag .resizeT,\n#drag .resizeB {\n  width: 100%;\n  height: 5px;\n  cursor: n-resize;\n}\n\n#drag .resizeT {\n  top: 0;\n}\n\n#drag .resizeB {\n  bottom: 0;\n}\n\n#drag .resizeLT,\n#drag .resizeTR,\n#drag .resizeLB {\n  width: 8px;\n  height: 8px;\n  background: #ff0;\n}\n\n#drag .resizeLT {\n  top: 0;\n  left: 0;\n  cursor: nw-resize;\n}\n\n#drag .resizeTR {\n  top: 0;\n  right: 0;\n  cursor: ne-resize;\n}\n\n#drag .resizeLB {\n  left: 0;\n  bottom: 0;\n  cursor: ne-resize;\n}";
    n(css$1,{});

    const defaultCor = {
        bgColor: 'rgba(0, 0, 0, 0.1)',
        text: 'loading',
        type: 'roll-circular',
        color: 'black'
    };
    const typeMap = {
        'roll-circular': {
            id: 'roll-circular',
            innerHTML: `<svg class="circular" viewbox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>`,
            style: {
                stroke: 'black'
            }
        },
        'default': {
            id: 'roll-circular',
            innerHTML: `<svg class="circular" viewbox="25 25 50 50">
            <circle class="path" cx="50" cy="50" r="20" fill="none" />
        </svg>`
        },
    };
    class Loading {
        loading;
        body;
        loadingCount = 0;
        static _instance;
        constructor(data) {
            if (new.target !== Loading) {
                return;
            }
            if (!Loading._instance) {
                data = Object.assign(data || {}, defaultCor);
                this._init(data);
                Loading._instance = this;
            }
            return Loading._instance;
        }
        _init(data) {
            console.log('_init');
            this.loading = document.createElement('div');
            this.body = document.querySelector('body');
            this.loading.id = 'hxk-loading';
            this.loading.style.backgroundColor = data.bgColor;
            this.initContent(data);
        }
        initContent(data) {
            const node = document.createElement('div');
            const type = data.type;
            const contentCor = typeMap[type] || typeMap['default'];
            for (let key of Object.keys(contentCor)) {
                if (key == 'style') {
                    let contentCorStyle = contentCor['style'];
                    for (let styleKey of Object.keys(contentCorStyle)) {
                        node['style'][styleKey] = contentCorStyle[styleKey];
                    }
                    continue;
                }
                node[key] = contentCor[key];
            }
            this.loading.appendChild(node);
        }
        showLoading() {
            if (this.loadingCount)
                return;
            this.body.appendChild(this.loading);
            this.loadingCount++;
        }
        hideLoading() {
            if (!this.loadingCount)
                return;
            this.body.removeChild(this.loading);
            this.loadingCount--;
        }
    }

    var css = "#hxk-loading {\n  position: fixed;\n  top: 0;\n  bottom: 0;\n  right: 0;\n  left: 0;\n  z-index: 9999;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n#hxk-loading #roll-circular .circular {\n  width: 100px;\n  height: 100px;\n  animation: rotate 2s linear infinite;\n}\n#hxk-loading #roll-circular .path {\n  stroke-dasharray: 1, 200;\n  stroke-dashoffset: 0;\n  animation: dash 1.5s ease-in-out infinite;\n}\n\n@keyframes rotate {\n  100% {\n    transform: rotate(360deg);\n  }\n}\n@keyframes dash {\n  0% {\n    stroke-dasharray: 1, 200;\n    stroke-dashoffset: 0;\n  }\n  50% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -35px;\n  }\n  100% {\n    stroke-dasharray: 89, 200;\n    stroke-dashoffset: -124px;\n  }\n}";
    n(css,{});

    exports.HxkDrag = Drag;
    exports.Loading = Loading;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
