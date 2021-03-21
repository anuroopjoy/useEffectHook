import { Subject } from 'rxjs';

export function Channel() {
    this.channels = {};
    this.subscribeToChannel = (id, callback) => {
        let channel;
        if (this.channels[id]) {
            channel = this.channels[id].src;
        } else {
            channel = new Subject();
        }
        const subscription = channel.subscribe(callback);
        this.channels[id] = {
            src: channel,
            destroy: subscription
        };
        console.log(`subscription added for ${id}`);
    };

    this.unsubscribeToChannel = (id) => {
        if (this.channels[id]) {
            this.channels[id].destroy.unsubscribe();
            delete this.channels[id];
            console.log(`subscription removed for ${id}`);
        }
    };
}

export function SingleChannel() {
    this.subscribeToChannel = (callback) => {
        const channel = new Subject();
        this.channel = {
            src: channel,
            destroy: channel.subscribe(callback)
        };
        console.log('subscription added');
    };

    this.unsubscribeToChannel = () => {
        this.channel.destroy.unsubscribe();
        this.channel = null;
        console.log('subscription removed');
    };
}
