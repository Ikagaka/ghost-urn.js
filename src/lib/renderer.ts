import {Model} from "./model";

export abstract class RendererBase<M extends Model> {
    /** attached model */
    model: M;

    /**
     * attach model
     * @param model model
     */
    attachModel(model: M) {
        this.model = model;
    }

    /**
     * detach model
     */
    detachModel() {
        delete this.model;
    }

    abstract destroy(): void;
}
