
import { ReactRoot, ReactSyncRoot, unbatchedUpdates, updateContainer } from './scheduleWork';
import { LegacyRoot } from '../utils';

function render(element, container, callback) {
    let root = container._reactRootContainer;
    let fiberRoot;
    window.__container = container;
    if (!root) {
        //forceHydrate Hydrate true render false

        const shouldHydrate = false;
        let rootSibling;
        while (rootSibling = container.lastChild) {
            container.removeChild(rootSibling);
        };
        //render   shouldHydrateDueToLegacyHeuristic
        //container也会Fiber化 不同于普通的FiberNode 专有FiberRootNode加入许多流程控制属性，其current也是一个tag为3 HostRoot
        //的普通FiberNode  该FiberNode的stateNode又指回 FiberRootNode实例 stateNode之意指保存render中各种state的Node吧
        root = container._reactRootContainer = new ReactSyncRoot(container, LegacyRoot, shouldHydrate);
        fiberRoot = root._internalRoot;
        if (typeof callback === 'function') {
            //TODO 有回调添加回调
        }
        // unbatchedUpdates(() => {
        updateContainer(element, fiberRoot, null, callback);
        // })
    }
}
let MayDom = {
    render: render
};
export default MayDom;