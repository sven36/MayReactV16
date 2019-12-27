import React, { useState, useEffect } from './react_build/nodeModulesSource/react/index';
import ReactDOM from './react_build/nodeModulesSource/react-dom/index';


describe('ConcurrentMode.js', () => {
    it('A-render', () => {
        spyOn(console, 'error');

        var container = document.createElement('div');
        document.body.appendChild(container);
        const sheet = new CSSStyleSheet();
        // let styleSheet = document.styleSheets[0];
        let keyframes = `@keyframes animated_box
        {
        0%		{transform: rotate(0deg);left:0px;}
        25%		{transform: rotate(20deg);left:0px;}
        50%		{transform: rotate(0deg);left:500px;}
        55%		{transform: rotate(0deg);left:500px;}
        70%		{transform: rotate(0deg);left:500px;background:#1ec7e6;}
        100%	{transform: rotate(-360deg);left:0px;}
        }`;
        // styleSheet.insertRule(keyframes, 0);
        sheet.insertRule(keyframes, 0)
        document.adoptedStyleSheets = [...document.adoptedStyleSheets, sheet];

        function C1() {
            let happyBoxStyle = {
                width: '60px',
                height: '40px',
                position: "releative",
                animation: 'animated_box 5s infinite',
                background: '#92B901'
            };
            return <div style={happyBoxStyle}>I am happyBox</div>;
        }

        function B1() {
            const [val, setVal] = useState('')
            handleChange = (e) => {
                let target = e && e.target;
                let v = target && target.value;
                setVal(v);
            }
            let inputStyle = {
                display: block,
                padding: '16px',
                fontSize: '30px',
                width: '100%'
            }
            return (
                <React.Fragment>
                    <input onChange={this.handleChange} style={inputStyle} />
                    {confusingComputations() || val}
                    <C1 />
                </React.Fragment>
            );
        }
        function A1() {
            let containerStyle = {
                color: 'white'
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
    });
})

function confusingComputations() {
    const iterations = 50;
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
    return primes;
}