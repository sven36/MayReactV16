import { createFiber } from './MayFiber';
import { IndeterminateComponent, ClassComponent, Callback } from '../utils';
import { HostRoot, UpdateState } from './scheduleWork';

// Describes where we are in the React execution stack
// let executionContext = NoContext;
// The root we're working on
let workInProgressRoot = null;
// The fiber we're working on
let workInProgress = null;
// The expiration time we're rendering
let renderExpirationTime = NoWork = 0;
const RootIncomplete = 0;
const RootErrored = 1;
const RootSuspended = 2;
const RootSuspendedWithDelay = 3;
const RootCompleted = 4;
// Whether to root completed, errored, suspended, etc.
let workInProgressRootExitStatus = RootIncomplete;

function createWorkInProgress(current, pendingProps, expirationTime) {
    var workInProgress = current.alternate;

    if (workInProgress === null) {
        // We use a double buffering pooling technique because we know that we'll
        // only ever need at most two versions of a tree. We pool the "other" unused
        // node that we're free to reuse. This is lazily created to avoid allocating
        // extra objects for things that are never updated. It also allow us to
        // reclaim the extra memory if needed.
        workInProgress = createFiber(current.tag, pendingProps, current.key, current.mode);
        workInProgress.elementType = current.elementType;
        workInProgress.type = current.type;
        workInProgress.stateNode = current.stateNode;
        workInProgress.alternate = current;
        current.alternate = workInProgress;
    } else {
        workInProgress.pendingProps = pendingProps; // We already have an alternate.
        // Reset the effect tag.
        workInProgress.effectTag = NoEffect; // The effect list is no longer valid.
        workInProgress.nextEffect = null;
        workInProgress.firstEffect = null;
        workInProgress.lastEffect = null;
    }

    workInProgress.childExpirationTime = current.childExpirationTime;
    workInProgress.expirationTime = current.expirationTime;
    workInProgress.child = current.child;
    workInProgress.memoizedProps = current.memoizedProps;
    workInProgress.memoizedState = current.memoizedState;
    workInProgress.updateQueue = current.updateQueue;
    workInProgress.contextDependencies = current.contextDependencies; // These will be overridden during the parent's reconciliation
    workInProgress.sibling = current.sibling;
    workInProgress.index = current.index;
    workInProgress.ref = current.ref;
    return workInProgress;
}

function prepareFreshStack(root, expirationTime) {
    root.finishedWork = null;
    root.finishedExpirationTime = NoWork;

    const timeoutHandle = root.timeoutHandle;
    if (timeoutHandle !== noTimeout) {
        // The root previous suspended and scheduled a timeout to commit a fallback
        // state. Now that we have additional work, cancel the timeout.
        root.timeoutHandle = noTimeout;
        // $FlowFixMe Complains noTimeout is not a TimeoutID, despite the check above
        //   cancelTimeout(timeoutHandle);
    }

    if (workInProgress !== null) {
        let interruptedWork = workInProgress.return;
        while (interruptedWork !== null) {
            unwindInterruptedWork(interruptedWork);
            interruptedWork = interruptedWork.return;
        }
    }
    workInProgressRoot = root;
    workInProgress = createWorkInProgress(root.current, null, expirationTime);
    renderExpirationTime = expirationTime;
    workInProgressRootExitStatus = RootIncomplete;
    workInProgressRootLatestProcessedExpirationTime = Sync;
    workInProgressRootLatestSuspenseTimeout = Sync;
    workInProgressRootCanSuspendUsingConfig = null;
    workInProgressRootHasPendingPing = false;

    if (enableSchedulerTracing) {
        didDeprioritizeIdleSubtree = false;
    }

    if (__DEV__) {
        ReactStrictModeWarnings.discardPendingWarnings();
        componentsWithSuspendedDiscreteUpdates = null;
    }
}

function workLoopSync() {
    // Already timed out, so perform work without checking if we need to yield.
    while (workInProgress !== null) {
        workInProgress = performUnitOfWork(workInProgress);
    }
}

function workLoop() {
    // Perform work until Scheduler asks us to yield
    while (workInProgress !== null && !shouldYield()) {
        workInProgress = performUnitOfWork(workInProgress);
    }
}
//获取 需要更新的State
function processUpdateQueue(workInProgress, queue, props, instance, renderExpirationTime) {
    let newBaseState = queue.baseState;
    let newFirstUpdate = null;
    let newExpirationTime = 0;
    let update = queue.firstUpdate;
    let resultState = newBaseState;
    while (update != null) {
        const updateExpirationTime = update.expirationTime;
        if (updateExpirationTime < renderExpirationTime) {

        } else {
            switch (update.tag) {
                case UpdateState:
                    const payload = update.payload;
                    if (payload) {
                        resultState = Object.assign({}, resultState, payload);
                    }
                    break;

                default:
                    break;
            }
            const callback = update.callback;
            if (callback != null) {

            }
        }
        update = update.next;
    }
    let newFirstCapturedUpdate = null;
    update = queue.firstCapturedUpdate;
    if (newFirstUpdate === null) {
        queue.lastUpdate = null;
    }
    if (newFirstCapturedUpdate === null) {
        queue.lastCapturedUpdate = null;
    } else {
        workInProgress.effectTag |= Callback;
    }
    if (newFirstUpdate === null && newFirstCapturedUpdate === null) {
        // We processed every update, without skipping. That means the new base
        // state is the same as the result state.
        newBaseState = resultState;
    }
    queue.baseState = newBaseState;
    queue.firstUpdate = newFirstUpdate;
    queue.firstCapturedUpdate = newFirstCapturedUpdate;
    workInProgress.expirationTime = newExpirationTime;
    workInProgress.memoizedState = resultState;
}

function reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime) {

}

function updateHostRoot(current, workInProgress, renderExpirationTime) {
    //TODO context处理
    const updateQueue = workInProgress.updateQueue;
    const nextProps = workInProgress.pendingProps;
    const prevState = workInProgress.memoizedState;
    const prevChildren = prevState !== null ? prevState.element : null;
    processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
    const nextState = workInProgress.memoizedState;
    const nextChildren = nextState.element;
    const root = workInProgress.stateNode;
    if (nextChildren === prevChildren) {

    } else {
        reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
    }
    return workInProgress.child;
}

function beginWork(current, workInProgress, renderExpirationTime) {
    const updateExpirationTime = renderExpirationTime;
    if (current !== null) {
        const oldProps = current.memoizedProps;
        const newProps = workInProgress.pendingProps;

    }

    workInProgress.expirationTime = NoWork;
    switch (workInProgress.tag) {
        case IndeterminateComponent:

            break;
        case ClassComponent:
            break;
        case HostRoot:

            break;
        default:
            break;
    }
}

function preformUnitOfWork(unitOfWork) {
    const current = unitOfWork.current;
    let next = beginWork(current, unitOfWork, renderExpirationTime);
}

function renderRoot(root, expirationTime, isSync) {
    if (root !== workInProgressRoot || expirationTime !== renderExpirationTime) {
        prepareFreshStack(root, expirationTime);
    }
    if (workInProgress !== null) {
        do {
            try {
                if (isSync) {
                    workLoopSync();
                } else {
                    workLoop();
                }
                break;
            } catch (error) {

            }

        } while (true);
    }
}

export { createWorkInProgress, renderRoot };