import type { MotionOptions, MotionController } from "./motion-runtime";
export type GlassFolderOptions = MotionOptions;
export function mountGlassFolder(target: HTMLElement, options?: GlassFolderOptions): MotionController;
