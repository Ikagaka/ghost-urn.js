import {Model} from "../model";
import {RendererBase} from "../renderer";

export class DOMRendererBase implements RendererBase {
    model: Model;

    constructor(public element: Element) {
    }

    attachModel(model: Model) {
        this.model = model;
    }

    removeChildRenderer(renderer: DOMRendererBase) {
        const element = renderer.element;
        renderer.destroy();
        this.element.removeChild(element);
    }

    detachModel() {
        delete this.model;
    }

    destroy() {
        delete this.element;
    }

    protected _createChildElement() {
        return <Element>this.element.appendChild(document.createElement("div"));
    }
}
