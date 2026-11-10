import {mountElasticPanelResize} from './leibox/ElasticPanelResize.js';
const dialog=document.getElementById('profile-dialog');
if(dialog){
 let component,previousFocus,start=null,suppressClick=false;
 const close=()=>dialog.close();
 const open=(drag=false)=>{
  if(dialog.open)return;
  previousFocus=document.activeElement;
  dialog.toggleAttribute('data-dragging',drag);
  dialog.showModal();document.documentElement.classList.add('profile-open');
  component=mountElasticPanelResize(document.getElementById('profile-surface'),{height:innerHeight,startClosed:drag,onClose:()=>{suppressClick=true;close();}});
  const root=component.root,panel=root.querySelector('.er-panel'),handle=root.querySelector('.er-handle');
  panel.append(document.getElementById('profile-content').content.cloneNode(true));
  panel.setAttribute('aria-label','个人简介与联系方式');
  handle.setAttribute('aria-label','向左拖动调宽，向右拖到底关闭个人介绍；也可使用左右方向键');
  const style=document.createElement('link');style.rel='stylesheet';style.href=new URL('./profile.css',import.meta.url).href;root.append(style);
  const button=root.querySelector('[data-profile-close]');button.addEventListener('click',close);if(!drag)button.focus();
  root.querySelector('.er-scene').addEventListener('click',event=>{if(event.target.classList.contains('er-scene'))close();});
 };
 for(const button of document.querySelectorAll('[data-profile-open]:not(.profile-tab)'))button.addEventListener('click',()=>open());
 const tab=document.querySelector('.profile-tab');
 tab.addEventListener('click',()=>{if(suppressClick){suppressClick=false;return;}open();});
 tab.addEventListener('pointerdown',event=>{
  if(event.button!==0)return;
  suppressClick=false;start={clientX:event.clientX,clientY:event.clientY,pointerId:event.pointerId,pointerType:event.pointerType,button:0,preventDefault(){}};
  tab.setPointerCapture(event.pointerId);
 });
 tab.addEventListener('pointermove',event=>{
  if(!start||start.clientX-event.clientX<=4)return;
  const beginning=start;start=null;suppressClick=true;
  open(true);component.beginDrag(beginning);
 });
 for(const type of ['pointerup','pointercancel','lostpointercapture'])tab.addEventListener(type,()=>{start=null;});
 dialog.addEventListener('close',()=>{component?.destroy();component=null;document.documentElement.classList.remove('profile-open');previousFocus?.focus();});
 dialog.addEventListener('keydown',event=>{if(event.key==='Escape'){event.preventDefault();event.stopPropagation();close();}},true);
 addEventListener('resize',()=>component?.update({height:innerHeight}));
 addEventListener('pagehide',event=>{if(!event.persisted)component?.destroy();});
}
