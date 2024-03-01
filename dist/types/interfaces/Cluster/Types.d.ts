import { IClusterEvents } from './ClusterEvents';
/**
 * The event keys that can be listened to on a cluster.
 * @category Core
 */
export type ClusterEventKeys = keyof IClusterEvents;
/**
 * A function that can be used to listen for events on a cluster.
 * @category Core
 */
export type ClusterOnFunction = {
    /**
     * Allows listening to events published on the cluster.
     * @typeParam U - Any of the events defined in {@link IClusterEvents}.
     * @param event - One of the events defined in {@link IClusterEvents}.
     * @param listener - The callback when the event is received. Listeners' payload are defined in {@link IClusterEvents}.
     */
    <U extends ClusterEventKeys>(event: U, listener: IClusterEvents[U]): void;
};
