
// export const fakeObject = {
//     enqueueSetState: returnFalse,
//     isMounted: returnFalse
// };
function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater || null;
}

Component.prototype.isReactComponent = {};

Component.prototype.setState = function (partialState, callback) {
    this.updater.enqueueSetState(this, partialState, callback, 'setState');
}
Component.prototype.forceUpdate = function (callback) {
    this.updater.enqueueforceUpate(this, callback, 'forceUpdate');
}

function ComponentDummy() { }
ComponentDummy.prototype = Component.prototype;

function PureComponent(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater || null;
}
const pureComponentPrototype = (PureComponent.prototype = new ComponentDummy());
pureComponentPrototype.constructor = PureComponent;
Object.assign(pureComponentPrototype, Component.prototype);
pureComponentPrototype.isPureReactComponent = true;
export { Component, PureComponent };