import { IMediaStream } from './MediaStream';
import { MediaSubscriptionParams, MediaTrackKind } from './Types';
/**
 * The unsubscribe callback.
 * @category Media Stream
 */
export type Unsubscribe = () => void;
/**
 * The remote media stream interface.
 * @category Media Stream
 */
export interface IRemoteMediaStream extends IMediaStream {
    /**
     * Get the available track kinds.
     * @returns The available track kinds.
     */
    getAvailableTrackKinds(): MediaTrackKind[];
    /**
     * Subscribe to track kinds of the stream. Passing no track kinds will subscribe to all available track kinds.
     * @param params The subscription parameters.
     * @throws {@link SDKClientErrorCodes.SubscriptionRequestInProgress} if the subscription is already in progress.
     * @throws {@link SDKClientErrorCodes.RemoteMediaStreamInvalidSubscriptionParams} if the subscription parameters are invalid.
     */
    subscribe(params?: MediaSubscriptionParams): void;
    /**
     * Update the subscription parameters.
     * @param params The subscription parameters.
     * @throws {@link SDKClientErrorCodes.RemoteMediaStreamInvalidSubscriptionParams} if the subscription parameters are invalid.
     */
    update(params: MediaSubscriptionParams): void;
    /**
     * Unsubscribe from track kinds of the stream. Passing no track kinds will unsubscribe from all subscribed track kinds.
     * @param trackKinds The track kinds to unsubscribe from.
     */
    unsubscribe(trackKinds?: MediaTrackKind | MediaTrackKind[]): void;
    /**
     * Subscribe to when the provider of the stream changes.
     * @param callback The callback to invoke when the provider changes.
     */
    onProviderChanged(callback: (providerId: string | undefined) => void): Unsubscribe;
}
