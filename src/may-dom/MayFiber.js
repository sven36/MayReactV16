
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
    this.child = null;
    this.sibling = null;
    this.index = 0;
    this.pendingProps = pendingProps;
    this.mode = mode;
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
export { FiberRootNode, createFiber };