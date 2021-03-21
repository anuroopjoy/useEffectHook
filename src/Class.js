import React from 'react';
import { Channel } from './Listener';

const ChannelAPI = new Channel();
export default class ClassSample extends React.Component {
    constructor(props) {
        super(props);
        this.state = { count: 0, color: 'blue' };
        this.handleStatusChange = this.handleStatusChange.bind(this);
    }
    handleStatusChange(status) {
        console.log(status);
    }
    componentDidMount() {
        document.title = `You clicked ${this.state.count} times`;
        ChannelAPI.subscribeToChannel(
            this.state.count,
            this.handleStatusChange
        );
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.count !== this.state.count) {
            document.title = `You clicked ${this.state.count} times`;
            ChannelAPI.unsubscribeToChannel(prevState.count);
            ChannelAPI.subscribeToChannel(
                this.state.count,
                this.handleStatusChange
            );
        }
    }
    componentWillUnmount() {
        ChannelAPI.unsubscribeToChannel(this.state.count);
    }

    render() {
        return (
            <div style={{ backgroundColor: this.state.color }}>
                <p>You clicked {this.state.count} times</p>
                <button
                    onClick={() =>
                        this.setState((state) => ({ count: state.count + 1 }))
                    }
                >
                    Increase counter
                </button>
                <button
                    onClick={() =>
                        this.setState((state) => ({
                            color: state.color === 'blue' ? 'white' : 'blue'
                        }))
                    }
                >
                    Change color
                </button>
            </div>
        );
    }
}
