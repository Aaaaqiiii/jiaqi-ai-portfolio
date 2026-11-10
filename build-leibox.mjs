import fs from 'node:fs';
import { stripTypeScriptTypes } from 'node:module';
const from='src/leibox/glass-folder/',to='dist/assets/leibox/';
fs.mkdirSync(to,{recursive:true});
fs.writeFileSync(to+'motion-runtime.js',stripTypeScriptTypes(fs.readFileSync(from+'motion-runtime.ts','utf8')));
let engine=fs.readFileSync(from+'GlassFolderEngine.js','utf8').replace('"./motion-runtime"','"./motion-runtime.js"');
const match=engine.match(/const scope = createSurface\(target, (.*), options\);/);
const config=JSON.parse(match[1]);
config.responsive=true;config.height=380;
config.css+=`.glass-folder-demo{min-height:380px;padding:20px 24px 16px;background:transparent;gap:32px}.motion-body{background:transparent}.gf-feedback,.gf-meta,.gf-menu{display:none!important}.gf-key{font-size:0}.gf-key:after{content:'↗';font:22px Arial}.gf-key>*{display:none}.gf-root[data-tone=dark] .gf-key:after{color:#fff}.gf-title{font-family:Arial,'Microsoft YaHei',sans-serif;font-weight:500}.gf-sheet-head{font-family:Arial,'Microsoft YaHei',sans-serif}.gf-sheet-meta{display:none}@media(max-width:800px){.glass-folder-demo{grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;padding:34px 0 10px;min-height:300px}}@media(max-width:560px){.glass-folder-demo{grid-template-columns:1fr;gap:16px;padding:8px 25px 16px;min-height:0}.gf-demo-slot{width:260px;padding-top:0}}`;
engine=engine.replace(match[0],`const scope = createSurface(target, ${JSON.stringify(config)}, options);`);
const projectFiles=[
 [{name:'创作画布',href:'assets/fynix-canvas.png',image:'assets/fynix-canvas.png'},{name:'项目设计',href:'projects/frames.html'},{name:'脚本与分镜',href:'projects/frames.html',image:'assets/fynix-script.png'}],
 [{name:'筛选与报价',href:'projects/creators.html#demo'},{name:'资料与证据',href:'projects/creators.html'},{name:'达人选型',href:'projects/creators.html',art:'glacier'}],
 [{name:'差异明细',href:'projects/finance.html#demo'},{name:'ETL 与核验规则',href:'projects/finance.html'},{name:'财务核验',href:'projects/finance.html',art:'ember'}]
];
engine=engine.replace('const SAMPLE_FILES = [',`const PROJECT_FILES=${JSON.stringify(projectFiles)};\nconst SAMPLE_FILES = [`);
engine=engine.replace('let files=SAMPLE_FILES.map','let files=PROJECT_FILES[index].map');
engine=engine.replace("if(file.art)sheet.append", "if(file.image){const image=document.createElement('img');image.className='gf-sheet-art';image.src=file.image;image.alt=file.name;sheet.append(image);}\n        else if(file.art)sheet.append");
engine=engine.replace("feedback.textContent='Selected: '+file.name;","window.location.href=file.href;");
engine=engine.replace("if(settings.action==='add'){key.setAttribute('aria-label','Add a file to '+settings.label);key.addEventListener('click',add);}","if(settings.action==='visit'){key.setAttribute('aria-label','查看'+settings.label);key.addEventListener('click',()=>{window.location.href=PROJECT_FILES[index][1].href;});}");
engine=engine.replace("label:'My Files',tone:'light',art:'aurora',seed:3,action:'add'","label:'帧序',tone:'light',art:'aurora',seed:3,action:'visit'")
 .replace("label:'Studio',tone:'dark',art:'ember',seed:7,action:'more'","label:'达人选型',tone:'dark',art:'ember',seed:7,action:'visit'")
 .replace("label:'References',tone:'light',art:'glacier',seed:11,action:'add'","label:'财务核验',tone:'light',art:'glacier',seed:11,action:'visit'");
engine=engine.replace("`${open?'Close':'Open'} ${settings.label}, ${files.length} ${files.length===1?'item':'items'}`","`${open?'收起':'展开'}${settings.label}项目资料`");
fs.writeFileSync(to+'GlassFolder.js','// Adapted from LeiBox Glass Folder Cards. Original source and notices: src/leibox.\n'+engine);
console.log('Built LeiBox portfolio folders.');

// LeiBox's source explicitly separates the demo body rule from reusable button CSS.
const buttonSource=fs.readFileSync('src/leibox/tactile-push-button/TactilePushButtonEngine.js','utf8');
const buttonConfig=JSON.parse(buttonSource.match(/const scope = createSurface\(target, (.*), options\);/)[1]);
const buttonCss=buttonConfig.css.slice(buttonConfig.css.indexOf('.tactile-button {'));
fs.writeFileSync(to+'tactile-button.css','/*! Tactile Push Button — LeiBox; community submission by 少荃 (Douyin: 宝龙体育优品小铺). Original package retained in src/leibox/tactile-push-button. */\n'+buttonCss);
