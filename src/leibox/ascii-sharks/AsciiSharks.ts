import { mountAsciiSharks, type AsciiSharksOptions } from "./AsciiSharksEngine.js";
import type { MotionController } from "./motion-runtime";

/** Mount into any DOM node. Call update() for options and destroy() on removal. */
export function mount(target: HTMLElement, options: AsciiSharksOptions = {}): ReturnType<typeof mountAsciiSharks> {
  return mountAsciiSharks(target, options);
}
export type { AsciiSharksOptions };
