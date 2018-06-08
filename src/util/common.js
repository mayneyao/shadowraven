import React from 'react';
import ReactDOM from 'react-dom';
import Message from '../components/Message/Message';

export function message(msg) {
    let div = document.getElementById('msg');
    ReactDOM.render(React.createElement(Message, {msg}), div);
}
