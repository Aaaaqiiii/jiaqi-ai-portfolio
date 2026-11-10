import fs from 'node:fs';
import {stripTypeScriptTypes} from 'node:module';
const to='dist/assets/leibox/';
fs.mkdirSync(to,{recursive:true});
fs.writeFileSync(to+'motion-runtime.js',stripTypeScriptTypes(fs.readFileSync('src/leibox/ascii-sharks/motion-runtime.ts','utf8')));
for(const [folder,name] of [['ascii-sharks','AsciiSharks'],['elastic-panel-resize','ElasticPanelResize']]){
 let code=fs.readFileSync(`src/leibox/${folder}/${name}Engine.js`,'utf8').replace(/\r\n/g,'\n').replace('"./motion-runtime"','"./motion-runtime.js"');
 if(name==='ElasticPanelResize'){
  const match=code.match(/const scope = createSurface\(target, (.*), options\);/);
  const config=JSON.parse(match[1]);config.responsive=true;
  config.css+='.er-scene{background:transparent;user-select:auto}.er-scene::before{display:none}.er-panel{top:0;right:0;bottom:0;border-radius:0;border:0;border-left:1px solid #d3d5d4;box-shadow:none;background:#fafaf8;overflow:auto;overscroll-behavior:contain}.er-handle{top:0;bottom:0}.er-handle svg{opacity:max(.35,var(--er-reveal))}.er-handle:focus-visible::after{border-radius:0}';
  code=code.replace(match[0],`const scope = createSurface(target, ${JSON.stringify(config)}, options);`)
   .replace('const initial=.3865, min=.276, max=.5;','')
   .replace('let position=initial*width, target=position, velocity=0;','const initialLeft=()=>Math.max(16,width-440), minLeft=()=>Math.max(16,width-680), maxLeft=()=>width; let position=options.startClosed?width:initialLeft(), target=position, velocity=0;')
   .replaceAll('initial*width','initialLeft()').replaceAll('min*width','minLeft()').replaceAll('max*width','maxLeft()')
   .replace('width=next;draw();','width=next;target=legal(target);position=target;draw();')
   .replace("handle.setAttribute('aria-valuenow',String(value));","handle.setAttribute('aria-valuenow',String(value));handle.setAttribute('aria-valuemin',String(Math.round((1-maxLeft()/width)*100)));handle.setAttribute('aria-valuemax',String(Math.round((1-minLeft()/width)*100)));")
   .replace('`${value} percent wide`','`面板宽度 ${value}%`')
   .replace('ink.style.strokeWidth=String(thickness);','ink.style.strokeWidth=String(Math.max(3,thickness));')
   .replace('(() => {','let beginExternalDrag;\n(() => {')
   .replace("handle.addEventListener('pointerdown',event=>{","const beginDrag=event=>{")
   .replace("handle.setPointerCapture(event.pointerId);scene.dataset.state='dragging';show();\n  });","drag.opened=width-target>80;handle.setPointerCapture(event.pointerId);scene.dataset.state='dragging';show();\n  };handle.addEventListener('pointerdown',beginDrag);beginExternalDrag=beginDrag;")
   .replace("scene.dataset.state='dragging';updateValue();draw();wake();","scene.dataset.state='dragging';updateValue();draw();wake();\n    if(width-raw>80)drag.opened=true;\n    if(drag.opened&&raw>=width-8){options.onClose?.();}")
   .replace('if(cancel)target=previous.start;','if(cancel)target=previous.start;\n    if(width-target<80){options.onClose?.();return;}\n    target=Math.min(target,Math.max(16,width-340));')
   .replace('target=legal(value);updateValue();','target=legal(value);updateValue();if(width-target<80){options.onClose?.();return;}')
   .replace('return scope.controller;','return {...scope.controller,beginDrag:event=>beginExternalDrag(event)};');
 }
 fs.writeFileSync(to+name+'.js','// LeiBox adaptation. Original source and notices retained in src/leibox.\n'+code);
}
console.log('Built LeiBox shark ocean and elastic profile panel.');
