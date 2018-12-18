import React from 'react';
import ReactDOM from 'react-dom';
import Boot from './Boot';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Boot />, div);
    ReactDOM.unmountComponentAtNode(div);
});
