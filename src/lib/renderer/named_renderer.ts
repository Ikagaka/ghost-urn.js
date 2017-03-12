import {Named} from "../named";
import {ScopeRenderer} from "./scope_renderer";
import {RendererBase} from "../renderer";

export interface NamedRenderer extends RendererBase {
    model: Named;
    attachModel(model: Named): void;
    createChildRenderer(): ScopeRenderer;
    removeChildRenderer(renderer: ScopeRenderer): void;
    detachModel(): void;
    setPriority(priority: number[]): void;
}
