export function dispatchEvent(nativeEvent) {
    //getEventTarget
    let target = nativeEvent.target || nativeEvent.srcElement || window; // Normalize SVG <use> element events #4963
    // Safari may fire events on text nodes (Node.TEXT_NODE is 3).
    target = target.nodeType === 3 ? target.parentNode : target;
    let fiberNode = target['internalInstanceKey'];
    let root = null;

    while (fiberNode.return) {
        fiberNode = fiberNode.return;
    }
    //HostRoot=3
    if (inst.tag === 3) {
        root = fiberNode.stateNode.containerInfo
    }
    //@TODO:还要考虑是否是suspense的情况,这里为了简单先不处理这种情况;

}

let isBatchingEventUpdates = false;
function batchedEventUpdates(fn, a, b) {
    if (isBatchingEventUpdates) {
        //
    }
    isBatchingEventUpdates = true;
    try {
        return fn(a, b);
    } finally {
        isBatchingEventUpdates = false;
        //finishEventHandler
        //flushSyncCallbackQueue
    }
}