"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var test = require("tape");
var reducer_1 = require("../src/reducer");
var assertActionsYieldExpectedStates = function (reducer, defaultState, actions, expectedStates) {
    return function (assert) {
        var calculatedStates = [defaultState];
        actions.forEach(function (action, idx) {
            calculatedStates[idx + 1] = reducer(calculatedStates[idx], action);
        });
        assert.deepEqual(calculatedStates, [defaultState].concat(expectedStates));
        assert.end();
    };
};
var defaultState = {
    operands: ['', ''],
    operator: null,
    history: [],
};
var actions = [
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
var expectedStates = [
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
test('simple operation yields expected state', assertActionsYieldExpectedStates(reducer_1.default, defaultState, actions, expectedStates));
//# sourceMappingURL=index.js.map