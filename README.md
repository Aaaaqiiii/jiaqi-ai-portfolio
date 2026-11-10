# 王嘉祺 · AI 应用开发作品集

公开作品集网站，包含三个项目说明、现有 Fynix 公开截图、达人筛选和财务差异核验的浏览器交互样例，以及可打印的参考简历。

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
- 帧序的商品知识 RAG、达人智能选型与财务服务架构来自求职参考案例设计。项目页明确区分现有材料与设计扩展，不将其全部表述为已经上线的功能。
- 达人与财务样例数据由本网站独立构造，不包含真实客户、达人报价、公司报表、凭据或私有仓库源码。
- 达人演示执行浏览器端关键词和预算筛选，不调用大模型或向量检索。财务演示执行按分比较及重复、缺失检查，不是实际财务系统。
- `tests/demo.test.mjs` 检查交互样例的数据逻辑，不证明参考案例的完整后端已经实现。

## 文件

`dist/index.html` 为首页，`dist/projects/` 为项目说明，`dist/resume.html` 为参考简历。样例数据与纯函数位于 `dist/assets/demo-data.js`。

LeiBox 玻璃文件夹已接入真实项目路由；保留完整原始源码与来源说明，见 `src/leibox/README.md`。`build-leibox.mjs` 编译并适配组件，`build-pages.mjs` 与 `build-portfolio.mjs` 生成网站页面。
