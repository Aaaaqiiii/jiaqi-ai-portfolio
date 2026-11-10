import fs from 'node:fs';
const fragmentsPath='src/demo-fragments.json';
if(!fs.existsSync(fragmentsPath)){
 const old=fs.readFileSync('dist/index.html','utf8');const fragments={};
 for(const [name,cls] of [['frames','video-frame'],['creators','creator-frame'],['finance','finance-frame']]){const start=old.indexOf(`<div class="screen-frame ${cls}">`);fragments[name]=old.slice(start,old.indexOf('<div class="project-foot">',start)).trim();}
 fs.writeFileSync(fragmentsPath,JSON.stringify(fragments,null,2));
}
const demos=JSON.parse(fs.readFileSync(fragmentsPath,'utf8'));
const meta=`<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="王嘉祺的 AI 应用开发作品集：帧序、达人选型、财务核验。"><link rel="icon" href="assets/favicon.svg"><link rel="stylesheet" href="assets/style.css"><link rel="stylesheet" href="assets/portfolio.css">`;
const nav=`<header class="site-nav"><a class="name-mark" href="index.html">嘉祺<span>·</span></a><nav aria-label="主导航"><a href="#projects">作品</a><a href="resume.html">简历</a><a class="github-nav" href="https://github.com/Aaaaqiiii" target="_blank" rel="noopener noreferrer">GitHub ↗</a></nav></header>`;
const heading=(n,title,desc,url)=>`<div class="work-heading"><div><span class="work-number">${n}</span><h2>${title}</h2><p>${desc}</p></div><a class="round-link" href="projects/${url}.html" aria-label="查看${title}项目">↗</a></div>`;
fs.writeFileSync('dist/index.html',`<!doctype html><html lang="zh-CN"><head>${meta}<title>王嘉祺 — AI 应用开发</title><link rel="canonical" href="https://jiaqi-ai-portfolio.lucky-giant-0226.chatgpt.site/"><meta property="og:title" content="王嘉祺 — AI 应用开发"><meta property="og:image" content="https://jiaqi-ai-portfolio.lucky-giant-0226.chatgpt.site/assets/fynix-script.png"></head><body class="portfolio-home">${nav}<main>
<section class="intro"><div class="intro-heading"><div><p class="intro-eyebrow"><i></i> AI 应用开发工程师</p><h1>王嘉祺<span>Jiaqi.</span></h1></div><div class="intro-side"><p>视频创作、知识检索<br>与业务自动化。</p><a href="resume.html">查看简历 ↗</a></div></div><div id="project-folders" class="project-folders" aria-label="项目资料"></div><noscript><p class="fallback-links"><a href="projects/frames.html">帧序 ↗</a><a href="projects/creators.html">达人选型 ↗</a><a href="projects/finance.html">财务核验 ↗</a></p></noscript><div class="intro-bottom"><span>SELECTED WORK / 2026</span><a href="#projects">向下看作品 ↓</a></div></section>
<section class="selected-work" id="projects"><div class="selected-heading"><h2>项目精选<span>03</span></h2></div><div class="work-grid">
<article class="work-card work-feature" id="frames">${heading('01','帧序','电商视频创作与生产','frames')}<div class="work-stage stage-video">${demos.frames}</div><div class="work-caption"><span>React · Node.js · React Flow</span><a href="projects/frames.html">查看项目 ↗</a></div></article>
<article class="work-card" id="creators">${heading('02','达人选型','资源整理与候选推荐','creators')}<div class="work-stage stage-creators">${demos.creators}</div><div class="work-caption"><span>Python · SQL · RAG 方案</span><a href="projects/creators.html">查看项目 ↗</a></div></article>
<article class="work-card" id="finance">${heading('03','财务核验','报表自动化与差异追踪','finance')}<div class="work-stage stage-finance">${demos.finance}</div><div class="work-caption"><span>Python · ETL · Decimal</span><a href="projects/finance.html">查看项目 ↗</a></div></article>
</div></section><section class="about-simple" id="about"><div><span class="work-number">ABOUT</span><h2>关于我</h2></div><div><p>网络工程本科，关注 AI 在内容创作与业务流程中的应用。</p><a href="resume.html">查看简历案例 ↗</a></div></section></main><footer class="site-footer"><span>© 2026 王嘉祺</span><div><a href="https://github.com/Aaaaqiiii/jiaqi-ai-portfolio" target="_blank" rel="noopener noreferrer">网站源码 ↗</a><a href="https://leibox.pantoria.cn/docs/animations/glass-folder" target="_blank" rel="noopener noreferrer">LeiBox</a></div></footer><script type="module" src="assets/main.js"></script><script type="module" src="assets/portfolio.js"></script></body></html>`);
for(const [slug,title] of [['frames','帧序'],['creators','达人选型'],['finance','财务核验']]){
 const file=`dist/projects/${slug}.html`;let html=fs.readFileSync(file,'utf8');
 html=html.replace('</head>','<link rel="stylesheet" href="../assets/portfolio.css"></head>').replace('<body>','<body class="project-detail">');
 html=html.replace(/<header class="nav">[\s\S]*?<\/header>/,nav.replaceAll('href="index.html"','href="../index.html"').replace('href="#projects"','href="../index.html#projects"').replace('href="resume.html"','href="../resume.html"'));
 html=html.replace(/<div class="case-cover">[\s\S]*?<\/div>/,'');
 const demo=demos[slug].replaceAll('href="assets/','href="../assets/').replaceAll('src="assets/','src="../assets/');
 const stage=`<div class="detail-stage stage-${slug==='frames'?'video':slug}" id="demo">${demo}</div>`;
 html=html.replace('<div class="case-body">',stage+'<div class="case-body">');
 html=html.replace(/href="\.\.\/index.html#(?:creators|finance)"(?=>试用交互样例)/,'href="#demo"');
 let i=0;const toc=[];html=html.replace(/<section class="case-block"><h2>(.*?)<\/h2>/g,(_,label)=>{const id='part-'+(++i);toc.push(`<a href="#${id}">${label}</a>`);return `<section class="case-block" id="${id}"><h2>${label}</h2>`;});
 html=html.replace('<div class="case-body">',`<div class="case-layout"><aside class="case-toc"><span>${title}</span>${toc.join('')}</aside><div class="case-body">`).replace('<footer class="case-footer">','</div><footer class="case-footer">');
 html=html.replace('</body>','<script type="module" src="../assets/main.js"></script></body>');fs.writeFileSync(file,html);
}
let resume=fs.readFileSync('dist/resume.html','utf8').replace('</head>','<link rel="stylesheet" href="assets/portfolio.css"></head>');fs.writeFileSync('dist/resume.html',resume);
console.log('Built portfolio and interactive project pages.');
