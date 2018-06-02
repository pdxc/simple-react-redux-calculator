import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const defaultState = {
	operands: ['', ''],
	operator: null,
	history: [],
}

const getResult = (operands, operator) => {
	let result
	switch (operator) {
		case '+': {
			result = (
				parseFloat(operands[0], 10) + parseFloat(operands[1], 10)
			).toString()
			break
		}
		case '-': {
			result = (
				parseFloat(operands[0], 10) - parseFloat(operands[1], 10)
			).toString()
			break
		}
		case '*': {
			result = (
				parseFloat(operands[0], 10) * parseFloat(operands[1], 10)
			).toString()
			break
		}
		case '/': {
			result = (
				parseFloat(operands[0], 10) / parseFloat(operands[1], 10)
			).toString()
			break
		}
		case '^': {
			result = Math.pow(
				parseFloat(operands[0], 10),
				parseFloat(operands[1], 10)
			).toString()
			break
		}
		default: {
			throw new Error('Unexpected operator: ' + operator)
		}
	}

	return result
}

const mainReducer = (state = defaultState, action) => {
	switch (action.type) {
		case 'PRESS_NUMBER': {
			const newOperands = [...state.operands]
			const indexToChange = state.operator === null ? 0 : 1
			newOperands[indexToChange] = newOperands[indexToChange].concat(
				action.number
			)

			return {
				...state,
				operands: newOperands,
			}
		}
		case 'PRESS_OPERATOR': {
			const shouldEval =
				state.operator !== null &&
				state.operands[0].length > 0 &&
				state.operands[1].length > 0
			if (!shouldEval) {
				return {
					...state,
					operator: action.operator,
				}
			}

			let result = getResult(state.operands, state.operator)

			return {
				...state,
				operands: [result, ''],
				operator: action.operator,
				history: state.history.concat([
					state.operands[0] +
						' ' +
						state.operator +
						' ' +
						state.operands[1] +
						' = ' +
						result,
				]),
			}
		}
		case 'PRESS_EQUAL': {
			let result = getResult(state.operands, state.operator)

			return {
				...state,
				operands: [result, ''],
				operator: null,
				history: state.history.concat([
					state.operands[0] +
						' ' +
						state.operator +
						' ' +
						state.operands[1] +
						' = ' +
						result,
				]),
			}
		}
		case 'CLEAR_ENTRY': {
			return {
				...defaultState,
				history: state.history,
			}
		}
		case 'CLEAR_ALL': {
			return defaultState
		}
		case 'FLIP_SIGN': {
			const newOperands = [...state.operands]
			const indexToChange = state.operator === null ? 0 : 1
			newOperands[indexToChange] = (
				-1 * parseFloat(newOperands[indexToChange], 10)
			).toString()

			return {
				...state,
				operands: newOperands,
			}
		}
		default: {
			return state
		}
	}
}

const store = createStore(mainReducer)

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)
registerServiceWorker()
