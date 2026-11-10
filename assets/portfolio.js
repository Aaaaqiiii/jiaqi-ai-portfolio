import {mountAsciiSharks} from './leibox/AsciiSharks.js';
const target=document.getElementById('shark-ocean');
if(target){
 const media=matchMedia('(prefers-reduced-motion: reduce)');
 const component=mountAsciiSharks(target,{height:Math.round(target.getBoundingClientRect().height),showComposer:false,fishCount:150,speed:.65,seed:7});
 component.root.querySelector('canvas').setAttribute('aria-label','字符鲨鱼与鱼群。移动或点击惊散鱼群；空格暂停，方向键移动，回车制造水波。');
 const style=document.createElement('style');style.textContent='.ao-scene{background:#fafaf8!important;min-height:0!important;height:var(--motion-height)!important}.ao-canvas{outline-offset:-3px}';component.root.append(style);
 const resize=new ResizeObserver(()=>component.update({height:Math.round(target.getBoundingClientRect().height)}));resize.observe(target);
 const button=document.querySelector('.ocean-pause'),scene=component.root.querySelector('.ao-scene');
 const sync=()=>{const paused=media.matches||scene.dataset.paused==='true';button.textContent=paused?'播放动画':'暂停动画';button.setAttribute('aria-pressed',String(paused));button.disabled=media.matches;};
 button.addEventListener('click',()=>component.update({paused:scene.dataset.paused!=='true'}));
 const observer=new MutationObserver(sync);observer.observe(scene,{attributes:true,attributeFilter:['data-paused']});media.addEventListener('change',sync);sync();
 addEventListener('pagehide',event=>{if(!event.persisted){observer.disconnect();resize.disconnect();media.removeEventListener('change',sync);component.destroy();}});
}
