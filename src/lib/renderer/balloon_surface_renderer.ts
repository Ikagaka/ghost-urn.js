import {BalloonSurface} from "../balloon_surface";
import {RendererBase} from "../renderer";

export interface BalloonSurfaceRenderer extends RendererBase {
    model: BalloonSurface;
    attachModel(model: BalloonSurface): void;
    detachModel(): void;
}
