# 王嘉祺 · AI 应用开发作品集

公开作品集网站，包含三个项目说明、Fynix 公开截图、达人筛选和财务差异核验的浏览器交互演示，以及可打印的个人简历。

[打开作品集](https://aaaaqiiii.github.io/jiaqi-ai-portfolio/) · [Sites 镜像](https://jiaqi-ai-portfolio.lucky-giant-0226.chatgpt.site/)

## 本地预览

需要 Node.js 24 或以上，无第三方运行依赖。

```sh
npm start
npm test
npm run build
```

访问 http://127.0.0.1:4196 。部署目录为 `dist/`。

## 展示范围

- Fynix 截图来自本人已公开的 [fynix-studio-showcase](https://github.com/Aaaaqiiii/fynix-studio-showcase)，展示本地界面，不代表已验收真实模型生成。
- 项目经历、职责与使用状态按作者提供的信息整理。公开页面展示选定界面、技术说明和浏览器交互，不连接公司生产系统。
- 达人与财务样例数据由本网站独立构造，不包含真实客户、达人报价、公司报表、凭据或私有仓库源码。
- 达人演示执行浏览器端关键词和预算筛选，不调用大模型或向量检索。财务演示执行按分比较及重复、缺失检查，不是实际财务系统。
- `tests/demo.test.mjs` 检查公开演示的数据逻辑，测试范围不包含私有后端。

## 文件

`dist/index.html` 为首页，`dist/projects/` 为项目说明，`dist/resume.html` 为简历。简历内容位于 `src/resume-content.mjs`，公开演示数据与纯函数位于 `dist/assets/demo-data.js`。

LeiBox 字符鲨鱼与弹性面板已接入首页和个人介绍抽屉；保留完整原始源码与来源说明，见 `src/leibox/README.md`。`build-leibox.mjs` 编译并适配组件，`build-pages.mjs` 与 `build-portfolio.mjs` 生成网站页面。个人介绍面板支持点击或向左拖动打开、左边缘拖动调宽、键盘调宽及 Escape 关闭。
