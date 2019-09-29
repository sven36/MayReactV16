

import React from '../src/tinyRender/tinyRender';
import ReactDOM from '../src/tinyRender/tinyRender';

describe('tiny.js', () => {

    it('tinyRender', () => {
        spyOn(console, 'error');
        var container = document.createElement('div');
        document.body.appendChild(container);
        class Child extends React.Component {
            render() {
                return (
                    <p>
                        {this.props.val}
                    </p>);
            }
        }
        class Parent extends React.Component {
            constructor() {
                super();
            }
            render() {
                return (
                    <div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }}>
                        <Child key="1" val="1" />
                        <Child key="2" val="2" />
                    </div>
                );
            }
        }
        debugger
        ReactDOM.render(<Parent />, container);
        expect(console.error.calls.count()).toBe(0);
    });


})