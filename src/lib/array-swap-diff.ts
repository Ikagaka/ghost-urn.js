export function arraySwapDiff(before: Array<string | number>, after: Array<string | number>) {
    const values: {[value: string]: {before?: number, after?: number}} = {};
    const length = Math.max(before.length, after.length);
    for (let i = 0; i < length; ++i) {
        const beforeValue = before[i];
        const afterValue = after[i];
        if (!values[beforeValue]) values[beforeValue] = {};
        values[beforeValue].before = i;
        if (!values[afterValue]) values[afterValue] = {};
        values[afterValue].after = i;
    }
    const deleted = [];
    const added = [];
    for (const value of Object.keys(values)) {
        const info = values[value];
        if (info.before != null && info.after != null) continue;
        if (info.before != null) {
            deleted[info.before] = info.before;
        } else if (info.after != null) {
            added[info.after] = info.after;
        }
    }
    const deletedBefore = before.concat();
    for (const i of deleted.reverse()) {
        if (i != null) deletedBefore.splice(i, 1);
    }
    const preaddAfter = after.concat();
    for (const i of added.reverse()) {
        if (i != null) preaddAfter.splice(i, 1);
    }
    for (let i = 0; i < deletedBefore.length; ++i) {
        const beforeValue = deletedBefore[i];
        const afterValue = preaddAfter[i];
    }
}
