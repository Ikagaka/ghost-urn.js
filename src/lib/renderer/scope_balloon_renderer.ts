import {RendererBase} from "../renderer";
import {ScopeBalloon} from "../scope_balloon";
import {BalloonSurfaceRenderer} from "./balloon_surface_renderer";

export interface ScopeBalloonRenderer extends RendererBase {
    model: ScopeBalloon;
    attachModel(model: ScopeBalloon): void;
    createChildRenderer(): BalloonSurfaceRenderer;
    removeChildRenderer(renderer: BalloonSurfaceRenderer): void;
    detachModel(): void;
}
