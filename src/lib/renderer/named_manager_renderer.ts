import {ObservableArray} from "observable-collection";
import {Named} from "../named";
import {NamedManager} from "../named_manager";
import {RendererBase} from "../renderer";
import {NamedRenderer} from "./named_renderer";

/**
 * named manager renderer
 */
export abstract class NamedManagerRenderer extends RendererBase<NamedManager> {
    /** attached model */
    model: NamedManager;
    /** child renderers by child model id */
    childRenderers = new ObservableArray<NamedRenderer>();

    /**
     * attach model
     * @param model model
     */
    attachModel(model: NamedManager) {
        super.attachModel(model);
        for (const named of this.model.nameds) {
            const childRenderer = this.createChildRenderer();
            childRenderer.attachModel(named);
            this.childRenderers.set(named.id, childRenderer);
        }
    }
    abstract createChildRenderer(): NamedRenderer;
    abstract removeChildRenderer(renderer: NamedRenderer): void;
    detachModel() {
        super.detachModel();
    }
    abstract setPriority(priority: number[]): void;
}
