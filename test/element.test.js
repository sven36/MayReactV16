

import React, { useState, useEffect } from './react_build/nodeModulesSource/react/index';
import ReactDOM from './react_build/nodeModulesSource/react-dom/index';

describe('may.js', () => {

	it('mayRender', () => {
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
			}
			handleClick = (e) => {
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
			handelMouseEnter = (e) => {
				console.log('handelMouseEnter');
				this.setState({ val: 'handelMouseEnter' });
			}
			handelMouseOver = (e) => {
				console.log('handelMouseOver');
				this.setState({ val: 'handelMouseOver' });
			}
			render() {
				return (
					<div className="mystyle" draggable="true" style={divStyle} onDrag={this.handleDrag} onClick={this.handleClick} onMouseEnter={this.handelMouseEnter} onMouseOver={this.handelMouseOver}>
						{this.state.val}
						<input onChange={this.handleChange} style={inputStyle} />
					</div>
				);
			}
		}
		// debugger
		ReactDOM.render(<Parent />, container);
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