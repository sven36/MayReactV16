import { getType, HostText, REACT_ELEMENT_TYPE, REACT_FRAGMENT_TYPE, REACT_PORTAL_TYPE, NoEffect, IndeterminateComponent, ClassComponent, HostComponent } from "../utils";
// This is a constructor function, rather than a POJO constructor, still
// please ensure we do the following:
// 1) Nobody should add any instance methods on this. Instance methods can be
//    more difficult to predict when they get optimized and they are almost
//    never inlined properly in static compilers.
// 2) Nobody should rely on `instanceof Fiber` for type testing. We should
//    always know when it is a fiber.
// 3) We might want to experiment with using numeric keys since they are easier
//    to optimize in a non-JIT environment.
// 4) We can easily go from a constructor to a createFiber object literal if that
//    is faster.
// 5) It should be easy to port this to a C struct and keep a C implementation
//    compatible.
const createFiber = function (tag, pendingProps, key, mode) {
    return new FiberNode(tag, pendingProps, key, mode);
}
function FiberNode(tag, pendingProps, key, mode) {
    // Instance
    this.tag = tag;
    this.key = key;
    this.elementType = null;
    this.type = null;
    this.stateNode = null;
    // Fiber
    this.return = null;
    this.alternate = null;
    this.updateQueue = null;
    this.child = null;
    this.sibling = null;
    this.index = 0;
    this.pendingProps = pendingProps;
    this.mode = mode;
    // Effects 判断该Node应该update还是delete
    this.effectTag = NoEffect;
    this.nextEffect = null;

    this.firstEffect = null;
    this.lastEffect = null;
}
let threadIDCounter = 0;

const FiberRootNode = function (containerInfo, tag, hydrate) {
    this.tag = tag;
    this.hydrate = hydrate;
    this.current = null;
    this.containerInfo = containerInfo;
    this.interactionThreadID = ++threadIDCounter;
    this.memoizedInteractions = new Set();
    this.pendingInteractionMap = new Map();
}

/**
 * 从ClassComponent创建Fiber
 * @param {*} type 
 * @param {*} key 
 * @param {*} pendingProps 
 * @param {*} owner 
 * @param {*} mode 
 * @param {*} expirationTime 
 */
const createFiberFromTypeAndProps = function (type, key, pendingProps, owner, mode, expirationTime) {
    let fiber;
    let fiberTag = IndeterminateComponent;
    let resolvedType = type;

    if (typeof type === 'function') {
        var prototype = type.prototype;
        if (!!(prototype && prototype.isReactComponent)) {
            fiberTag = ClassComponent;
        }
    } else if (typeof type === 'string') {
        fiberTag = HostComponent;
    } else {
        switch (type) {
            case REACT_FRAGMENT_TYPE:

                break;

            default:
                break;
        }
    }
    fiber = createFiber(fiberTag, pendingProps, key, mode);
    fiber.elementType = fiber.type = type;
    fiber.expirationTime = expirationTime;
    return fiber;
}

const createChildFiber = function (parentFiber, newChild, expirationTime) {
    let type = getType(newChild);

    switch (type) {
        case '[object String]':
        case '[object Number]':
            const created = createFiber(HostText, '' + newChild, null, parentFiber.mode);
            created.expirationTime = expirationTime;
            created.return = parentFiber;
            return created;
        case '[object Boolean]':
        case '[object Function]':
        case '[object Symbol]':
        case '[object Array]':
            break;
        case '[object Object]':
            switch (newChild.$$typeof) {
                case REACT_ELEMENT_TYPE:
                    const type = newChild.type;
                    const key = newChild.key;
                    const pendingProps = newChild.props;
                    const created = createFiberFromTypeAndProps(type, key, pendingProps, null, parentFiber.mode, expirationTime)
                    // created.ref = coerceRef(returnFiber, null, newChild);
                    created.return = parentFiber;
                    return created;

                case REACT_PORTAL_TYPE:
                    break;
            }
        default:
            break;
    }
}



export { FiberRootNode, createFiber, createChildFiber };