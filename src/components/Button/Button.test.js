import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Button from './Button';

describe('Button', () => {
  const props = {
    onClick: () => document.createElement('test'),
  };
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button {...props}>Give me more</Button>, div);
  });

  test('snapshot', () => {
    const component = renderer.create(<Button {...props}>Give me more</Button>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('shows two items in list', () => {
    const element = shallow(<Button {...props} />);
    element.find('button').simulate('click');
    expect(element.contains(<input />));
  });
});
