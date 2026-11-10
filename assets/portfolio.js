import {mountAsciiSharks} from './leibox/AsciiSharks.js';
import {mountGlassFolder} from './leibox/GlassFolder.js';
const foldersTarget=document.getElementById('project-folders');
if(foldersTarget){
 const projects=[
  {slug:'frames',label:'帧序',description:'电商视频创作与生产',art:'aurora',seed:3,tone:'light',files:[['项目介绍','工作流'],['创作界面','画布 · 分镜'],['技术实现','RAG · 任务快照']]},
  {slug:'creators',label:'达人选型',description:'资源整理与候选推荐',art:'verdant',seed:7,tone:'light',files:[['项目介绍','候选推荐'],['筛选演示','预算 · 关键词'],['技术实现','检索 · 账号聚合']]},
  {slug:'finance',label:'财务核验',description:'报表自动化与差异追踪',art:'glacier',seed:11,tone:'light',files:[['项目介绍','报表核验'],['差异演示','缺失 · 重复'],['技术实现','金额精度 · 恢复']]}
 ].map(project=>({...project,art:{style:'streak',colors:['#ffffff','#e8e8e8','#bdbdbd','#f5f5f5','#dedede','#ffffff'],scale:.7,warp:1.6,angle:.35,gloss:.15,veins:0},action:'add',href:`projects/${project.slug}.html`,files:project.files.map(([name,meta],index)=>({name,meta,href:`projects/${project.slug}.html${['','#demo','#engineering'][index]}`}))}));
 const component=mountGlassFolder(foldersTarget,{height:440,folders:projects});
 foldersTarget.querySelector('.folder-fallback')?.remove();
 addEventListener('pagehide',event=>{if(!event.persisted)component.destroy();});
}
const target=document.getElementById('shark-ocean');
if(target){
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const component=mountAsciiSharks(target,{height:Math.round(target.getBoundingClientRect().height),showComposer:false,fishCount:150,speed:.65,seed:7});
 component.root.querySelector('canvas').setAttribute('aria-label','字符鲨鱼与鱼群。移动或点击惊散鱼群；空格暂停，方向键移动，回车制造水波。');
 const style=document.createElement('style');style.textContent='.ao-scene{background:#fff!important;min-height:0!important;height:var(--motion-height)!important}.ao-canvas{outline-offset:-3px}';component.root.append(style);
 const resize=new ResizeObserver(()=>component.update({height:Math.round(target.getBoundingClientRect().height)}));resize.observe(target);
 const button=document.querySelector('.ocean-pause'),scene=component.root.querySelector('.ao-scene');
 const sync=()=>{const paused=media.matches||scene.dataset.paused==='true';button.textContent=paused?'播放动画':'暂停动画';button.setAttribute('aria-pressed',String(paused));button.disabled=media.matches;};
 button.addEventListener('click',()=>component.update({paused:scene.dataset.paused!=='true'}));
 const observer=new MutationObserver(sync);observer.observe(scene,{attributes:true,attributeFilter:['data-paused']});media.addEventListener('change',sync);sync();
 addEventListener('pagehide',event=>{if(!event.persisted){observer.disconnect();resize.disconnect();media.removeEventListener('change',sync);component.destroy();}});
}
