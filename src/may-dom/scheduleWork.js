import { FiberRootNode, createFiber } from './MayFiber';
import { getContextForSubtree } from './MayFiberContext';


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
const LegacyRoot = 0;
const BatchedRoot = 1;
const ConcurrentRoot = 2;
export const NoMode = 0b0000;
export const StrictMode = 0b0001;
export const BatchedMode = 0b0010;
export const ConcurrentMode = 0b0100;
export const ProfileMode = 0b1000;
export const HostRoot = 3; // Root of a host tree. Could be nested inside another node.

function createContainer(containerInfo, tag, hydrate) {
    const root = new FiberRootNode(containerInfo, tag, hydrate);
    // Cyclic construction. This cheats the type system right now because
    // stateNode is any.
    let mode;
    if (tag === ConcurrentRoot) {
        mode = ConcurrentMode | BatchedMode | StrictMode;
    } else if (tag === BatchedRoot) {
        mode = BatchedMode | StrictMode;
    } else {
        mode = NoMode;
    }
    const uninitializedFiber = createFiber(HostRoot, null, null, mode);
    root.current = uninitializedFiber;
    uninitializedFiber.stateNode = root;
    return root;
}


function ReactSyncRoot(container, tag, hydrate) {
    const root = createContainer(container, tag, hydrate);
    this._internalRoot = root;
}
function ReactRoot(container, isConcurrent, hydrate) {
    const root = createContainer(container, isConcurrent, hydrate);
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

ReactRoot.prototype.render = ReactSyncRoot.prototype.render = function (children, callback) {
    const root = this._internalRoot;
    const work = new ReactWork();
    if (callback) {
        work.then(callback);
    }
    updateContainer(children, root, null, work._onCommit);
    return work;
}
// Describes where we are in the React execution stack 'NoContext'
let NoContext = 0b000000;
let executionContext = NoContext;
const BatchedContext = /*               */ 0b000001;
const EventContext = /*                 */ 0b000010;
const DiscreteEventContext = /*         */ 0b000100;
const LegacyUnbatchedContext = /*       */ 0b001000;
export function unbatchedUpdates(fn, a) {
    const prevExecutionContext = executionContext;
    executionContext &= ~BatchedContext;
    executionContext |= LegacyUnbatchedContext;
    try {
        return fn(a);
    } catch (error) {
        executionContext = prevExecutionContext;
        if (executionContext === NoContext) {
            // Flush the immediate callbacks that were scheduled during this batch
            // flushSyncCallbackQueue();
        }
    }
}

function updateContainer(element, containerInfo, parentComponent, callback) {
    const current = root.current;
    // 1 unit of expiration time represents 10ms.
    const currentTime = MAX_SIGNED_31_BIT_INT - 2 - (now() / 10 | 0);
    const suspenseConfig = null;
    const expirationTime = Sync;
    const context = getContextForSubtree(parentComponent);
    if (containerInfo.context === null) {
        containerInfo.context = context;
    } else {
        containerInfo.pendingContext = context;
    }

}

export { ReactRoot, ReactSyncRoot, LegacyRoot, updateContainer }