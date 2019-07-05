import { createFiber } from './MayFiber';

// Describes where we are in the React execution stack
// let executionContext = NoContext;
// The root we're working on
let workInProgressRoot = null;
// The fiber we're working on
let workInProgress = null;
// The expiration time we're rendering
let renderExpirationTime = NoWork;
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

function renderRoot(root, expirationTime, isSync) {
    if (root !== workInProgressRoot || expirationTime !== renderExpirationTime) {

    }
}

export { createWorkInProgress };