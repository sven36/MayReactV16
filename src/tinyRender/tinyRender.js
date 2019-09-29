function Component(props, context, updater) {
    this.props = props;
    this.context = context;
    this.updater = updater || null;
}
import {
    createElement,
} from '../MayElement';
function render(element, container, callback) {

}


let React = {
    createElement,
    Component,
    render,
    PureComponent
}

}
export default React;