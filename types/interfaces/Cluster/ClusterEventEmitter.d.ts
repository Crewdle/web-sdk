import { ClusterOnFunction } from './Types';
/**
 * The cluster event emitter interface.
 */
export interface IClusterEventEmitter {
    /**
     * Allows listening to events published on the cluster.
     * @typeParam U - Any of the events defined in {@link IClusterEvents}.
     * @param event - One of the events defined in {@link IClusterEvents}.
     * @param listener - The callback when the event is received. Listeners' payload are defined in {@link IClusterEvents}.
     */
    on: ClusterOnFunction;
    /**
     * @overload
     * Unsubscribe from all events on the cluster
     */
    off(): void;
    /**
     * @overload
     * Unsubscribe to an event.
     * @param event - The event to unsubscribe from.
     */
    off(event: string): void;
    /**
     * @overload
     * Unsubscribe from all events, or a specific list of events.
     * @param events - The list of events to unsubscribe from.
     */
    off(events: string[]): void;
}
