import {ShellSurface} from "../shell_surface";
import {RendererBase} from "../renderer";

export interface ShellSurfaceRenderer extends RendererBase {
    model: ShellSurface;
    attachModel(model: ShellSurface): void;
    detachModel(): void;
}
