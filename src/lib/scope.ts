import {ReactiveProperty} from "reactiveproperty";
import {BalloonData} from "./balloon_data";
import {BalloonProfile} from "./balloon_profile";
import {Model} from "./model";
import {Named} from "./named";
import {Position} from "./position";
import {ScopeBalloon} from "./scope_balloon";
import {ScopeShell} from "./scope_shell";
import {ShellData} from "./shell_data";
import {ShellProfile} from "./shell_profile";

export class Scope implements Model {
    readonly id: number;
    readonly shell: ReactiveProperty<ScopeShell>;
    readonly balloon: ReactiveProperty<ScopeBalloon>;
    readonly shellData: ReactiveProperty<ShellData>;
    readonly balloonData: ReactiveProperty<BalloonData>;
    readonly shellProfile: ShellProfile;
    readonly balloonProfile: BalloonProfile;
    readonly position: Position;
    readonly parent?: Named;
    closed = false;

    constructor(
        id: number | undefined,
        shellData: ShellData,
        balloonData: BalloonData,
        shellProfile: ShellProfile = new ShellProfile(),
        balloonProfile: BalloonProfile = new BalloonProfile(),
        parent?: Named,
    ) {
        this.id = id || 0;
        this.shellData = new ReactiveProperty(shellData);
        this.balloonData = new ReactiveProperty(balloonData);
        this.shellProfile = shellProfile;
        this.balloonProfile = balloonProfile;
        this.position = this.shellProfile.position;
        this.parent = parent;
        this.shell = new ReactiveProperty(
            new ScopeShell(this.id, this.shellData.value, this.shellProfile, this),
        );
        this.balloon = new ReactiveProperty(
            new ScopeBalloon(this.id, this.balloonData.value, this.balloonProfile, this),
        );
    }

    changeShell(shellData: ShellData) {
        this.shellData.value = shellData;
        this.shell.value.changeShell(shellData);
    }

    changeBalloon(balloonData: BalloonData) {
        this.balloonData.value = balloonData;
        this.balloon.value.changeBalloon(balloonData);
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;
        this.shell.value.unsubscribe();
        this.balloon.value.unsubscribe();
        this.shellData.unsubscribe();
        this.balloonData.unsubscribe();
        this.shell.value.unsubscribe();
        this.balloon.value.unsubscribe();
        this.shell.unsubscribe();
        this.balloon.unsubscribe();
    }
}
