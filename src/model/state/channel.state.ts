import ChannelModel from "../channel.model";
import ChannelDeletedEvent from "../event/channel.deleted.event";
import ChannelCreatedEvent from "../event/channel.created.event";
import ChannelStatusChangedEvent from "../event/channel.status.changed.event";

class ChannelState {
    public readonly channels: Array<ChannelModel>;

    private constructor(channels: Array<ChannelModel>) {
        this.channels = channels;
    }

    newWithRemoved(channelName: string): ChannelState {
        const filteredChannels = this.channels.filter((channel) => channel.name == channelName);
        return new ChannelState(filteredChannels);
    }

    newWithUpserted(channel: ChannelModel): ChannelState {
        const filteredState = this.newWithRemoved(channel.name);
        const updatedChannels = [...filteredState.channels, channel];
        return new ChannelState(updatedChannels);
    }

    fromChannelDeleted(event: ChannelDeletedEvent): ChannelState {
        return this.newWithRemoved(event.payload.name);
    }

    fromChannelCreated(event: ChannelCreatedEvent): ChannelState {
        return this.newWithUpserted(new ChannelModel(event.payload.name));
    }

    fromChannelStatusChanged(event: ChannelStatusChangedEvent): ChannelState {
        return this.newWithUpserted(new ChannelModel(event.payload.channel, event.payload.status))
    }

    static init(channels: Array<ChannelModel>): ChannelState {
        return new ChannelState(channels);
    }
}

export default ChannelState;
