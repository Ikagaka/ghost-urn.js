import {ReactiveProperty} from "reactiveproperty";
import {BalloonData} from "./balloon_data";
import {BalloonProfile} from "./balloon_profile";
import {BalloonSurface} from "./balloon_surface";
import {Model} from "./model";
import {Position} from "./position";
import {Scope} from "./scope";

export class ScopeBalloon implements Model {
    readonly id: number;
    readonly balloonData: ReactiveProperty<BalloonData>;
    readonly profile: BalloonProfile;
    readonly position: Position;
    readonly parent?: Scope;
    readonly surface = new ReactiveProperty<BalloonSurface>();
    closed = false;

    constructor(
        id: number,
        balloonData: BalloonData,
        profile: BalloonProfile = new BalloonProfile(),
        parent?: Scope,
    ) {
        this.id = id;
        this.balloonData = new ReactiveProperty(balloonData);
        this.profile = profile;
        this.position = this.profile.position;
        this.parent = parent;
    }

    setSurface(idLike: number | string) {
        const id = typeof idLike !== "number" ?
            this.balloonData.value.alias[idLike] :
            idLike;
        if (!this.surface.value || this.surface.value.id !== id) {
            if (this.surface.value) this.surface.value.unsubscribe();
            this.surface.value = new BalloonSurface(id, this.balloonData.value, this.profile, this);
        }
    }

    changeBalloon(balloonData: BalloonData) {
        this.balloonData.value = balloonData;
        this.surface.value.changeBalloon(balloonData);
    }

    unsubscribe() {
        if (this.closed) return;
        this.closed = true;

    }
}
