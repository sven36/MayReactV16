import React, { useState, useEffect } from './react_build/nodeModulesSource/react/index';
import ReactDOM from './react_build/nodeModulesSource/react-dom/index';

describe('ConcurrentMode.js', () => {
    // beforeEach(() => {
    //     // jest.resetModules();
    //     React = require('./react_build/nodeModulesSource/react/index');
    //     ReactDOM = require('./react_build/nodeModulesSource/react-dom/index');
    // });
    it('ConcurrentModeTest', () => {
        spyOn(console, 'error');
        var container = document.createElement('div');
        var styles = document.createElement('style');
        styles.type = 'text/css';
        document.body.appendChild(container);
        document.body.appendChild(styles);
        // const sheet = new CSSStyleSheet();
        let sheet = document.styleSheets[0];
        let width = window.innerWidth - 80;
        let keyframes = `@keyframes animated_box
        {
        0%		{transform: rotate(0deg);left:0px;}
        25%		{transform: rotate(20deg);left:0px;}
        50%		{transform: rotate(0deg);left:${width}px;}
        55%		{transform: rotate(0deg);left:${width}px;}
        70%		{transform: rotate(0deg);left:${width}px;background:#1ec7e6;}
        100%	{transform: rotate(-360deg);left:0px;}
        }`;
        // styleSheet.insertRule(keyframes, 0);
        sheet.insertRule(keyframes, 0)
        // document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

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
                    {confusingComputations()}
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
            return (
                <div style={containerStyle}>
                    <B1 />
                </div>
            );
        }

        // debugger
        ReactDOM.render(<A1 />, container);
        expect(console.error.calls.count()).toBe(0);
    })
    // it('does not fall into an infinite update loop with useLayoutEffect', () => {
    //     function NonTerminating() {
    //         const [step, setStep] = React.useState(0);
    //         // React.useLayoutEffect(() => {
    //         //     setStep(x => x + 1);
    //         // });
    //         return step;
    //     }

    //     const container = document.createElement('div');
    //     ReactDOM.render(<NonTerminating />, container);
    // });
})

function confusingComputations() {
    const iterations = 10;
    const multiplier = 1000000000;
    var primes = [];
    for (var i = 0; i < iterations; i++) {
        var candidate = i * (multiplier * Math.random());
        var isPrime = true;
        for (var c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(candidate);
        }
    }
    return primes.length;
}