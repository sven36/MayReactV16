// import React, { useState, useEffect } from './react_build/nodeModulesSource/react/index';
// import ReactDOM from './react_build/nodeModulesSource/react-dom/index';
import React from '../src/May16';
import ReactDOM from '../src/may-dom/MayDom';

describe('ConcurrentMode.js', () => {
    it('ConcurrentModeTest', () => {
        spyOn(console, 'error');
        var container = document.createElement('div');
        document.body.appendChild(container);
        function B1() {
            const [val, setVal] = useState('')
            let handleChange = (e) => {
                let target = e && e.target;
                let v = target && target.value;
                setVal(v);
            }
            let inputStyle = {
                display: 'block',
                fontSize: '30px',
                marginTop: '30px',
                width: '100%'
            }
            return (
                <React.Fragment>
                    <input onChange={handleChange} style={inputStyle} />
                    {val}
                    <C1 />
                </React.Fragment>
            );
        }
        function C1() {
            let happyBoxStyle = {
                position: 'absolute',
                width: '80px',
                top: '120px',
                height: '50px',
                lineHeight: '50px',
                animation: 'animated_box 5s infinite',
                background: '#92B901'
            };
            return <div style={happyBoxStyle}>happyBox</div>;
        }

        function A1() {
            let containerStyle = {
                color: 'black'
            }
            let wrappClick = (e) => {
                console.log(e);
            }
            return (
                <div style={containerStyle} onClick={wrappClick}>
                    <B1 />
                </div>
            );
        }

        // debugger
        // ReactDOM.render(<A1 />, container);
        expect(console.error.calls.count()).toBe(0);
    })

})
