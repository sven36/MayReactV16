import { createFiber, createChildFiber } from './MayFiber';
import { IndeterminateComponent, ClassComponent, Callback, REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE, HostComponent, Placement, ReactCurrentOwner, Incomplete, NoEffect, LazyComponent, SimpleMemoComponent, FunctionComponent } from '../utils';
import { HostRoot, UpdateState } from './scheduleWork';

// Describes where we are in the React execution stack
// let executionContext = NoContext;
// The root we're working on
let workInProgressRoot = null;
// The fiber we're working on
let workInProgress = null;
// The expiration time we're rendering
let renderExpirationTime = 0;
let NoWork = 0;
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
/**
 * 克隆root和Fiber子节点 方便以后对比 空间换效率
 * @param {*} root 
 * @param {*} expirationTime 
 */

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
    //createWorkInProgress会互相引用指针
    //workInProgress.alternate = current;
    // current.alternate = workInProgress;
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

/**
 * diffChildren
 * @param {*} parentFiber 当前Fiber父节点
 * @param {*} currentChild 当前子元素
 * @param {*} nextChildren 要更新的子元素
 * @param {*} renderExpirationTime 
 */
function reconcileChildren(parentFiber, currentChild, nextChildren, renderExpirationTime) {
    //Fragment处理
    const isUnkeyedTopLevelFragment =
        typeof nextChildren === 'object' &&
        nextChildren !== null &&
        nextChildren.type === REACT_FRAGMENT_TYPE &&
        nextChildren.key === null;
    // const isObject = typeof nextChildren === 'object' && nextChildren !== null;
    if (isUnkeyedTopLevelFragment) {
        nextChildren = nextChildren.props.children;
    }

    if (nextChildren && nextChildren.$$typeof) {
        switch (nextChildren.$$typeof) {
            case REACT_ELEMENT_TYPE:
                const key = element.key;
                let child = parentFiber.child;
                while (child !== null) {

                }
                if (element.type === REACT_FRAGMENT_TYPE) {

                } else {
                    const type = element.type;
                    const key = element.key;
                    const pendingProps = element.props;
                    let fiber;
                    let fiberTag = IndeterminateComponent;
                    if (typeof type === 'function') {
                        var prototype = element.prototype;
                        if (!!(prototype && prototype.isReactComponent)) {
                            fiberTag = ClassComponent;
                        }
                    } else if (typeof type === 'string') {
                        fiberTag = HostComponent;
                    } else {

                    }
                    fiber = createFiber(fiberTag, pendingProps, key, parentFiber.mode);
                    fiber.elementType = fiber.type = type;
                    fiber.expirationTime = renderExpirationTime;
                    //@TODO ref添加
                    // fiber.ref = coerceRef(returnFiber, currentFirstChild, element);
                    fiber.return = parentFiber;
                    //effectTag标识该fiber需要进行什么操作 渲染root该fiber只需渲染即可Placement
                    fiber.effectTag = Placement;
                    currentChild.child = fiber;
                }
                break;

            default:
                break;
        }
    }
    if (Array.isArray(nextChildren)) {
        let resultingFirstChild = null;
        let previousNewFiber = null;
        let oldFiber = currentChild;
        let lastPlaceIndex = 0;
        let newIndex = 0;
        let nextOldFiber = null;
        for (; oldFiber != null && newIndex < nextChildren.length; newIndex++) {
            if (oldFiber.index > newIndex) {
                nextOldFiber = oldFiber;
                oldFiber = null;
            } else {
                nextOldFiber = oldFiber.sibling;
            }

        }
        //无oldChild直接插入新的子元素即可
        if (oldFiber === null) {
            for (; newIndex < nextChildren.length; newIndex++) {
                const newFiber = createChildFiber(parentFiber, nextChildren[newIndex], expirationTime);
                if (newFiber === null) {
                    continue;
                }
                // lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
                if (previousNewFiber === null) {
                    resultingFirstChild = newFiber;
                } else {
                    previousNewFiber.sibling = newFiber;
                }
                previousNewFiber = newFiber;
            }
            return resultingFirstChild;
        }
    }
}

function appendChildren(parent, workInProgress, needsVisibilityToggle, isHidden) {
    let node = workInProgress.child;
    while (node !== null) {

    }
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
            const Component = workInProgress.type;
            const context = null;
            const unresolvedProps = workInProgress.pendingProps;
            const resolvedProps =
                workInProgress.elementType === Component
                    ? unresolvedProps
                    : resolveDefaultProps(Component, unresolvedProps);
            //@TODO 设置Context
            const currentInstance = workInProgress.stateNode;
            if (currentInstance === null) {
                if (current !== null) {

                }
                const instance = new Component(resolvedProps, context);
                //getDerivedStateFromProps 使用到state
                // const state = (workInProgress.memoizedState =
                //     currentInstance.state !== null && currentInstance.state !== undefined
                //         ? currentInstance.state
                //         : null);
                instance.updater = classComponentUpdater;
                workInProgress.stateNode = instance;
                instance._reactInternalFiber = workInProgress;
                //@TODO设置生命周期
                let updateQueue = workInProgress.updateQueue;
                if (updateQueue !== null) {
                    processUpdateQueue(workInProgress, updateQueue, resolvedProps, instance, renderExpirationTime);
                    instance.state = workInProgress.memoizedState;
                }
                //@TODO markRef 错误处理
                let nextChildren = instance.render();
                reconcileChildren(workInProgress, null, nextChildren, renderExpirationTime);
                workInProgress.memoizedState = instance.state;
                return workInProgress.child;
            } else if (current === null) {

            }
            break;
        case HostRoot:
            return updateHostRoot(current, workInProgress, renderExpirationTime);
        case HostComponent:
            const type = workInProgress.type;
            const nextProps = workInProgress.pendingProps;
            const prevProps = current !== null ? current.memoizedProps : null;
            let nextChildren = nextProps.children;
            //判断是否是字符串，是字符串直接处理 提高性能
            const isDirectTextChild = type === 'textarea' || type === 'option' || type === 'noscript' || typeof nextProps.children === 'string' || typeof nextProps.children === 'number' || typeof nextProps.dangerouslySetInnerHTML === 'object' && nextProps.dangerouslySetInnerHTML !== null && nextProps.dangerouslySetInnerHTML.__html != null;
            if (isDirectTextChild) {
                nextChildren = null;
            } else if (prevProps !== null && shouldSetTextContent(type, prevProps)) {
                workInProgress.effectTag |= ContentReset;
            }
            //  markRef(current, workInProgress);
            reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
            return workInProgress.child;
        default:
            break;
    }
}

function completeWork(current, workInProgress, renderExpirationTime) {
    const newProps = workInProgress.pendingProps;
    switch (workInProgress.tag) {
        case IndeterminateComponent:
            break;
        case LazyComponent:
            break;
        case SimpleMemoComponent:
        case FunctionComponent:
            break;
        case ClassComponent: {
            const Component = workInProgress.type;
            // if (isLegacyContextProvider(Component)) {
            //     popLegacyContext(workInProgress);
            // }
            break;
        }
        case HostRoot:
            const fiberRoot = workInProgress.stateNode;

            break;
        case HostComponent:

            //
            const rootContainerInstance = container;
            const type = workInProgress.type;
            let parentNameSpace = "http://www.w3.org/1999/xhtml";
            const domElement = document.createElement(type);
            workInProgress.stateNode = domElement;
            break;
    }
}

function preformUnitOfWork(unitOfWork) {
    const current = unitOfWork.current;
    //beginWork 返回的是workInProgress的child 即递归向下遍历（默认情况）
    let next = beginWork(current, unitOfWork, renderExpirationTime);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    if (next === null) {
        workInProgress = unitOfWork;
        do {
            const current = workInProgress.alternate;
            const returnFiber = workInProgress.return;
            if ((workInProgress.effectTag & Incomplete) === NoEffect) {
                next = completeWork(current, workInProgress, renderExpirationTime);
                if (next !== null) {
                    return next;
                }
            }
        } while (workInProgress !== null);
    }
    ReactCurrentOwner.current = null;
    return next;
}

function renderRoot(root, expirationTime, isSync) {
    if (root !== workInProgressRoot || expirationTime !== renderExpirationTime) {
        //克隆root和Fiber子节点 方便以后对比 空间换效率
        prepareFreshStack(root, expirationTime);
    }
    if (workInProgress !== null) {
        do {
            try {
                if (isSync) {
                    while (workInProgress !== null) {
                        workInProgress = performUnitOfWork(workInProgress);
                    }
                } else {
                    // Perform work until Scheduler asks us to yield
                    while (workInProgress !== null && !shouldYield()) {
                        workInProgress = performUnitOfWork(workInProgress);
                    }
                }
                break;
            } catch (error) {

            }

        } while (true);
    }
    root.finishedWork = root.current.alternate;
    root.finishedExpirationTime = expirationTime;
    workInProgressRoot = null;
    switch (workInProgressRootExitStatus) {
        case RootCompleted:
            return commitRoot.bind(null, root);

        default:
            break;
    }
}

export { createWorkInProgress, renderRoot };