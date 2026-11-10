import fs from 'node:fs';
const nav=(root='')=>`<header class="nav"><div class="wrap nav__bar"><a class="wordmark" href="${root}index.html">王嘉祺<span class="wordmark-dot">.</span></a><nav aria-label="主导航"><a href="${root}index.html#projects">作品</a><a href="${root}index.html#about">关于</a><a href="https://github.com/Aaaaqiiii" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav></div></header>`;
const head=(title,root='')=>`<!doctype html><html lang="zh-CN" data-motion><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} · 王嘉祺</title><meta name="description" content="${title}，王嘉祺的项目作品集。"><link rel="icon" href="${root}assets/favicon.svg"><link rel="stylesheet" href="${root}assets/style.css"><link rel="stylesheet" href="${root}assets/motion.css"></head><body>${nav(root)}`;
const block=(title,body)=>`<section class="case-block"><h2>${title}</h2>${body}</section>`;
const ul=items=>'<ul>'+items.map(x=>'<li>'+x+'</li>').join('')+'</ul>';
const flow=items=>'<div class="case-flow">'+items.map(([a,b])=>`<div class="flow-item"><strong>${a}</strong><span>${b}</span></div>`).join('')+'</div>';
const cases=[{
slug:'frames',title:'帧序',subtitle:'电商视频创作与生产平台',kicker:'视频创作 / 全栈应用',image:'fynix-script.png',alt:'Fynix Studio 本地脚本创作页面',
status:'现有展示来自 Fynix 本地界面。商品知识 RAG 与下述增强架构为参考案例设计；未在此作品集中验证真实模型生成。',
sections:[
['创作流程',flow([['参考与约束','拆解视频结构，明确保留与替换内容。'],['脚本与分镜','结合商品资料生成方案，由创作者确认。'],['镜头与导出','组织生成任务，支持局部重做与结果管理。']])],
['设计重点',ul(['将商品事实与创意参考分别组织。参考视频可以提供叙事结构，不能成为目标商品参数的依据。','生成任务记录资料、分镜、参数与素材版本。改动一个镜头时，识别受影响的结果，而不是重新生成全部内容。','区分提交超时、生成失败和媒体后处理失败；受理状态不明时先核对，避免直接重提付费请求。'])],
['知识检索', '<p>参考方案将产品说明、品牌规范与历史创作资料分类入库，以型号、版本和适用范围过滤事实资料。关键词与向量检索采用 RRF 融合，候选证据再由 Rerank 排序。</p><p>Agentic RAG 用于复合需求的查询拆解与补充检索，受工具范围、轮次和费用预算约束。关键商品主张关联证据，缺失与冲突信息交由人工确认。</p>'],
['技术组织', '<p>React / React Flow 负责编辑交互；Node.js 组织业务接口；PostgreSQL / pgvector 保存业务与检索数据；BullMQ 调度长任务；FFmpeg / FFprobe 完成媒体处理。</p>'],
['可核对材料','<p><a href="https://github.com/Aaaaqiiii/fynix-studio-showcase" target="_blank" rel="noopener noreferrer">Fynix 公开展示仓库 ↗</a></p><p>仓库包含本地画布、脚本及素材改编截图，以及概念架构说明。没有公开公司应用源码。</p>']
]},{
slug:'creators',title:'达人资源与智能选型',subtitle:'条件筛选、报价核对与推荐依据',kicker:'知识检索 / 数据应用',anchor:'creators',
status:'原项目资料支持资源整理、多来源关联与筛选。RAG 选型为参考设计扩展；首页演示仅使用虚构数据执行预算与关键词筛选。',
sections:[
['选型流程',flow([['约束','预算、平台与报价有效期由结构化规则处理。'],['证据','从达人介绍与合作记录中查找风格和场景依据。'],['清单','关联报价版本、资料来源和待确认事项。']])],
['数据建模',ul(['分离达人主体、平台账号、来源记录、报价版本和指标快照。同一账号的多个渠道报价各自保留。','使用平台与可靠的外部账号标识关联记录；同名或缺少标识时请求确认，不根据昵称自动合并。','报价比较同时考虑合作形式、权益、费用口径和有效期。选型清单绑定具体版本，后续更新不会改写历史依据。'])],
['SQL 与 RAG', '<p>先使用 SQL 筛选符合硬性条件的账号，再在授权候选范围内执行 Hybrid Search 与 Rerank。检索片段按账号聚合，避免某位达人因资料数量多占据全部候选位置。</p><p>推荐说明包含匹配理由和引用来源。未找到合作记录只代表证据缺失，不推断没有合作经验。</p>'],
['一致性与评估', '<p>参考方案采用 PostgreSQL / pgvector、FastAPI 与 Pydantic。通过原子版本条件更新处理编辑冲突；区分外部指标与人工字段，防止同步覆盖业务备注。</p><p>评估分别检查硬性条件满足、账号级候选召回、排序质量及推荐理由的证据支持，不以单一“准确率”替代全部判断。</p>'],
['演示范围','<p>交互样例支持搜索、预算筛选和 CSV 导出。人物、报价和合作记录均为虚构，不请求外部模型，不连接真实达人数据。</p><p>原仓库包含内部资料，保持私有；公开仓库只包含此作品集及独立样例。</p>']
]},{
slug:'finance',title:'财务报表自动化与差异核验',subtitle:'确定性计算与可追溯结果',kicker:'业务自动化 / 数据处理',anchor:'finance',
status:'现有资料为私有财务处理归档。下述服务与恢复架构属于参考案例设计；首页提供独立的虚构数据核验样例。',
sections:[
['处理流程',flow([['标准化','解析多来源文件，统一字段、日期和金额单位。'],['核验','按确认粒度关联，分类缺失、重复和金额差异。'],['追溯','输出明细、汇总和异常，保留批次与原始来源。']])],
['数据正确性',ul(['编号按文本处理，区分空值、零值和解析失败。源文件已损失的精度不能通过格式转换恢复。','openpyxl 读取公式与缓存，不承担公式重算。确认过的业务公式转换为确定性规则，无法确认的结果阻止进入正式报表。','金额以 Decimal 计算并明确定标存储与舍入阶段。多笔充值与消耗先按业务粒度聚合，避免关联展开造成重复累计。'])],
['可恢复执行', '<p>分别识别重复文件、重复业务记录和重复任务。分批数据与检查点在同一数据库事务内提交，重跑时复用已完成的标准化结果。</p><p>文件生成与数据库提交不是同一事务。报表先形成版本化产物，再登记为可下载；中断后核对产物与登记状态，不将半成品显示为完成。</p>'],
['技术与验收', '<p>Python / FastAPI 提供任务接口，openpyxl / csv 解析文件，Decimal 完成金额计算，SQLite 保存批次与检查点。WorkBuddy Skill 仅提供调用入口。</p><p>验收覆盖重复输入、主键冲突、公式缓存、金额舍入及处理中断；不将文件生成成功等同于业务核验通过。</p>'],
['演示范围','<p>首页样例在浏览器内将金额文本转换为整数分，核对同一业务编号的两份数据，并区分差额、缺失与重复。重复记录不会被直接相加掩盖。</p><p>样例不读取真实表格、不执行记账或付款。原始公司报表保持私有。</p>']
]}];
fs.mkdirSync('dist/projects',{recursive:true});
for(const c of cases){const hero=c.image?`<div class="case-cover"><img src="../assets/${c.image}" alt="${c.alt}" width="1440" height="1000"></div>`:'';const action=c.anchor?`<a class="btn btn--primary" href="../index.html#${c.anchor}">试用交互样例 ↗</a>`:`<a class="btn btn--primary" href="https://github.com/Aaaaqiiii/fynix-studio-showcase" target="_blank" rel="noopener noreferrer">查看公开仓库 ↗</a>`;fs.writeFileSync(`dist/projects/${c.slug}.html`,head(c.title,'../')+`<main class="case-page"><div class="wrap"><div class="case-header"><a class="case-kicker" href="../index.html#${c.anchor||'projects'}">← 返回作品</a><h1>${c.title}</h1><p class="case-intro">${c.subtitle}</p><div class="case-links">${action}</div></div>${hero}<div class="case-body"><p class="case-status">${c.status}</p>${c.sections.map(([t,b])=>block(t,b)).join('')}</div><footer class="case-footer"><a href="../index.html#projects">全部作品 ↗</a><a href="https://github.com/Aaaaqiiii/jiaqi-ai-portfolio" target="_blank" rel="noopener noreferrer">作品集源码 ↗</a></footer></div></main></body></html>`);}
const resume=`<main class="case-page"><div class="wrap"><div class="case-header"><a class="case-kicker" href="index.html">← 返回作品集</a><h1>王嘉祺</h1><p class="case-intro">AI 应用开发工程师</p><button type="button" class="print-button" data-print>打印 / 保存 PDF</button></div><article class="resume-body"><p class="case-status">参考案例版。以下能力、职责与增强方案来自简历设计，不代表所有功能已实现或上线。实际可核对范围见各项目页。</p><h2>个人优势</h2>${ul(['围绕内容创作和企业流程设计 AI 应用，将模型调用、知识检索、工具执行与人工确认组织为可使用的产品。','以 Python、Node.js 承担后端与任务处理，结合 React 实现交互；关注数据来源、版本关系与失败恢复。','以业务规则和验收条件推进交付，使用 Codex、Claude Code 辅助研发，通过代码审查、联调与样本检查核对结果。'])}<h2>专业技能</h2>${ul(['应用开发：Python、FastAPI、Pydantic、Node.js、React、React Flow。','知识检索：Embedding、结构化分块、元数据过滤、Hybrid Search、RRF、Rerank、证据关联。','执行与评估：工具契约、受约束的 Agentic RAG、任务状态、幂等写入、Recall@K、失败案例分析。','数据与媒体：PostgreSQL、pgvector、SQLite、Redis、BullMQ、openpyxl、Decimal、FFmpeg。'])}<h2>项目经历</h2><h3>帧序 · AI电商视频创作与生产平台</h3>${ul(['设计参考视频拆解与目标商品改编流程，将商品事实、创意参考和保留／替换要求分开组织。','结合商品知识检索与有边界的 Agentic RAG，为脚本分镜提供可追溯依据，对信息缺失或冲突保留人工确认。','通过生成输入快照、节点依赖和持久化任务状态支持局部重做、状态核对与阶段恢复。'])}<h3>达人资源与智能选型工作台</h3>${ul(['拆分达人主体、平台账号、来源记录、报价版本与指标快照，设计分批导入、冲突确认和历史追溯。','将预算与平台约束交给 SQL，在授权候选内进行语义检索和重排序，按账号聚合推荐证据。','通过报价快照、字段归属和版本条件更新处理决策追溯、数据同步与编辑冲突。'])}<h3>财务报表自动化与差异核验平台</h3>${ul(['设计多来源报表 ETL，保留源文件、工作表和行号，区分空值、零值和解析错误。','将已确认公式转为确定性计算，以 Decimal 和明确舍入规则处理金额，避免多对多关联放大汇总。','通过事务检查点和版本化输出处理重复输入、中断恢复及报表发布一致性。'])}<h2>教育背景</h2><p>郑州商学院 · 网络工程 · 本科<br>2022.09—2026.06</p><h2>GitHub</h2><p><a href="https://github.com/Aaaaqiiii">github.com/Aaaaqiiii ↗</a></p></article></div></main><script type="module" src="assets/main.js"></script>`;
fs.writeFileSync('dist/resume.html',head('简历案例')+resume+'</body></html>');
fs.writeFileSync('dist/robots.txt','User-agent: *\nAllow: /\nSitemap: https://jiaqi-ai-portfolio.lucky-giant-0226.chatgpt.site/sitemap.xml\n');
fs.writeFileSync('dist/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+['','projects/frames.html','projects/creators.html','projects/finance.html','resume.html'].map(p=>'<url><loc>https://jiaqi-ai-portfolio.lucky-giant-0226.chatgpt.site/'+p+'</loc></url>').join('')+'</urlset>');
console.log('Built three case pages, reference resume and sitemap.');
