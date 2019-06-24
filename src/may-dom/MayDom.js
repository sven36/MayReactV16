
import { ReactRoot, ReactSyncRoot, LegacyRoot, unbatchedUpdates } from './scheduleWork';

function render(element, container, callback) {
    let root = container._reactRootContainer;
    let fiberRoot;
    if (!root) {
        //forceHydrate Hydrate true render false

        const shouldHydrate = false;
        let rootSibling;
        while (rootSibling = container.lastChild) {
            container.removeChild(rootSibling);
        };
        //render   shouldHydrateDueToLegacyHeuristic
        root = container._reactRootContainer = new ReactSyncRoot(container, LegacyRoot, shouldHydrate);
        fiberRoot = root._internalRoot;
        if (typeof callback === 'function') {
            //TODO 有回调添加回调
        }
        unbatchedUpdates(() => {
            updateContainer(children, fiberRoot, null, callback);
        })
    }
}
let MayDom = {
    render: render
};
export default MayDom;