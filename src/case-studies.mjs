import fs from 'node:fs';

const repo='https://github.com/Aaaaqiiii/jiaqi-ai-portfolio';
const source=repo+'/blob/main/dist/assets/demo-data.js';
const tests=repo+'/blob/main/tests/demo.test.mjs';
const personalWork={frames:'视频改编流程、画布交互与任务方案',creators:'资料建模、条件筛选与候选导出',finance:'金额处理、差异核验与结果导出'};
const engineering={
 frames:`<h3>输入固定，重试才有依据</h3><p>任务输入快照包含商品资料版本、分镜版本、模型参数与素材引用。改变任一输入都创建新修订；重试同一修订时先查询已有供应商任务。</p><pre><code>{
  "task_id": "demo-shot-01",
  "revision": 2,
  "product_doc_version": "v3",
  "script_version": "v2",
  "model": "selected-model",
  "duration_seconds": 6
}</code></pre><p class="technical-note">任务输入契约设计；以上为示意字段。</p><h3>检索策略如何验收</h3><p>先用权限和型号约束过滤，再合并关键词与向量候选。RRF 按排名融合，避免直接相加不同量纲的检索分数；Rerank 只重排召回候选。</p><p>评估集需要覆盖相近型号、新旧资料冲突、无证据问题。对比关键词、向量、混合检索三组基线，分别记录 Recall@K、引用支持率、P95 延迟及单次成本。</p>`,
 creators:`<h3>硬条件不能交给语义相似度</h3><p>预算、平台和报价有效期在服务端执行 SQL 约束。检索限定到返回的账号集合；生成理由时引用资料片段，最终再次检查账号是否属于候选集合。</p><h3>推荐对象是账号，不是资料片段</h3><p>检索到多个片段后按账号聚合，避免资料多的账号占据全部结果。报价快照记录来源、版本和有效期，历史清单读取快照而非最新报价。</p><h3>当前可运行代码</h3><p><code>selectCreators</code> 同时检查预算与所有搜索词；关键词匹配覆盖名称、风格与依据字段。这里只执行确定性筛选，不把关键词匹配称为语义检索。</p>`,
 finance:`<h3>先分组，再判断关联关系</h3><p><code>reconcile</code> 将两侧记录按编号存入 Map，再遍历编号并集。先判断重复，随后判断缺失；只有两边各一条记录时才计算差额。</p><p>按记录数计，分组和合并为 O(n + m)，结果排序为 O(k log k)，k 为不同编号数；不会做两份表的笛卡尔连接。</p><h3>恢复边界</h3><p>服务方案把批次数据与检查点放在同一数据库事务中。文件输出采用独立状态：生成临时产物、核对内容、登记为可下载。测试时分别在提交前、提交后、文件登记前中断，检查重复执行是否改变结果。</p><h3>当前可运行代码</h3><p>浏览器金额按整数分计算；测试覆盖两位小数解析、异常输入、重复记录、单边缺失和预算筛选。Python 的 Decimal / ETL 属于服务方案，未借用浏览器测试作为后端验收结果。</p>`
};
function evidence(item){return `<section class="evidence-block" aria-label="工程依据"><div class="evidence-toolbar"><a href="${item.action[1]}" target="_blank" rel="noopener noreferrer">${item.slug==='frames'?'界面与设计材料':'业务函数源码'} ↗</a>${item.slug!=='frames'?`<a href="${tests}" target="_blank" rel="noopener noreferrer">测试代码 ↗</a><button type="button" class="tactile-button" data-run-checks="${item.slug}" aria-controls="check-results" aria-expanded="false"><span class="button-outer"><span class="button-inner"><span>运行检查</span></span></span></button>`:''}</div>${item.slug!=='frames'?'<div id="check-results" class="check-results" aria-live="polite" hidden></div>':''}<details class="engineering-details"><summary>技术取舍与验证<span aria-hidden="true">+</span></summary><div>${engineering[item.slug]}</div></details></section>`;}
const table=(heads,rows)=>`<div class="decision-scroll" tabindex="0" role="region" aria-label="${heads.join('、')}"><table class="decision-table"><thead><tr>${heads.map(x=>`<th scope="col">${x}</th>`).join('')}</tr></thead><tbody>${rows.map(row=>`<tr>${row.map((x,i)=>i===0?`<th scope="row">${x}</th>`:`<td>${x}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
const chain=items=>`<ol class="technical-chain">${items.map(([a,b])=>`<li><strong>${a}</strong><span>${b}</span></li>`).join('')}</ol>`;

export const cases=[{
 slug:'frames',number:'01',title:'帧序',subtitle:'电商视频创作工作流',
 intro:'从参考视频中提取镜头结构，结合目标商品资料组织脚本与分镜。重点是资料用对、修改可追溯，以及单个镜头可以重做。',
 scope:'Fynix 本地界面展示；下文 RAG 与任务服务为扩展方案。',
 action:['公开展示仓库 ↗','https://github.com/Aaaaqiiii/fynix-studio-showcase'],
 sections:[
 ['资料怎么进入脚本',`<p>参考视频提供创作方式，商品资料提供事实依据。两类内容分开检索，避免把参考商品的参数写进目标商品的脚本。</p><div class="reference-split"><div><span>参考视频</span><strong>结构、节奏、镜头</strong><p>保留叙事方式，重新组织内容。</p></div><div><span>商品资料</span><strong>型号、参数、适用范围</strong><p>选择有效版本，保留原始出处。</p></div><div class="reference-result"><span>脚本与分镜</span><p>商品主张关联证据，创作表达交由编辑确认。</p></div></div>`],
 ['商品知识检索',`<p>相近型号和新旧资料混用，是这套 RAG 方案优先处理的问题。</p>${chain([
 ['限定资料范围','按访问权限、商品型号、资料版本与适用范围过滤。'],
 ['混合召回与排序','关键词检索与 Embedding 向量检索并行；RRF 融合候选，再用 Rerank 排序。'],
 ['绑定生成依据','把选定版本和引用片段写入任务输入快照。资料更新后，旧任务仍能回到当时的依据。']
 ])}<p>Agentic RAG 只用于需要跨资料查证的请求：拆解问题、补充检索，并设置轮数与费用上限。没有证据的参数保持待确认。</p>`],
 ['一个镜头失败之后',`<p>React Flow 表达镜头依赖，任务记录各节点的输入与产物。Node.js 与 BullMQ 处理异步执行，FFmpeg 负责媒体后处理。</p>${table(['发生什么','处理方式'],[
 ['提交超时，受理状态不明','先查询供应商任务状态，确认后再决定是否重提。'],
 ['单个镜头生成失败','保留其他镜头产物，只重跑失败节点及其受影响的后续步骤。'],
 ['拼接或转码失败','复用已生成素材，单独重试后处理。']
 ])}<p class="technical-note">方案数据层：PostgreSQL 保存任务与版本，pgvector 保存向量。公开仓库提供界面截图与设计说明。</p>`]
 ],next:'creators'
},{
 slug:'creators',number:'02',title:'达人选型工作台',subtitle:'候选筛选、报价与推荐依据',
 intro:'同一个达人可能有多份报价，合适的内容风格也不等于符合预算。将筛选条件、报价来源和推荐依据放进同一份清单，便于核对选择。',
 scope:'可操作的关键词与预算筛选样例，使用虚构数据；SQL / RAG 为后端方案。',
 action:['样例源码 ↗',source],
 sections:[
 ['把筛选结果落到清单',`<p>上方样例将预算与搜索词同时作为条件。预算设为 ¥10,000 时，只留下报价 ¥8,500 的「乔的厨房」；导出的 CSV 与当前候选一致。</p><div class="case-observation"><span>这份样例已实现</span><p>关键词筛选、预算限制、空结果处理、候选导出。</p></div><p>进一步的选型方案需要保留「为什么推荐」和「当时采用哪份报价」，否则资料更新后，很难还原一次选择。</p>`],
 ['条件筛选与语义检索',`${chain([
 ['SQL：先满足硬性条件','筛选预算、平台、合作形式与报价有效期，得到可选账号。'],
 ['RAG：补充内容依据','仅在授权候选范围内检索达人介绍和合作记录，使用 Hybrid Search 与 Rerank 查找相关片段。'],
 ['按账号整理推荐','同一账号的多个片段合并呈现；理由附资料来源，避免资料量多的达人占满候选列表。']
 ])}<p>未检索到合作记录时，结果显示资料不足。推荐说明不把证据缺失解释为没有合作经验。</p>`],
 ['保留选型时的报价',`${table(['记录','保留什么'],[
 ['平台账号','平台与稳定的账号标识；同名记录不自动合并。'],
 ['报价版本','来源、合作形式、权益、费用口径与有效期。'],
 ['选型清单','引用的报价版本、推荐片段及待确认事项。']
 ])}<p>外部同步更新指标，人工备注单独保存。编辑提交携带版本号，发现冲突时提示重新核对，避免后来一次保存覆盖前面的修改。</p><p class="technical-note">后端方案：FastAPI / Pydantic，PostgreSQL / pgvector。前端样例独立运行，可直接查看筛选函数与测试。</p>`]
 ],next:'finance'
},{
 slug:'finance',number:'03',title:'财务报表核验',subtitle:'定位差额、缺失与重复记录',
 intro:'把两份数据按业务编号对齐，区分金额不一致、单边缺失和重复记录，再回到对应明细核对。金额计算由确定规则完成。',
 scope:'浏览器核验样例使用虚构数据；报表 ETL 与中断恢复为服务设计。',
 action:['核验源码 ↗',source],
 sections:[
 ['三类异常，分开处理',`${table(['样例记录','核验结果','处理方式'],[
 ['DEMO-001','1,250.00 − 1,280.00 = −30.00','保留两侧金额与差额，核对原始记录。'],
 ['DEMO-003','来源 B 缺失','标记缺失，不把空值按零计算。'],
 ['DEMO-004','来源 B 重复 2 笔','停止该编号的差额比较，先确认重复原因。']
 ])}<p>「全部」保留一致记录作为对照，三个筛选项分别查看异常。CSV 导出包含完整核验结果。</p>`],
 ['金额与公式的边界',`<div class="money-example"><span>浏览器样例 · 整数分</span><div><code>1,250.00 → 125000</code><code>1,280.00 → 128000</code><strong>125000 − 128000 = −3000 分</strong></div></div><p>样例先把两位小数金额转换成整数分，再计算差额；空文本、超过两位小数和超出安全范围的输入会被拒绝。</p><p>Python 服务方案使用 Decimal，并明确舍入阶段。openpyxl 读取公式和缓存值，但不执行 Excel 公式重算；没有可信缓存或已确认计算规则的单元格，留待复核。</p>`],
 ['从文件到可追溯报表',`${chain([
 ['导入与标准化','保留文件、工作表和行号；统一字段与金额单位，按业务粒度检查重复。'],
 ['分批核验','批次数据与检查点在同一事务内提交，中断后从已提交的位置继续。'],
 ['发布结果','先生成版本化文件，再登记下载地址；恢复时核对文件与登记状态。']
 ])}<p>数据库提交与文件写入不是同一事务，因此「生成成功」与「可供下载」分开记录。</p><p class="technical-note">服务方案：Python、openpyxl、Decimal、SQLite。公开样例已覆盖金额解析、缺失与重复识别，测试与源码一同提供。</p>`]
 ],next:'frames'
}];

export function renderCaseStudies(){
 const demos=JSON.parse(fs.readFileSync('src/demo-fragments.json','utf8'));
 fs.mkdirSync('dist/projects',{recursive:true});
 for(const item of cases){
  const next=cases.find(c=>c.slug===item.next);
  const demo=demos[item.slug].replaceAll('href="assets/','href="../assets/').replaceAll('src="assets/','src="../assets/').replace('loading="lazy"','loading="eager"');
  const html=`<!doctype html><html lang="zh-CN"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${item.title} — 王嘉祺</title><meta name="description" content="${item.intro}"><link rel="canonical" href="https://aaaaqiiii.github.io/jiaqi-ai-portfolio/projects/${item.slug}.html"><link rel="icon" href="../assets/favicon.svg"><link rel="stylesheet" href="../assets/style.css"><link rel="stylesheet" href="../assets/portfolio.css"><link rel="stylesheet" href="../assets/leibox/tactile-button.css"><link rel="stylesheet" href="../assets/cases.css"><link rel="stylesheet" href="../assets/recruiter.css"></head><body class="project-detail case-${item.slug}"><header class="site-nav"><a class="name-mark" href="../index.html">嘉祺<span>·</span></a><nav aria-label="主导航"><a href="../index.html#projects">作品</a><a href="../resume.html">简历</a><a class="github-nav" href="https://github.com/Aaaaqiiii" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav></header><main class="study"><a class="study-back" href="../index.html#${item.slug==='frames'?'frames':item.slug}">← 全部作品</a><header class="study-header"><p class="study-category">${item.subtitle}</p><h1>${item.title}</h1><p class="study-intro">${item.intro}</p><div class="contribution-strip"><div><span>个人负责</span><p>${personalWork[item.slug]}</p></div><div><span>开发方式</span><p>个人项目 · AI 辅助开发</p></div></div><div class="study-meta"><p>${item.scope}</p></div></header><div class="detail-stage stage-${item.slug==='frames'?'video':item.slug}" id="demo">${demo}</div>${evidence(item)}<div class="study-sections">${item.sections.map(([title,body],index)=>`<section class="study-section" id="part-${index+1}"><h2><span>0${index+1}</span>${title}</h2><div class="study-copy">${body}</div></section>`).join('')}</div><footer class="study-next"><a href="../index.html#projects">全部作品</a><a class="next-project" href="${next.slug}.html"><span>下一个项目</span><strong>${next.title} ↗</strong></a></footer></main><script type="module" src="../assets/main.js"></script><script type="module" src="../assets/evidence.js"></script></body></html>`;
  fs.writeFileSync(`dist/projects/${item.slug}.html`,html);
 }
}
