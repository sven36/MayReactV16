

{
    effectTag: 4,
    elementType: class A,
    firstEffect: null,
    memoizedState: {val: "C2"},
    type: class ClickCounter,
    stateNode: {
        state: {count: 1}
    },
    updateQueue: {
        baseState: {count: 1},
        firstUpdate: null,
        ...
    }
}








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

// class A extends React.Component {
//     constructor() {
//         super();
//         this.state = { val: 'C2' };
//     }
//     Change = () => {
//         this.setState({ val: 'C3' });
//     }
//     render() {
//         return (
//             <React.Fragment>
//                 <div className="mystyle" onClick={this.Change} key='B1'>
//                     {'C1'}
//                     {this.state.val}
//                 </div>
//                 B2
//             </React.Fragment>
//         );
//     }
// }
// ReactDOM.render(<A />, container);
export default React;