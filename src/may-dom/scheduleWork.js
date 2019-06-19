
function ReactWork() {
    this._callbacks = null;
    this._didCommit = false;
    this._onCommit = this._onCommit.bind(this);
}
ReactWork.prototype.then = function (onCommit) {
    if (this._didCommit) {
        onCommit();
        return;
    }
    let callbacks = this._callbacks;
    if (callbacks === null) {
        callbacks = this._callbacks = [];
    }
    callbacks.push(onCommit);
}
ReactWork.prototype._onCommit = function () {
    if (this._didCommit) {
        return;
    }
    this._onCommit = true;
    const callbacks = this._callbacks;
    let callback;
    if (callbacks && callbacks.length > 0) {
        while (callback = callbacks.shift()) {
            callback();
        }
    }
}
const ConcurrentRoot = 2;
const LegacyRoot = 0;
const BatchedRoot = 1;

function ReactRoot(container, hydrate) {
    const root = createContainer(container, ConcurrentRoot, hydrate);
    this._internalRoot = root;
}

let currentEventTime = 0;
let workPhase = 0;
const RenderPhase = 4;
const CommitPhase = 5;
// Max 31 bit integer. The max integer size in V8 for 32-bit systems.
// Math.pow(2, 30) - 1
// 0b111111111111111111111111111111
let MAX_SIGNED_31_BIT_INT = 1073741823;
const Sync = MAX_SIGNED_31_BIT_INT;

ReactRoot.prototype.render = function (children, callback) {
    const root = this._internalRoot;
    const work = new ReactWork();
    if (callback) {
        work.then(callback);
    }
    const current = root.current;
    // 1 unit of expiration time represents 10ms.
    const currentTime = MAX_SIGNED_31_BIT_INT - 2 - (now() / 10 | 0);
    const suspenseConfig = null;
    const expirationTime = Sync;
    return work;
}