import { mountGlassTabMenu, type GlassTabMenuOptions } from "./GlassTabMenuEngine.js";
import type { MotionController } from "./motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: GlassTabMenuOptions = {}): MotionController {
  return mountGlassTabMenu(target, options);
}
export type { GlassTabMenuOptions };
