import {ObservableMap} from "observable-collection";
import {Model} from "./model";
import {HasChildModel} from "./has_child_model";
import {RendererBase} from "./renderer";

export abstract class HasChildRenderer<
    Model extends HasChildModel<ChildModel>,
    ChildModel extends Model,
    ChildRenderer extends RendererBase<ChildModel>
> extends RendererBase<Model> {
    /** child renderers by child model id */
    childRenderers = new ObservableMap<number, ChildRenderer>();

    /**
     * attach model
     * @param model model
     */
    attachModel(model: Model) {
        super.attachModel(model);
        for (const id of this.model.childIds) {
            const childModel = <ChildModel> this.model.child(id);
            const childRenderer = this.createChildRenderer();
            childRenderer.attachModel(childModel);
            this.childRenderers.set(childModel.id, childRenderer);
        }
    }
    abstract createChildRenderer(): ChildRenderer;
    abstract removeChildRenderer(renderer: ChildRenderer): void;
    detachModel() {
        for (const id of this.model.childIds) {
            const childRenderer = <ChildRenderer> this.childRenderers.get(id);
            childRenderer.detachModel();
            this.childRenderers.delete(id);
            this.removeChildRenderer(childRenderer);
        }
        super.detachModel();
    }
}
