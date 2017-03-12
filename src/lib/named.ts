import {ObservableArray} from "observable-collection";
import {ReactiveProperty} from "reactiveproperty";
import {BalloonData} from "./balloon_data";
import {BalloonProfile} from "./balloon_profile";
import {Model} from "./model";
import {NamedManager} from "./named_manager";
import {Scope} from "./scope";
import {ShellData} from "./shell_data";
import {ShellProfile} from "./shell_profile";

export class Named implements Model {
    readonly id: number;
    readonly shellData: ReactiveProperty<ShellData>;
    readonly balloonData: ReactiveProperty<BalloonData>;
    readonly shellProfile: ShellProfile;
    readonly balloonProfile: BalloonProfile;
    readonly parent?: NamedManager;
    closed = false;

    readonly scopes = new ObservableArray<Scope>();

    constructor(
        id: number | undefined,
        shellData: ShellData,
        balloonData: BalloonData,
        shellProfile: ShellProfile = new ShellProfile(),
        balloonProfile: BalloonProfile = new BalloonProfile(),
        parent?: NamedManager,
    ) {
        this.id = id || 0;
        this.shellData = new ReactiveProperty(shellData);
        this.balloonData = new ReactiveProperty(balloonData);
        this.shellProfile = shellProfile;
        this.balloonProfile = balloonProfile;
        this.parent = parent;
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;
        this.shellData.unsubscribe();
        this.balloonData.unsubscribe();
        for (const scope of this.scopes) scope.unsubscribe();
        this.scopes.unsubscribe();
    }

    changeShell(shellData: ShellData) {
        this.shellData.value = shellData;
        for (const scope of this.scopes) scope.changeShell(shellData);
    }

    changeBalloon(balloonData: BalloonData) {
        this.balloonData.value = balloonData;
        for (const scope of this.scopes) scope.changeBalloon(balloonData);
    }

    selectScope(id: number) {
        if (!this.scope(id)) this._createScope(id);
        this._setCurrentScopeId(id);
    }

    scope(id: number) {
        return this.scopes.find((scope) => scope.id === id);
    }

    scopeIndex(id: number) {
        return this.scopes.findIndex((scope) => scope.id === id);
    }

    get currentScope() {
        return this.scopes[this.scopes.length - 1];
    }

    private _setCurrentScopeId(id: number) {
        if (this.currentScope.id === id) return;
        const oldIndex = this.scopeIndex(id);
        if (oldIndex === -1) return;
        const scope = this.scopes[oldIndex];
        this.scopes.atomic(() => {
            this.scopes.splice(oldIndex, 1);
            this.scopes.push(scope);
        });
    }

    private _createScope(id: number) {
        const scope = new Scope(
            id,
            this.shellData.value,
            this.balloonData.value,
            this.shellProfile,
            this.balloonProfile,
            this,
        );
        this.scopes.push(scope);
    }
}
