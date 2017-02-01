import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import App from './App';

describe('App', () => {
    it('renders', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
    });

    test('snapshots', () => {
        const component = renderer.create(<App />);
        const tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    });
});
