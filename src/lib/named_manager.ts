import {ObservableArray} from "observable-collection";
import {BalloonData} from "./balloon_data";
import {BalloonProfile} from "./balloon_profile";
import {Model} from "./model";
import {Named} from "./named";
import {ShellData} from "./shell_data";
import {ShellProfile} from "./shell_profile";

export class NamedManager implements Model {
    readonly id: number;
    readonly nameds = new ObservableArray<Named>();
    closed = false;

    private _autoIncrementNamedId = 0;

    constructor(id?: number) {
        this.id = id || 0;
    }

    materializeNamed(
        shellData: ShellData,
        balloonData: BalloonData,
        shellProfile?: ShellProfile,
        balloonProfile?: BalloonProfile,
    ) {
        const id = this.generateNewNamedId();
        const named = new Named(id, shellData, balloonData, shellProfile, balloonProfile, this);
        this.nameds.push(named);
        return named;
    }

    named(id: number) {
        return this.nameds.find((named) => named.id === id);
    }

    namedIndex(id: number) {
        return this.nameds.findIndex((named) => named.id === id);
    }

    get namedIds() {
        return Array.from(this.nameds.keys());
    }

    destroyNamed(id: number) {
        const namedIndex = this.namedIndex(id);
        if (namedIndex === -1) return;
        this.nameds[namedIndex].unsubscribe();
        this.nameds.splice(namedIndex, 1);
    }

    selectNamed(id: number) {
        if (this.topPriorityNamedId === id) return;
        const oldIndex = this.namedIndex(id);
        if (oldIndex === -1) return;
        const named = this.nameds[oldIndex];
        this.nameds.atomic(() => {
            this.nameds.splice(oldIndex, 1);
            this.nameds.push(named);
        });
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;
        for (const named of this.nameds) named.unsubscribe();
        this.nameds.unsubscribe();
    }

    get topPriorityNamedId() {
        return this.nameds[this.nameds.length - 1].id;
    }

    private generateNewNamedId() {
        return ++this._autoIncrementNamedId;
    }
}
