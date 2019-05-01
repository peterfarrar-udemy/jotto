import { actionTypes } from '../actions';

/**
 * @function secretWordReducer
 * @param {array} state - Array of guessed words
 * @param {object} action - Action to be reduced
 * @returns {array} = new secretWord state
 */
export default (state=null, action={}) => {
  switch(action.type) {
    case actionTypes.SET_SECRET_WORD:
      return action.payload;
    default:
      return state;
  };
};
