import {ReactiveProperty} from "reactiveproperty";
import {Model} from "./model";
import {Scope} from "./scope";
import {ShellData} from "./shell_data";
import {ShellProfile} from "./shell_profile";
import {ShellSurface} from "./shell_surface";

export class ScopeShell implements Model {
    readonly id: number;
    readonly shellData: ReactiveProperty<ShellData>;
    readonly profile: ShellProfile;
    readonly parent?: Scope;
    readonly surface = new ReactiveProperty<ShellSurface>();
    closed = false;

    constructor(
        id: number | undefined,
        shellData: ShellData,
        profile: ShellProfile = new ShellProfile(),
        parent?: Scope,
    ) {
        this.id = id || 0;
        this.shellData = new ReactiveProperty(shellData);
        this.profile = profile;
        this.parent = parent;
    }

    setSurface(idLike: number | string) {
        const id = typeof idLike !== "number" ?
            this.shellData.value.alias[idLike] :
            idLike;
        if (!this.surface.value || this.surface.value.id !== id) {
            if (this.surface.value) this.surface.value.unsubscribe();
            this.surface.value = new ShellSurface(<number> id, this.shellData.value, this.profile, this);
        }
    }

    changeShell(shellData: ShellData) {
        this.shellData.value = shellData;
        this.surface.value.changeShell(shellData);
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;

    }
}
