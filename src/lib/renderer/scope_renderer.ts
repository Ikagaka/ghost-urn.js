import {Scope} from "../scope";
import {ScopeShellRenderer} from "./scope_shell_renderer";
import {ScopeBalloonRenderer} from "./scope_balloon_renderer";
import {RendererBase} from "../renderer";

export interface ScopeRenderer extends RendererBase {
    model: Scope;
    attachModel(model: Scope): void;
    createChildShellRenderer(): ScopeShellRenderer;
    removeChildShellRenderer(renderer: ScopeShellRenderer): void;
    createChildBalloonRenderer(): ScopeBalloonRenderer;
    removeChildBalloonRenderer(renderer: ScopeBalloonRenderer): void;
    detachModel(): void;
}
