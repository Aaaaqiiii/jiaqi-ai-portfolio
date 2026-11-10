import {mountElasticPanelResize} from './leibox/ElasticPanelResize.js';
const dialog=document.getElementById('profile-dialog');
if(dialog){
 let component,previousFocus;
 const close=()=>dialog.close();
 const open=()=>{
  if(dialog.open)return;
  previousFocus=document.activeElement;
  dialog.showModal();document.documentElement.classList.add('profile-open');
  component=mountElasticPanelResize(document.getElementById('profile-surface'),{height:innerHeight});
  const root=component.root,panel=root.querySelector('.er-panel'),handle=root.querySelector('.er-handle');
  panel.append(document.getElementById('profile-content').content.cloneNode(true));
  panel.setAttribute('aria-label','个人简介与联系方式');
  handle.setAttribute('aria-label','拖动或使用左右方向键调整个人介绍面板宽度');
  const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./profile.css',import.meta.url).href;root.append(style);
  const button=root.querySelector('[data-profile-close]');button.addEventListener('click',close);button.focus();
  root.querySelector('.er-scene').addEventListener('click',event=>{if(event.target.classList.contains('er-scene'))close();});
 };
 for(const button of document.querySelectorAll('[data-profile-open]'))button.addEventListener('click',open);
 const tab=document.querySelector('.profile-tab');let startX=null;
 tab.addEventListener('pointerdown',event=>{startX=event.clientX;tab.setPointerCapture(event.pointerId);});
 tab.addEventListener('pointermove',event=>{if(startX!==null&&startX-event.clientX>24){startX=null;open();}});
 for(const type of ['pointerup','pointercancel','lostpointercapture'])tab.addEventListener(type,()=>{startX=null;});
 dialog.addEventListener('close',()=>{component?.destroy();component=null;document.documentElement.classList.remove('profile-open');previousFocus?.focus();});
 dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}},true);
 addEventListener('resize',()=>component?.update({height:innerHeight}));
 addEventListener('pagehide',event=>{if(!event.persisted)component?.destroy();});
}
