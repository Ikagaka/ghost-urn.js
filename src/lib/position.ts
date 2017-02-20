/// <reference types="node" />

import {EventEmitter} from "events";

/**
 * The position
 * (x, y) with origins
 */
export class Position extends EventEmitter {
    private _x = 0;
    private _y = 0;
    private _xOrigin = XOrigin.Left;
    private _yOrigin = YOrigin.Bottom;
    private _xFixed = false;
    private _yFixed = false;

    get x() {
        return this._x;
    }

    set x(x: number) {
        const old = this._x;
        this._x = x;
        this.emit("x", x, old);
    }

    get y() {
        return this._y;
    }

    set y(y: number) {
        const old = this._y;
        this._y = y;
        this.emit("y", y, old);
    }

    get xOrigin() {
        return this._xOrigin;
    }

    set xOrigin(xOrigin: XOrigin) {
        const old = this._xOrigin;
        this._xOrigin = xOrigin;
        this.emit("xOrigin", xOrigin, old);
    }

    get yOrigin() {
        return this._yOrigin;
    }

    set yOrigin(yOrigin: YOrigin) {
        const old = this._yOrigin;
        this._yOrigin = yOrigin;
        this.emit("yOrigin", yOrigin, old);
    }

    get xFixed() {
        return this._xFixed;
    }

    set xFixed(xFixed: boolean) {
        const old = this._xFixed;
        this._xFixed = xFixed;
        this.emit("yOrigin", xFixed, old);
    }

    get yFixed() {
        return this._yFixed;
    }

    set yFixed(yFixed: boolean) {
        const old = this._yFixed;
        this._yFixed = yFixed;
        this.emit("yOrigin", yFixed, old);
    }

    /** set x, y (throws when you want to change fixed value) */
    set(x: number, y: number) {
        if (this.xFixed && this.x !== x) throw new XSetButFixedError("x", x, this.x);
        if (this.yFixed && this.y !== y) throw new YSetButFixedError("y", y, this.y);
        this.x = x;
        this.y = y;
    }

    /** set x, y (ignores when you want to change fixed value) */
    maySet(x: number, y: number) {
        if (!this.xFixed) this.x = x;
        if (!this.yFixed) this.y = y;
    }

    /**move x, y (throws when you want to change fixed value) */
    move(x: number, y: number) {
        if (this.xFixed && x !== 0) throw new XMoveButFixedError("x", x);
        if (this.yFixed && y !== 0) throw new YMoveButFixedError("y", y);
        this.x += x;
        this.y += y;
    }

    /** move x, y (ignores when you want to change fixed value) */
    mayMove(x: number, y: number) {
        if (!this.xFixed) this.x += x;
        if (!this.yFixed) this.y += y;
    }
}

export class RelativePosition extends Position {
    private _parent: Position;

    get parent() {
        return  this._parent;
    }

    set parent(parent: Position) {
        const old = this._parent;
        this._parent = parent;
        this.emit("parent", parent, old);
    }
}

export enum XOrigin {
    Right = 1,
    Left,
}

export enum YOrigin {
    Bottom = 1,
    Top,
}

export class SetButFixedError extends Error {
    constructor(valueName: string, got: any, current: any) {
        super(`${valueName} is fixed but got ${valueName} = ${got} is not current ${valueName} = ${current}`);
    }
}

export class XSetButFixedError extends SetButFixedError { }

export class YSetButFixedError extends SetButFixedError { }

export class MoveButFixedError extends Error {
    constructor(valueName: string, got: any) {
        super(`${valueName} is fixed but move ${valueName} = ${got} is not zero`);
    }
}

export class XMoveButFixedError extends MoveButFixedError { }

export class YMoveButFixedError extends MoveButFixedError { }
