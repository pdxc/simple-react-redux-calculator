import * as test from 'tape'
import mainReducer from '../src/reducer'

const assertActionsYieldExpectedStates = function(
	reducer,
	defaultState,
	actions,
	expectedStates
) {
	return function(assert) {
		var calculatedStates = [defaultState]
		actions.forEach(function(action, idx) {
			calculatedStates[idx + 1] = reducer(calculatedStates[idx], action)
		})
		assert.deepEqual(calculatedStates, [defaultState].concat(expectedStates))
		assert.end()
	}
}

const defaultState = {
	operands: ['', ''],
	operator: null,
	history: [],
}
const actions = [
	{
		type: 'PRESS_NUMBER',
		number: '5',
	},
	{
		type: 'PRESS_NUMBER',
		number: '6',
	},
	{
		type: 'PRESS_OPERATOR',
		operator: '*',
	},
	{
		type: 'PRESS_NUMBER',
		number: '2',
	},
	{
		type: 'PRESS_EQUAL',
	},
];
// [ { operands: [ '', '' ], operator: null, history: [] }, { operands: [ '5', '' ], operator: null, history: [] }, { operands: [ '56', '' ], operator: null, history: [] }, { operands: [ '56', '' ], operator: '*', history: [] }, { operands: [ '56', '2' ], operator: '*', history: [] }, { operands: [ '112', '' ], operator: null, history: [ '56 * 2 = 112' ] } ]

const expectedStates = [
	{
		operands: ['5', ''],
		operator: null,
		history: [],
	},
	{
		operands: ['56', ''],
		operator: null,
		history: [],
	},
	{
		operands: ['56', ''],
		operator: '*',
		history: [],
	},
	{
		operands: ['56', '2'],
		operator: '*',
		history: [],
	},
	{
		operands: ['112', ''],
		operator: null,
		history: ['56 * 2 = 112'],
	},
];

test('simple operation yields expected state', assertActionsYieldExpectedStates(
	mainReducer,
	defaultState,
	actions,
	expectedStates
))

