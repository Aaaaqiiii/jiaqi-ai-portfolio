import {mountGlassFolder} from './leibox/GlassFolder.js';
const target=document.getElementById('project-folders');
if(target){
 const component=mountGlassFolder(target,{height:380});
 // The page is static; preserve state on bfcache navigation, clean up on actual exit.
 addEventListener('pagehide',event=>{if(!event.persisted)component.destroy();});
}
