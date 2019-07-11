import { FiberRootNode, createFiber } from './MayFiber';
import { getContextForSubtree } from './MayFiberContext';
import { renderRoot } from './MayFiberWork';


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

export const UpdateState = 0;
export const ReplaceState = 1;
export const ForceUpdate = 2;
export const CaptureUpdate = 3;

function createUpdate(expirationTime, suspenseConfig) {
    return {
        expirationTime: expirationTime,
        suspenseConfig: suspenseConfig,
        tag: UpdateState,
        payload: null,
        callback: null,
        next: null,
        nextEffect: null
    };
}
function createUpdateQueue(baseState) {
    const queue = {
        baseState: baseState,
        firstUpdate: null,
        lastUpdate: null,
        firstCapturedUpdate: null,
        lastCapturedUpdate: null,
        firstEffect: null,
        lastEffect: null,
        firstCapturedEffect: null,
        lastCapturedEffect: null
    };
    return queue;
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
    const update = createUpdate(expirationTime, suspenseConfig);
    //payload就是要添加的子元素 子dom
    update.payload = { element };
    if (!callback) {
        update.callback = callback;
    }
    enqueueUpdate(current, update);

}

function appendUpdateToQueue(queue, update) {
    // Append the update to the end of the list.
    if (queue.lastUpdate === null) {
        // Queue is empty
        queue.firstUpdate = queue.lastUpdate = update;
    } else {
        queue.lastUpdate.next = update;
        queue.lastUpdate = update;
    }
}

function markUpdateTimeFromFiberToRoot(fiber, expirationTime) {
    if (fiber.expirationTime < expirationTime) {
        fiber.expirationTime = expirationTime;
    }
    let alternate = fiber.alternate;
    if (alternate !== null && alternate.expirationTime < expirationTime) {
        alternate.expirationTime = expirationTime;
    }
    let node = fiber.current;
    let root = null;
    if (root === null && fiber.tag === HostRoot) {
        root = fiber.stateNode;
    }
    while (node != null) {
        if (node.return === null && node.tag === HostRoot) {
            root = node.stateNode;
            break;
        }
        node = node.return;
    }
    return root;
}
/**
 * 把需要更新的放在update对象 然后放在fiber的lastUpdate或firstUpdate
 * 
 * @param {*} fiber 
 * @param {*} update 
 */
function enqueueUpdate(fiber, update) {
    /*// 当前父fiber中的位置
    index: 0,

    // fiber实例对象，指向当前组件实例
    stateNode: Card,
 
    // setState待更新状态，回调，DOM更新的队列
    updateQueue: null,
 
    // 当前UI的状态，反映了UI当前在屏幕上的表现状态
    memoizedState: {},
 
    // 前次渲染中用于决定UI的props
    memoizedProps: {},
 
    // 即将应用于下一次渲染更新的props
    pendingProps: {},*/

    // fiber更新时基于当前fiber克隆出的镜像，更新时记录两个fiber diff的变化；更新结束后alternate替换之前的fiber成为新的fiber节点
    const alternate = fiber.alternate;
    let queue1 = queue2 = null;
    if (alternate === null) {
        queue1 = fiber.updateQueue;
        if (queu1 === null) {
            queue1 = fiber.updateQueue = createUpdateQueue(fiber.memoizedState);
        }
    }
    if (queue2 == null) {
        appendUpdateToQueue(queue1, update);
    }
}



function scheduleWork(fiber, expirationTime) {
    const root = markUpdateTimeFromFiberToRoot(fiber, expirationTime);
    if (root === null) {
        return;
    }
    if (expirationTime === Sync) {

    }
    let callback = renderRoot(root, Sync, true);
    while (callback !== null) {
        callback = callback(true);
    }
}

export { ReactRoot, ReactSyncRoot, updateContainer }