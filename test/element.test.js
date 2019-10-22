

import React from '../react/build/node_modules/react/cjs/react.development';
import ReactDOM from '../react/build/node_modules/react-dom/index';

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
						{this.state.val === 'I wonder' ? <Child key="1" val="1" /> : <Child key="1" val="1" />}
						{this.state.val === 'I wonder' ? <Child key="2" val="2" /> : <Child key="3" val="3" />}
					</div>
				);
				// if (this.state.val === 'I wonder') {
				// 	return (
				// 		<div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }} onClick={this.Change}>
				// 			<Child key="1" val="1" />
				// 			<Child key="2" val="2" />
				// 		</div>
				// 	);
				// } else {
				// 	return (
				// 		<div className="mystyle" style={{ width: '40%', marginLeft: '30px', backgroundColor: 'blue' }} onClick={this.Change}>
				// 			<Child key="2" val="2" />
				// 			<Child key="1" val="1" />
				// 		</div>
				// 	);
				// }

			}
		}
		// debugger
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
						<div className="mystyle" onClick={this.Change} key='B1'>
							{'C1'}
							{this.state.val}
						</div>
						B2
					</React.Fragment>
				);
			}
		}
		debugger
		ReactDOM.render(<A />, container);
		expect(console.error.calls.count()).toBe(0);
	});


})