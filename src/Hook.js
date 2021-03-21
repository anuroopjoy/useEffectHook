import React, { useState, useEffect } from 'react';
import { Channel } from './Listener';

const ChannelAPI = new Channel();
export default function HookSample() {
    const [count, setCount] = useState(0);
    const [color, setColor] = useState('blue');

    useEffect(() => {
        function handleStatusChange(status) {
            console.log(status);
        }
        document.title = `You clicked ${count} times`;
        ChannelAPI.subscribeToChannel(count, handleStatusChange);
        return () => {
            ChannelAPI.unsubscribeToChannel(count);
        };
    }, [count]);

    return (
        <div style={{ backgroundColor: color }}>
            <p>You clicked {count} times</p>
            <button onClick={() => setCount(count + 1)}>Click me</button>
            <button
                onClick={() => setColor(color === 'blue' ? 'white' : 'blue')}
            >
                Change color
            </button>
        </div>
    );
}
