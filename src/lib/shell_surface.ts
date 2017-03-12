import {ReactiveProperty} from "reactiveproperty";
import {Model} from "./model";
import {ScopeShell} from "./scope_shell";
import {ShellData} from "./shell_data";
import {ShellProfile} from "./shell_profile";

export class ShellSurface implements Model {
    readonly id: number;
    readonly shellData: ReactiveProperty<ShellData>;
    readonly profile: ShellProfile;
    readonly parent?: ScopeShell;
    closed = false;

    constructor(
        id: number | undefined,
        shellData: ShellData,
        profile: ShellProfile = new ShellProfile(),
        parent?: ScopeShell,
    ) {
        this.id = id || 0;
        this.shellData = new ReactiveProperty(shellData);
        this.profile = profile;
        this.parent = parent;
    }

    changeShell(shellData: ShellData) {
        this.shellData.value = shellData;
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;

    }
}
