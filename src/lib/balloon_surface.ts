import {ReactiveProperty} from "reactiveproperty";
import {BalloonData} from "./balloon_data";
import {BalloonProfile} from "./balloon_profile";
import {Model} from "./model";
import {ScopeBalloon} from "./scope_balloon";

export class BalloonSurface implements Model {
    readonly id: number;
    readonly balloonData: ReactiveProperty<BalloonData>;
    readonly profile: BalloonProfile;
    readonly parent: ScopeBalloon | undefined;
    closed = false;

    constructor(
        id: number | undefined,
        balloonData: BalloonData,
        profile: BalloonProfile = new BalloonProfile(),
        parent?: ScopeBalloon,
    ) {
        this.id = id || 0;
        this.balloonData = new ReactiveProperty(balloonData);
        this.profile = profile;
        this.parent = parent;
    }

    changeBalloon(balloonData: BalloonData) {
        this.balloonData.value = balloonData;
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;
    }
}
