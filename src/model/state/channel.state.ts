import ChannelModel from "../channel.model";
import ChannelDeletedEvent from "../event/channel.deleted.event";
import ChannelCreatedEvent from "../event/channel.created.event";
import ChannelStatusChangedEvent from "../event/channel.status.changed.event";

class ChannelState {
    private static INSTANCE = new ChannelState(new Array<ChannelModel>());
    public readonly channels: Array<ChannelModel>;

    private constructor(channels: Array<ChannelModel>) {
        this.channels = channels;
    }

    newWithRemoved(channelName: string): ChannelState {
        const filteredChannels = this.channels.filter((channel) => channel.name !== channelName);
        return new ChannelState(filteredChannels);
    }

    newWithSelected(channelName: string): ChannelState {
        const channelToSelect = this.channels.find((channel) => channel.name === channelName);
        const currentSelected = this.channels.find((channel) => channel.isSelected);

        if (channelToSelect === currentSelected) {
            return this;
        }

        if (channelToSelect !== undefined) {
            const selectedChannel = new ChannelModel(channelToSelect.name, channelToSelect.status, true);
            if (currentSelected !== undefined) {
                const deselectedChannel = new ChannelModel(currentSelected.name, currentSelected.status, false);
                const upsertedState = this.newWithUpserted(selectedChannel);

                return upsertedState.newWithUpserted(deselectedChannel);
            }

            return this.newWithUpserted(selectedChannel);
        }

        return this;
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
        const newChannel = new ChannelModel(event.payload.channel, event.payload.newStatus);
        console.log(`${event.payload.channel} channel status changed to : ${event.payload.newStatus}`);
        return this.newWithUpserted(newChannel);
    }

    static empty(): ChannelState {
        return ChannelState.INSTANCE;
    }

    static init(channels: Array<ChannelModel>): ChannelState {
        return new ChannelState(channels);
    }
}

export default ChannelState;
