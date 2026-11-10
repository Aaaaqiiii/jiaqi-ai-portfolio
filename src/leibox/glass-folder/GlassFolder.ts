import { mountGlassFolder, type GlassFolderOptions } from "./GlassFolderEngine.js";
import type { MotionController } from "./motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlassFolderOptions = {}): MotionController {
  return mountGlassFolder(target, options);
}
export type { GlassFolderOptions };
