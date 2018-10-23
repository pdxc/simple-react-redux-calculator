import React, { Component } from 'react'
import { connect } from 'react-redux'
import './App.css'

class App extends Component {
	render() {
		const {
			clearAll,
			clearEntry,
			flipSign,
			pressEqual,
			pressNumber,
			pressOperator,
		} = this.props

		return (
			<div className="App">
				<header className="App-header">
					<h1 className="App-title">Simple React/Redux Calculator</h1>
				</header>
				<div className="history">
					{this.props.history.map((line, idx) => {
						return (
							<div key={idx} className="historyLine">
								{line}
							</div>
						)
					})}
				</div>
				<div className="currentOperation">
					{this.props.operands[0].concat(' ')}
					{this.props.operator}
					{' '.concat(this.props.operands[1])}
				</div>
				<div className="calculator">
					<div className="special">
						<input type="button" onClick={() => clearAll()} value="AC" />
						<input type="button" onClick={() => clearEntry()} value="CE" />
						<input type="button" onClick={() => flipSign()} value="+/-" />
						<input type="button" onClick={() => pressOperator('^')} value="^" />
					</div>
					<div className="numbers">
						<div>
							<input type="button" onClick={() => pressNumber('7')} value="7" />
							<input type="button" onClick={() => pressNumber('8')} value="8" />
							<input type="button" onClick={() => pressNumber('9')} value="9" />
						</div>
						<div>
							<input type="button" onClick={() => pressNumber('4')} value="4" />
							<input type="button" onClick={() => pressNumber('5')} value="5" />
							<input type="button" onClick={() => pressNumber('6')} value="6" />
						</div>
						<div>
							<input type="button" onClick={() => pressNumber('1')} value="1" />
							<input type="button" onClick={() => pressNumber('2')} value="2" />
							<input type="button" onClick={() => pressNumber('3')} value="3" />
						</div>
						<div>
							<input type="button" onClick={() => pressNumber('.')} value="." />
							<input type="button" onClick={() => pressNumber('0')} value="0" />
							<input type="button" onClick={() => pressEqual('=')} value="=" />
						</div>
					</div>
					<div className="operators">
						<div>
							<input
								type="button"
								onClick={() => pressOperator('+')}
								value="+"
							/>
						</div>
						<div>
							<input
								type="button"
								onClick={() => pressOperator('-')}
								value="-"
							/>
						</div>
						<div>
							<input
								type="button"
								onClick={() => pressOperator('*')}
								value="*"
							/>
						</div>
						<div>
							<input
								type="button"
								onClick={() => pressOperator('/')}
								value="/"
							/>
						</div>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = state => {
	return state
}

const pe = () => {
	console.log('Hi there')
	return dispatch => {
		console.log('Hey')
		setTimeout(() => {
			dispatch({
				type: 'FLIP_SIGN',
			})
		}, 10000)
		dispatch({
			type: 'PRESS_EQUAL',
		})
	}
}

const mapDispatchToProps = dispatch => {
	return {
		clearAll: () => {
			dispatch({
				type: 'CLEAR_ALL',
			})
		},
		clearEntry: () => {
			dispatch({
				type: 'CLEAR_ENTRY',
			})
		},
		flipSign: () => {
			dispatch({
				type: 'FLIP_SIGN',
			})
		},
		pressEqual: () => {
			dispatch(pe())
		},
		pressNumber: number => {
			dispatch({
				type: 'PRESS_NUMBER',
				number,
			})
		},
		pressOperator: operator => {
			dispatch({
				type: 'PRESS_OPERATOR',
				operator,
			})
		},
	}
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(App)
