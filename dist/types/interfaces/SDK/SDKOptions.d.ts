import { ILoggingConnector } from '../SDK/LoggingConnector';
/**
 * Options to configure the SDK.
 */
export interface ISDKOptions {
    /**
     * The audio context to use for audio processing.
     */
    audioContext?: AudioContext;
    /**
     * The flag to disable the interval hack that ensures the intervals run at the correct time.
     */
    disableIntervalHack?: boolean;
    /**
     * The custom logging connector to use for logging events.
     */
    loggingConnectors?: ILoggingConnector[];
    /**
     * The maximum number of outgoing subscriptions.
     */
    maxOutgoingSubscriptions?: number;
    /**
     * The minimum number of initial connections.
     */
    minConnections?: number;
    /**
     * The maximum number of connections a user can have.
     */
    maxConnections?: number;
    /**
     * The maximum distance allowed between two users in the network.
     */
    maxDistance?: number;
    /**
     * The maximum frame rate to use for video.
     */
    maxFps?: number;
    /**
     * The maximum bits per pixel to use for video.
     */
    maxBpp?: number;
}
