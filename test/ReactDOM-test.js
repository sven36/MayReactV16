

// import PropTypes from '../../lib/ReactPropTypes';
// import ReactTestUtils from "../../lib/ReactTestUtils";
// import React from '../src/May16';
// import ReactDOM from '../src/may-dom/MayDom';
import React from 'react';
import ReactDOM from 'react-dom';
import { useRequest } from 'ahooks';
// import {shallowCompare} from '../../src/PureComponent';

// var ReactDOM = {
//     render: render,
//     unmountComponentAtNode: unmountComponentAtNode,
//     findDOMNode: findDOMNode
// }
// React.render = render;


// // import React from "../../dist/ReactANU";
// // var ReactDOM = React;
// // var ReactTestUtils = {
// //   renderIntoDocument: function (element) {
// //     var div = document.createElement("div");
// //     return React.render(element, div);
// //   }
// // };
// // https://github.com/facebook/react/blob/master/src/renderers/__tests__/EventPluginHub-test.js

describe('may2.js', () => {

    it('mayRender2', () => {
        spyOn(console, 'error');
        var container = document.createElement('div');
        document.body.appendChild(container);
        const Article = () => {
            const { data, loading } = useRequest(new Promise((resolve) => {
                setTimeout(() => {
                    resolve({
                        time: new Date().getTime(),
                    });
                }, 1000);
            }), {
                cacheKey: 'article',
            });
            if (!data && loading) {
                return <p>loading</p>;
            }
            return (
                <>
                    <p>12332</p>
                </>
            );
        };
        ReactDOM.render(<Article />, container);

        // class Child extends React.Component {

        //     render() {
        //         return (
        //             <div>
        //                 {this.props.val}
        //             </div>);
        //     }
        // }
        // class Parent extends React.Component {
        //     constructor() {
        //         super();
        //         this.state = { val: 'I wonder' };
        //     }
        //     Change = () => {
        //         this.setState({ val: 'I see' });
        //     }
        //     render() {
        //         return (
        //             <div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }} onClick={this.Change}>
        // 				{this.state.val}
        //                 {/* {this.state.val === 'I wonder' ? <Child key="1" val="1" /> : <Child key="1" val="1" />} */}
        //                 {/* {this.state.val === 'I wonder' ? <Child key="2" val="2" /> : <Child key="3" val="3" />} */}
        //             </div>
        //         );
        //     }
        // }
        // ReactDOM.render(<Parent />, container);
        expect(console.error.calls.count()).toBe(0);
    });


})

// describe("ReactDOM", function () {
//   // this.timeout(200000);

//   it('allows a DOM element to be used with a string', () => {
//     var element = React.createElement('div', { className: 'foo' });
//     var instance = ReactTestUtils.renderIntoDocument(element);
//     expect(ReactDOM.findDOMNode(instance).tagName).toBe('DIV');
//   });

//   it('should allow children to be passed as an argument', () => {
//     var argDiv = ReactTestUtils.renderIntoDocument(
//       React.createElement('div', null, 'child'),
//     );
//     var argNode = ReactDOM.findDOMNode(argDiv);
//     expect(argNode.innerHTML).toBe('child');
//   });

//   it('should overwrite props.children with children argument', () => {
//     var conflictDiv = ReactTestUtils.renderIntoDocument(
//       React.createElement('div', { children: 'fakechild' }, 'child'),
//     );
//     var conflictNode = ReactDOM.findDOMNode(conflictDiv);
//     expect(conflictNode.innerHTML).toBe('child');
//   });

//   /**
//    * We need to make sure that updates occur to the actual node that's in the
//    * DOM, instead of a stale cache.
//    */
//   it('should purge the DOM cache when removing nodes', () => {
//     var myDiv = ReactTestUtils.renderIntoDocument(
//       <div>
//         <div key="theDog" className="dog" />,
//         <div key="theBird" className="bird" />
//       </div>,
//     );
//     // Warm the cache with theDog
//     myDiv = ReactTestUtils.renderIntoDocument(
//       <div>
//         <div key="theDog" className="dogbeforedelete" />,
//         <div key="theBird" className="bird" />,
//       </div>,
//     );
//     // Remove theDog - this should purge the cache
//     myDiv = ReactTestUtils.renderIntoDocument(
//       <div>
//         <div key="theBird" className="bird" />,
//       </div>,
//     );
//     // Now, put theDog back. It's now a different DOM node.
//     myDiv = ReactTestUtils.renderIntoDocument(
//       <div>
//         <div key="theDog" className="dog" />,
//         <div key="theBird" className="bird" />,
//       </div>,
//     );
//     // Change the className of theDog. It will use the same element
//     myDiv = ReactTestUtils.renderIntoDocument(
//       <div>
//         <div key="theDog" className="bigdog" />,
//         <div key="theBird" className="bird" />,
//       </div>,
//     );
//     var root = ReactDOM.findDOMNode(myDiv);
//     var dog = root.childNodes[0];
//     expect(dog.className).toBe('bigdog');
//   });
// })