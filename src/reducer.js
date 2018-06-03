"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var defaultState = {
    operands: ['', ''],
    operator: null,
    history: [],
};
var getResult = function (operands, operator) {
    var result;
    switch (operator) {
        case '+': {
            result = (parseFloat(operands[0]) + parseFloat(operands[1])).toString();
            break;
        }
        case '-': {
            result = (parseFloat(operands[0]) - parseFloat(operands[1])).toString();
            break;
        }
        case '*': {
            result = (parseFloat(operands[0]) * parseFloat(operands[1])).toString();
            break;
        }
        case '/': {
            result = (parseFloat(operands[0]) / parseFloat(operands[1])).toString();
            break;
        }
        case '^': {
            result = Math.pow(parseFloat(operands[0]), parseFloat(operands[1])).toString();
            break;
        }
        default: {
            throw new Error('Unexpected operator: ' + operator);
        }
    }
    return result;
};
var mainReducer = function (state, action) {
    if (state === void 0) { state = defaultState; }
    switch (action.type) {
        case 'PRESS_NUMBER': {
            var newOperands = state.operands.slice();
            var indexToChange = state.operator === null ? 0 : 1;
            newOperands[indexToChange] = newOperands[indexToChange].concat(action.number);
            return __assign({}, state, { operands: newOperands });
        }
        case 'PRESS_OPERATOR': {
            var shouldEval = state.operator !== null &&
                state.operands[0].length > 0 &&
                state.operands[1].length > 0;
            if (!shouldEval) {
                return __assign({}, state, { operator: action.operator });
            }
            var result = getResult(state.operands, state.operator);
            return __assign({}, state, { operands: [result, ''], operator: action.operator, history: state.history.concat([
                    state.operands[0] +
                        ' ' +
                        state.operator +
                        ' ' +
                        state.operands[1] +
                        ' = ' +
                        result,
                ]) });
        }
        case 'PRESS_EQUAL': {
            var result = getResult(state.operands, state.operator);
            return __assign({}, state, { operands: [result, ''], operator: null, history: state.history.concat([
                    state.operands[0] +
                        ' ' +
                        state.operator +
                        ' ' +
                        state.operands[1] +
                        ' = ' +
                        result,
                ]) });
        }
        case 'CLEAR_ENTRY': {
            return __assign({}, defaultState, { history: state.history });
        }
        case 'CLEAR_ALL': {
            return defaultState;
        }
        case 'FLIP_SIGN': {
            var newOperands = state.operands.slice();
            var indexToChange = state.operator === null ? 0 : 1;
            newOperands[indexToChange] = (-1 * parseFloat(newOperands[indexToChange])).toString();
            return __assign({}, state, { operands: newOperands });
        }
        default: {
            return state;
        }
    }
};
exports.default = mainReducer;
//# sourceMappingURL=reducer.js.map