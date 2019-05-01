import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import App, { UnconnectedApp } from './App';

import EnzymeAdapter from 'enzyme-adapter-react-16';

Enzyme.configure({ 
  adapter: new EnzymeAdapter(),
  disableLifecycleMethods: true,
});

/**
 * Factory function to create a ShallowWrapper for the App component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<App store={store} />).dive().dive();
  //console.log(wrapper.debug());
  return wrapper;
};

//it('renders without crashing', () => {
//  const div = document.createElement('div');
//  ReactDOM.render(<App />, div);
//  ReactDOM.unmountComponentAtNode(div);
//});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success); 
  });

  test('has success piece of secret word state', () => {
    const secretWord = 'party';
    const wrapper = setup({ secretWord });
    const secretWordProp = wrapper.instance().props.secretWord;
    expect(secretWordProp).toBe(secretWord); 
  });

  test('has success piece of guessed words state', () => {
    const guessedWords = [{ guessedWord: 'train', letterMatchCount: 3 }];
    const wrapper = setup({ guessedWords });
    const guessedWordsProp = wrapper.instance().props.guessedWords;
    expect(guessedWordsProp).toEqual(guessedWords); 
  });

  test('getSecretWord action creator is a function prop', () => {
    const wrapper = setup();
    const getSecretWordProp = wrapper.instance().props.getSecretWord;
    expect(getSecretWordProp).toBeInstanceOf(Function);
  });
});

test('getSecretWord runs on App mount', () => {
  const getSecretWordMock = jest.fn();
  const props = {
    getSecretWord: getSecretWordMock,
    success: false,
    guessedWords: [],
  };

  // set up app component with getSecretWordMock as the getSecretWord prop
  const wrapper = shallow(<UnconnectedApp {...props} />);

  // run lifecycle method
  wrapper.instance().componentDidMount();

  // check to see if mock method ran
  const getSecretWordCallCount = getSecretWordMock.mock.calls.length;
  expect(getSecretWordCallCount).toBe(1);
});
