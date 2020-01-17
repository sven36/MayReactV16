

import React, { useState, useEffect,concur } from './react_build/nodeModulesSource/react/index';
import ReactDOM, { createRoot, flushSync } from './react_build/nodeModulesSource/react-dom/index';

describe('may.js', () => {

	it('mayRender', () => {
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
		class Child extends React.Component {
			render() {
				return (
					<div>
						{this.props.val}
					</div>);
			}
		}
		let inputStyle = {
			display: 'block',
			fontSize: '30px',
			marginTop: '30px',
			width: '100%'
		}
		let divStyle = {
			fontSize: '30px',
			marginTop: '30px',
			width: '100%',
			background: '#92B901'
		}
		let happyBoxStyle = {
			position: 'absolute',
			width: '80px',
			top: '120px',
			height: '50px',
			lineHeight: '50px',
			animation: 'animated_box 5s infinite',
			background: '#92B901'
		};
		class Parent extends React.Component {
			constructor() {
				super();
				this.state = { val: 'element.test.js' };
			}
			componentDidMount() {
				let dom = document.querySelector('.mystyle');
				const event = new MouseEvent('click', { bubbles: true });
				dom.dispatchEvent(event);
				const over = new MouseEvent('mouseover', { bubbles: true });
				dom.dispatchEvent(over);
				// let amiEvent = new AnimationEvent('animationstart', { bubbles: true });
				// let box = document.querySelector('.box');
				// box.dispatchEvent(amiEvent);
			}
			handleClick = (e) => {
				confusingComputations();
				console.log('handleClick');
				this.setState({ val: 'handleClick' });
			}
			handleDrag = (e) => {
				console.log('handleDrag');
				this.setState({ val: 'handleDrag' });
			}
			handleChange = (e) => {
				console.log('handleChange');
				this.setState({ val: 'handleChange' });
			}
			handelMouseOver = (e) => {
				console.log('handelMouseOver');
				this.setState({ val: 'handelMouseOver' });
			}
			handleAnimation = (e) => {
				console.log('handleAnimation');
				this.setState({ val: 'handleAnimation' });
			}
			render() {
				return (
					<div className="mystyle" draggable="true" style={divStyle} onDrag={this.handleDrag} onClick={this.handleClick} onMouseOver={this.handelMouseOver}>
						{this.state.val}
						<input onChange={this.handleChange} style={inputStyle} />
						<div className="box" onAnimationStart={this.handleAnimation} style={happyBoxStyle}>happyBox</div>
					</div>
				);
			}
		}
		// debugger
		createRoot(container).render(<Parent />);
		// ReactDOM.render(<Parent />, container);
		expect(console.error.calls.count()).toBe(0);
	});


})
describe('A.js', () => {
	it('A-render', () => {
		spyOn(console, 'error');
		var container = document.createElement('div');
		document.body.appendChild(container);
		class Child extends React.Component {
			render() {
				return (
					<div>
						{this.props.val}
					</div>);
			}
		}
		class A extends React.Component {
			constructor() {
				super();
				this.state = { val: 'C2' };
			}
			Change = () => {
				this.setState({ val: 'C3' });
			}
			render() {
				return (
					<React.Fragment>
						<div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }} onClick={this.Change} key='B1'>
							{'C1'}
							{this.state.val}
						</div>
						B2
					</React.Fragment>
				);
			}
		}
		// debugger
		// ReactDOM.render(<A />, container);
		expect(console.error.calls.count()).toBe(0);
	});
})
function confusingComputations() {
	const iterations = 500;
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