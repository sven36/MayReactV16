
import { ReactRoot } from './scheduleWork';

function render(element, container, callback) {
    let root = container._reactRootContainer;
    if (!root) {
        //forceHydrate Hydrate true render false

        const shouldHydrate = false;
        let rootSibling;
        while (rootSibling = container.lastChild) {
            container.removeChild(rootSibling);
        };
        //render   shouldHydrateDueToLegacyHeuristic
        var isConcurrent = false;

        root = container._reactRootContainer = new ReactRoot(container, isConcurrent, shouldHydrate);
    }
}
let MayDom = {
    render: render
};
export default MayDom;