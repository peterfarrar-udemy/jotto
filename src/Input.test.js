import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { findByTestAttr, storeFactory } from '../test/testUtils';
import Input, { UnconnectedInput } from './Input';

Enzyme.configure({ adapter: new EnzymeAdapter() });


/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} initialState - Initial state for this setup
 * @returns {ShallowWrapper}
 */
const setup = (initialState={}) => {
  const store = storeFactory(initialState);
  const wrapper = shallow(<Input store={store} />).dive().dive();
//  console.log(wrapper.debug());
  return wrapper;
};
// A note on above:
//   The .dive().dive() gets us the return value from Input
//   No dive gets us the ContextProvider
//   One dive gets us Input component
//   Two dive gets us the output of the Input's render() method 
//   This has something to do with the return value for Input.js being the connect call
//   instead of the Input class

describe('render', () => {
  describe('word has not been guessed', () => {
    let wrapper;
    beforeEach(() => {
      const initialState = { success: false };
      wrapper = setup(initialState);
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(1);
    });

    test('renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(1);
    });
  });

  describe('word has been guessed', () => {
    let wrapper;
    beforeEach(() => {
      wrapper = setup({ success: true });
    });

    test('renders component without error', () => {
      const component = findByTestAttr(wrapper, 'component-input');
      expect(component.length).toBe(1);
    });

    test('does not renders input box', () => {
      const inputBox = findByTestAttr(wrapper, 'input-box');
      expect(inputBox.length).toBe(0);
    });

    test('does not renders submit button', () => {
      const submitButton = findByTestAttr(wrapper, 'submit-button');
      expect(submitButton.length).toBe(0);
    });
  });
});

describe('redux props', () => {
  test('has success piece of state as prop', () => {
    const success = true;
    const wrapper = setup({ success });
    const successProp = wrapper.instance().props.success;
    expect(successProp).toBe(success); 
  });

  test('guessWord action creator is a function prop', () => {
    const wrapper = setup();
    const guessWordProp = wrapper.instance().props.guessWord;
    expect(guessWordProp).toBeInstanceOf(Function);
  });
});

describe('GuessWord action creator call', () => {
  let guessWordMock;
  let wrapper;
  const guessedWord = 'train';

  beforeEach(() => {
    guessWordMock = jest.fn();
    const props = {
      guessWord: guessWordMock,
    };

    // set up app component with getSecretWordMock as the getSecretWord prop
    const store = storeFactory({ success: false });
    wrapper = shallow(<UnconnectedInput store={store} {...props} />);

    // add value to input (this method only works in React16.3 and above
    wrapper.instance().inputBox.current = { value: guessedWord };
    //console.log(wrapper.instance());

    // click the button
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {} });
  });

  test('calls guessWord runs on button click', () => {
    // check to see if mock method ran
    const guessWordCallCount = guessWordMock.mock.calls.length;
    expect(guessWordCallCount).toBe(1);
  });

  test('calls guessWord with input value as argument', () => {
    // check to see if mock method ran
    const guessWordArg = guessWordMock.mock.calls[0][0];
//    console.log('guessWordMock.mock.calls', guessWordMock.mock.calls);
//    console.log('guessWordArg', guessWordArg);
    expect(guessWordArg).toBe(guessedWord);
  });

  test('input nox clears on submit', () => {
    expect(wrapper.instance().inputBox.current.value).toBe('');
  });
});
