import {ISubscription} from "rxjs/Subscription";

export interface Model extends ISubscription {
    readonly id: number;
}
