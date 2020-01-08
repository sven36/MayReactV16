

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
		class Parent extends React.Component {
			constructor() {
				super();
				this.state = { val: 'I wonder' };
			}
			Change = () => {
				this.setState({ val: 'I see' });
			}
			render() {
				return (
					<div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }} onClick={this.Change}>
						{this.state.val}
						{/* {this.state.val === 'I wonder' ? <Child key="1" val="1" /> : <Child key="1" val="1" />} */}
						{/* {this.state.val === 'I wonder' ? <Child key="2" val="2" /> : <Child key="3" val="3" />} */}
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