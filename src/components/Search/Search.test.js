import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Search from './Search';

describe('Search', () => {
  const props = {
    onChange: () => true,
    onSubmit: () => true,
    children: 'test',
  };
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Search {...props}>Search</Search>, div);
  });

  test('snapshot', () => {
    const component = renderer.create(<Search {...props}>Search</Search>);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('displays input', () => {
    const element = shallow(<Search {...props} />);
    expect(element.contains(<input />));
  });
});
