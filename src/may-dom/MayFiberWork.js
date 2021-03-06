import { createFiber, createChildFiber } from './MayFiber';
import { IndeterminateComponent, ClassComponent, Callback, REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE, HostComponent, Placement, ReactCurrentOwner, Incomplete, NoEffect, LazyComponent, SimpleMemoComponent, FunctionComponent, noTimeout, Sync, PerformedWork, HostText, ContentReset, Ref, Update, Deletion, PlacementAndUpdate, HostPortal } from '../utils';
import { HostRoot, UpdateState, classComponentUpdater } from './scheduleWork';

// Describes where we are in the React execution stack
// let executionContext = NoContext;
// The root we're working on
let workInProgressRoot = null;
// The fiber we're working on
let workInProgress = null;
// The expiration time we're rendering
let renderExpirationTime = 0;
let NoWork = 0;
let nextEffect = null;
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
        workInProgress.child = null;
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
 * 
 * @param {Object} domElement 真实dom节点如div
 * @param {String} tag dom type 如div input video等
 * @param {Object} nextProps dom属性
 * @param {Object} rootContainerElement 容器节点
 * @param {Boolean} isCustomComponentTag 
 */
function setInitialProperties(domElement, tag, nextProps, rootContainerElement, isCustomComponentTag) {
    // const isCustomComponentTag = isCustomComponent(tag, rawProps);
    let props;
    switch (tag) {
        case 'iframe':
        case 'object':
        case 'embed':

            break;
        case 'video':
        case 'audio':
            //React不是所有事件都挂载在document上 比如媒体事件就不是
            // Create listener for each media event
            // for (var i = 0; i < mediaEventTypes.length; i++) {
            //     trapBubbledEvent(mediaEventTypes[i], domElement);
            // }
            props = nextProps;
            break;
        default:
            props = nextProps;

            break;
    }
    //setInitialDOMProperties(tag, domElement, rootContainerElement, props, isCustomComponentTag);
    for (const key in nextProps) {
        //nextProp:DOM属性如onClick className,style等
        const nextProp = nextProps[key];
        if (!/^on[A-Z]/.test(key)) {
            switch (key) {
                case 'style':
                    for (let name in nextProp) {
                        let cssName = name.replace(/([A-Z])/g, '-$1').toLowerCase().replace(/^ms-/i, '-ms-');
                        domElement.style[cssName] = nextProp[name];
                    }
                    break;
                case 'dangerouslySetInnerHTML':

                    break;
                case 'children':
                    if (typeof nextProp === 'string') {
                        let canSetTextContent = tag !== 'textarea' || nextProp !== '';

                        if (canSetTextContent) {
                            domElement.textContent = nextProp;
                            // if (text) {
                            //     var firstChild = node.firstChild;

                            //     if (firstChild && firstChild === node.lastChild && firstChild.nodeType === TEXT_NODE) {
                            //       firstChild.nodeValue = text;
                            //       return;
                            //     }
                            //   }
                            //   setTextContent(domElement, nextProp);
                        }
                    }
                    break;
                case 'className':
                    domElement.setAttribute('class', nextProp);
                    break;
                default:
                    break;
            }
        } else {
            //React大部分事件是挂载在document上的
            //event DOCUMENT_NODE 9 DOCUMENT_FRAGMENT_NODE 11
            let isDocumentOrFragment = domElement.nodeType === 9 || domElement.nodeType === 11;
            let doc = isDocumentOrFragment ? domElement : document;
            //let elementListeningSets = new WeakMap();
            //React并不是所有事件都委托在doc，针对每个真实元素的事件React都通过Set存储(同样事件只挂载一次)
            let listenedEvents = elementListeningSets.get(doc);
            if (!listenedEvents) {
                listenedEvents = new Set();
                elementListeningSets.set(doc, listenedEvents);
            }
            //React通过一个对象维护各个事件对应的真实事件如onClick对应click
            //但是也有很多例外如onChange事件
            let eventDependencies = {
                'onClick': ['click'],
                'onClickCapture': ['click'],
                'onMouseEnter': ["mouseout", "mouseover"],
                'onMouseOver': ['mouseover'],
                'onChange': ["blur", "change", "click", "focus", "input", "keydown", "keyup", "selectionchange"]
            }
            let eventPriority = {
                'click': 0,
                'drag': 1,
                'mouseover': 1,
                'animationstart': 2,
            }

            if (eventDependencies[key]) {
                for (let i = 0; i < eventDependencies[key].length; i++) {
                    //针对click change等事件 
                    let event = eventDependencies[key][i];

                    if (!listenedEvents.has(event)) {
                        //(mediaEventTypes) 媒体事件没有冒泡一说所以不会挂在document上;
                        let mediaEventTypes = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"];
                        if (mediaEventTypes.indexOf(event) === -1) {
                            let listener = null;
                            switch (eventPriority[event]) {
                                case 0://DiscreteEvent 离散型事件/独立型事件

                                    break;
                                case 1://UserBlockingEvent 用户阻塞型事件

                                    break;
                                case 2://ContinuousEvent 持续型事件

                                    break;
                                default:
                                    break;
                            }
                            doc.addEventListener(event, listener, false);
                        }

                    } else {

                    }
                }
            }
        }
    }
}
//TODO 
let elementListeningSets = new WeakMap();








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

    workInProgress = createWorkInProgress(root.current, null, expirationTime);
    renderExpirationTime = expirationTime;
    workInProgressRootExitStatus = RootIncomplete;
    // workInProgressRootLatestProcessedExpirationTime = Sync;
    // workInProgressRootLatestSuspenseTimeout = Sync;
    // workInProgressRootCanSuspendUsingConfig = null;
    // workInProgressRootHasPendingPing = false;

    // if (enableSchedulerTracing) {
    //     didDeprioritizeIdleSubtree = false;
    // }

    // if (__DEV__) {
    //     ReactStrictModeWarnings.discardPendingWarnings();
    //     componentsWithSuspendedDiscreteUpdates = null;
    // }
}

//获取 需要更新的State update是一个链表，每个对象都包含当前node更新的信息和链表指向
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
                //在此区别是replace,update还是forceHydrate等
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
    //设置node state
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
                const key = nextChildren.key;
                // let child = parentFiber.child;
                let child = currentChild;
                // while (child !== null) {

                // }
                if (nextChildren.type === REACT_FRAGMENT_TYPE) {

                } else {
                    const type = nextChildren.type;
                    const pendingProps = nextChildren.props;
                    let fiber;
                    let fiberTag = IndeterminateComponent;
                    if (typeof type === 'function') {
                        var prototype = type.prototype;
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
                    //链表结构
                    fiber.return = parentFiber;
                    //effectTag标识该fiber需要进行什么操作 渲染root该fiber只需渲染即可Placement
                    if (fiber) {

                    }
                    fiber.effectTag = Placement;
                    // currentChild.child = fiber;
                    return fiber;
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
                const newFiber = createChildFiber(parentFiber, nextChildren[newIndex], renderExpirationTime);
                if (newFiber === null) {
                    continue;
                }
                // lastPlacedIndex = placeChild(newFiber, lastPlacedIndex, newIdx);
                //单向链表
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

//深度优先至最深Node 添加子元素再上溯
function appendChildren(parent, workInProgress, needsVisibilityToggle, isHidden) {
    let node = workInProgress.child || null;
    while (node !== null) {
        if (node.tag === HostComponent || node.tag === HostText) {
            parent.appendChild(node.stateNode);
        } else if (node.tag === HostPortal) {

        } else if (node.child !== null) {
            node.child.return = node;
            node = node.child;
            continue;
        }
        if (node === workInProgress) {
            return;
        }
        while (node.sibling === null) {
            if (node.return === null || node.return == workInProgress) {
                return;
            }
            node = node.return;
        }
        node.sibling.return = node.return;
        node = node.sibling;
    }
}

function updateHostRoot(current, workInProgress, renderExpirationTime) {
    //TODO context处理
    const updateQueue = workInProgress.updateQueue;
    const nextProps = workInProgress.pendingProps;
    const prevState = workInProgress.memoizedState;
    const prevChildren = prevState && prevState.element ? prevState.element : null;
    //初始化update对象，node state赋值(即memoizedState)
    processUpdateQueue(workInProgress, updateQueue, nextProps, null, renderExpirationTime);
    const nextState = workInProgress.memoizedState;
    const nextChildren = nextState.element;
    const root = workInProgress.stateNode;
    if (nextChildren === prevChildren) {

    } else {
        workInProgress.child = reconcileChildren(workInProgress, current.child, nextChildren, renderExpirationTime);
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
                    //之前存在则是diff
                    current.alternate = null;
                    workInProgress.alternate = null;
                    workInProgress.effectTag |= Placement;
                }
                const instance = new Component(resolvedProps, context);
                //getDerivedStateFromProps 使用到state
                // const state = (workInProgress.memoizedState =
                //     currentInstance.state !== null && currentInstance.state !== undefined
                //         ? currentInstance.state
                //         : null);
                if (instance.state) {
                    workInProgress.memoizedState = instance.state;
                }
                instance.updater = classComponentUpdater;
                //stateNode包含state的Node,Fiber是链表Node,保存该node,diff,渲染等信息,stateNode则是用户操作render之后的ReactElement
                workInProgress.stateNode = instance;
                instance._reactInternalFiber = workInProgress;
                //设置之前属性，无更新保持不变
                instance.props = resolvedProps;
                instance.state = workInProgress.memoizedState;
                //@TODO设置生命周期
                let updateQueue = workInProgress.updateQueue;
                if (updateQueue !== null) {
                    processUpdateQueue(workInProgress, updateQueue, resolvedProps, instance, renderExpirationTime);
                    instance.state = workInProgress.memoizedState;
                }
                //finishClassComponent function
                //@TODO markRef 错误处理
                ReactCurrentOwner.current = workInProgress;
                let nextChildren = instance.render();
                workInProgress.effectTag |= PerformedWork;
                if (current === null) {
                    //第一次render current为null
                    workInProgress.child = reconcileChildren(workInProgress, null, nextChildren, renderExpirationTime);
                }
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
            if (current === null) {
                workInProgress.child = reconcileChildren(workInProgress, null, nextChildren, renderExpirationTime);
            }
            // reconcileChildren(current, workInProgress, nextChildren, renderExpirationTime);
            return workInProgress.child;
        default:
            break;
    }
}

//render递归至最深node 不停fiber化(生成单向链表dom树) 再completeWork
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
            if (fiberRoot.pendingContext) {
                fiberRoot.context = fiberRoot.pendingContext;
                fiberRoot.pendingContext = null;
            }
            if (current === null || current.child === null) {
                workInProgress.effectTag &= ~Placement;
            }
            break;
        case HostComponent:

            //popHostContext 清除当前Context
            //rootContainerInstance是保存在全局的Container
            const rootContainerInstance = window.__container;
            const type = workInProgress.type;
            let parentNameSpace = "http://www.w3.org/1999/xhtml";
            const domElement = document.createElement(type);
            //setInitialProperties 针对特殊dom节点如textarea,embed等初始化相应属性
            appendChildren(domElement, workInProgress, false, false);
            //少context
            setInitialProperties(domElement, type, newProps, rootContainerInstance, '')
            workInProgress.stateNode = domElement;
            break;
    }
    return null;
}

function performUnitOfWork(unitOfWork) {
    const current = unitOfWork.alternate;
    //beginWork 返回的是workInProgress的child 即递归向下遍历（默认情况）
    let next = beginWork(current, unitOfWork, renderExpirationTime);
    unitOfWork.memoizedProps = unitOfWork.pendingProps;
    if (!next) {
        //completeUnitOfWork
        //最深处Node 深度优先递归回归
        workInProgress = unitOfWork;
        do {
            const current = workInProgress.alternate;
            //链表上一级 parentNode
            const returnFiber = workInProgress.return;
            if ((workInProgress.effectTag & Incomplete) === NoEffect) {
                next = completeWork(current, workInProgress, renderExpirationTime);
                if (next !== null) {
                    return next;
                }
                if (returnFiber !== null && (workInProgress.effectTag & Incomplete) === NoEffect) {
                    if (returnFiber.firstEffect == null) {
                        returnFiber.firstEffect = workInProgress.firstEffect;
                    }
                    if (workInProgress.lastEffect !== null) {
                        if (returnFiber.lastEffect !== null) {
                            returnFiber.lastEffect.nextEffect = workInProgress.firstEffect;
                        }
                        returnFiber.lastEffect = workInProgress.lastEffect;
                    }

                    let effectTag = workInProgress.effectTag; // Skip both NoWork and PerformedWork tags when creating the effect
                    // list. PerformedWork effect is read by React DevTools but shouldn't be
                    // committed.

                    if (effectTag > Placement) {
                        if (returnFiber.lastEffect !== null) {
                            returnFiber.lastEffect.nextEffect = workInProgress;
                        } else {
                            returnFiber.firstEffect = workInProgress;
                        }

                        returnFiber.lastEffect = workInProgress;
                    }
                }
            }
            const siblingFiber = workInProgress.sibling;
            if (siblingFiber !== null) {
                return siblingFiber;
            }
            workInProgress = returnFiber;
        } while (workInProgress !== null);
        if (workInProgressRootExitStatus === RootIncomplete) {
            workInProgressRootExitStatus = RootCompleted;
        }
    }
    ReactCurrentOwner.current = null;
    return next;
}
function isHostParent(fiber) {
    return (
        fiber.tag === HostComponent ||
        fiber.tag === HostRoot ||
        fiber.tag === HostPortal
    );
}
function getHostParentFiber(fiber) {
    let parent = fiber.return;
    while (parent !== null) {
        if (isHostParent(parent)) {
            return parent;
        }
        parent = parent.return;
    }
}

function getHostSibling(fiber) {
    // We're going to search forward into the tree until we find a sibling host
    // node. Unfortunately, if multiple insertions are done in a row we have to
    // search past them. This leads to exponential search for the next sibling.
    let node = fiber;

    siblings: while (true) {
        // If we didn't find anything, let's try the next sibling.
        while (node.sibling === null) {
            if (node.return === null || isHostParent(node.return)) {
                // If we pop out of the root or hit the parent the fiber we are the
                // last sibling.
                return null;
            }

            node = node.return;
        }

        node.sibling.return = node.return;
        node = node.sibling;

        while (node.tag !== HostComponent && node.tag !== HostText && node.tag !== DehydratedSuspenseComponent) {
            // If it is not host node and, we might have a host node inside it.
            // Try to search down until we find one.
            if (node.effectTag & Placement) {
                // If we don't have a child, try the siblings instead.
                continue siblings;
            } // If we don't have a child, try the siblings instead.
            // We also skip portals because they are not part of this host tree.


            if (node.child === null || node.tag === HostPortal) {
                continue siblings;
            } else {
                node.child.return = node;
                node = node.child;
            }
        } // Check if this host node is stable or about to be placed.
        if (!(node.effectTag & Placement)) {
            // Found it!
            return node.stateNode;
        }
    }
}

/**
 * append到contaier,处理生命周期，结束render流程
 * @param {Object} root FiberNode
 */
function commitRoot(root) {
    const finishedWork = root.finishedWork;
    const expirationTime = root.finishedExpirationTime;
    if (finishedWork === null) {
        return null;
    }
    root.finishedWork = null;
    root.finishedExpirationTime = NoWork;
    root.callbackNode = null;
    // root.callbackExpirationTime = NoWork;
    //各种time设置
    // const updateExpirationTimeBeforeCommit = finishedWork.expirationTime;
    if (root == workInProgressRoot) {
        workInProgressRoot = null;
        workInProgress = null;
        renderExpirationTime = NoWork;
    }

    let firstEffect;
    if (finishedWork.effectTag > PerformedWork) {
        if (finishedWork.lastEffect != null) {
            finishedWork.lastEffect.nextEffect = finishedWork;
            firstEffect = finishedWork.firstEffect;
        } else {
            firstEffect = finishedWork;
        }
    } else {
        firstEffect = finishedWork.firstEffect;
    }
    if (firstEffect !== null) {
        //设置Context
        // const prevExecutionContext = executionContext;
        // executionContext |= CommitContext;
        let prevInteractions;
        ReactCurrentOwner.current = null;
    }
    //commitBeforeMutationEffects

    //commitMutationEffects
    nextEffect = firstEffect;
    do {
        try {
            const effectTag = nextEffect.effectTag;
            if (effectTag & ContentReset) {

            }
            if (effectTag & Ref) {

            }
            let primaryEffectTag = effectTag & (Placement | Update | Deletion);
            switch (primaryEffectTag) {
                case Placement:
                    const parentFiber = getHostParentFiber(nextEffect);
                    // Note: these two variables *must* always be updated together.
                    let parent;
                    let isContainer;
                    switch (parentFiber.tag) {
                        case HostComponent:
                            parent = parentFiber.stateNode;
                            isContainer = false;
                            break;
                        case HostRoot:
                            parent = parentFiber.stateNode.containerInfo;
                            isContainer = true;
                            break;
                        case HostPortal:
                            parent = parentFiber.stateNode.containerInfo;
                            isContainer = true;
                            break;
                        default:
                            throw Error('Invalid host parent fiber');
                    }
                    const before = getHostSibling(nextEffect);
                    let node = nextEffect;
                    while (true) {
                        if (node.tag === HostComponent || node.tag === HostText) {
                            const stateNode = node.stateNode;
                            if (before) {
                                if (isContainer) {

                                }
                            } else {
                                //COMMENTNODE情况
                                // if (isContainer) {
                                // }
                                parent.appendChild(stateNode);
                            }
                        } else if (node.tag === HostPortal) {

                        } else if (node.child !== null) {
                            node.child.return = node;
                            node = node.child;
                            continue;
                        }
                        if (node === finishedWork) {
                            return;
                        }
                        while (node.sibling === null) {
                            if (node.return === null || node.return === finishedWork) {
                                return;
                            }
                            node = node.return;
                        }
                        node.sibling.return = node.return;
                        node = node.sibling;
                    }
                    nextEffect.effectTag &= ~Placement;
                    break;

                case PlacementAndUpdate:
                    break;
                case Update:
                    const current = nextEffect.alternate;
                    // commitWork()
                    break;
                case Deletion:
                    break;
            }

            nextEffect = nextEffect.nextEffect;
        } catch (error) {
            throw Error('commit');
        }
    } while (nextEffect !== null);

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
                throw error;
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