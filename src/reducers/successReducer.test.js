import { actionTypes } from '../actions';
import successReducer from './successReducer';

test('returns default initial state of false when no action is passed', () => {
  const newState = successReducer();
  expect(newState).toBe(false);
});

test('returns state of true upon reciving an action of type CORRECT_GUESS', () => {
  const newState = successReducer(undefined, { type: actionTypes.CORRECT_GUESS });
  expect(newState).toBe(true);
});
