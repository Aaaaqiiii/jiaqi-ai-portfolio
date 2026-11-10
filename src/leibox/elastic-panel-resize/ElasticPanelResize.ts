import { mountElasticPanelResize, type ElasticPanelResizeOptions } from "./ElasticPanelResizeEngine.js";
import type { MotionController } from "./motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: ElasticPanelResizeOptions = {}): MotionController {
  return mountElasticPanelResize(target, options);
}
export type { ElasticPanelResizeOptions };
