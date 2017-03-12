import {ScopeShell} from "../scope_shell";
import {ShellSurfaceRenderer} from "./shell_surface_renderer";
import {RendererBase} from "../renderer";

export interface ScopeShellRenderer extends RendererBase {
    model: ScopeShell;
    attachModel(model: ScopeShell): void;
    createChildRenderer(): ShellSurfaceRenderer;
    removeChildRenderer(renderer: ShellSurfaceRenderer): void;
    detachModel(): void;
}
