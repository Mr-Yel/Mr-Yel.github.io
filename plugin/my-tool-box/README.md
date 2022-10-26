# 项目引入方式

通过 `script` 标签引入：

```html
<script type="text/javascript" src="hxk-tool-box.umd.js"></script>
```

```javascript
import { XXX } from './hxk-tool-box.esm'
```

# 快速使用

## HxkDrag 拖拽框

生成一个支持全屏拖拽的拖拽框

## 快速使用

**HxkDrag.constructor(data)**

- target  [element]  拖拽框容器
- data  [object]  拖拽配置对象

创建 HxkDrag 实例

```javascript
const drag = new hxkToolBox.HxkDrag({
  id: "drag",
  title: "111111111111",
  content: `
  hhhhhhhhhhhhhhhhhhhhh
  `,
});
```

实例存在发布订阅事件 xxx

## Config

初始化 `ExeEmojiParticle` 示例时， `config` 配置对象：

| 参数        | 说明                                  | 类型    | 默认值 |
| ----------- | ------------------------------------- | ------- | ------ |
| boomNumber  | 单词粒子的产生数量                    | number  | 10     |
| rotate      | 粒子产生的方向                        | number  | 0      |
| spread      | 粒子的展开力度，数值越大，粒子越展开  | number  | 180    |
| life        | 粒子的生命时间 单位ms                 | number  | .4e3   |
| size        | 粒子的大小                            | number  | 20     |
| delayRange  | 一批次的粒子播放完成需要的时间 单位ms | number  | 0      |
| power       | 粒子动画力度                          | number  | 1      |
| gravity     | 重力的大小                            | number  | 5      |
| showCounter | 是否显示计数                          | boolean | false  |
| counterSize | 计数的文字大小                        | number  | 12     |

## API

`ExeEmojiParticle` 上的方法：

| 参数         | 说明                           | 类型                    | 返回值 |
| ------------ | ------------------------------ | ----------------------- | ------ |
| play         | 播放一次粒子动画               | function()              | 实例   |
| stop         | 停止播放粒子动画               | function()              | 实例   |
| generate     | 连续不断播放粒子动画           | function()              | 实例   |
| setContainer | 设置当前粒子动画需要显示的位置 | function()              | 实例   |
| setCount     | 设置当前点击数                 | function(count: number) | 实例   |
