import { IRemoteMediaStream } from '../Content/RemoteMediaStream';
import { MediaTrackKind } from '../Content/Types';
/**
 * The user event payload interface.
 * @category Core
 */
export interface IUserEventPayload {
    /**
     * The ID of the user.
     */
    id: string;
}
/**
 * The user info event payload interface.
 * @category Core
 */
export interface IUserInfoEventPayload extends IUserEventPayload {
    /**
     * The email of the user.
     */
    email: string;
    /**
     * The display name of the user.
     */
    displayName: string;
    remoteConnections: string[];
}
/**
 * The publish media stream event payload interface.
 * @category Media Stream
 */
export interface IPublishMediaStreamEventPayload {
    /**
     * The owner ID of the media stream.
     */
    ownerId: string;
    /**
     * The remote media stream.
     */
    stream: IRemoteMediaStream;
}
/**
 * The unpublish media stream event payload interface.
 * @category Media Stream
 */
export interface IUnpublishMediaStreamEventPayload {
    /**
     * The owner ID of the media stream.
     */
    ownerId: string;
    /**
     * The label of the media stream.
     */
    label: string;
}
/**
 * The local media stream track fail event payload interface.
 * @category Media Stream
 */
export interface ILocalMediaStreamTrackFailEventPayload {
    /**
     * The label of the media stream.
     */
    label: string;
    /**
     * The kind of the track.
     */
    trackKinds: MediaTrackKind[];
}
/**
 * The cluster events interface.
 * @category Core
 */
export interface IClusterEvents {
    /**
     * @event user-join - Event fired when a user joins the cluster.
     * @param payload The user info event payload.
     */
    'user-join': (payload: IUserInfoEventPayload) => void;
    /**
     * @event user-update - Event fired when a user updates its information.
     * @param payload The user info event payload.
     */
    'user-update': (payload: IUserInfoEventPayload) => void;
    /**
     * @event user-leave - Event fired when a user leaves the cluster.
     * @param payload The user event payload.
     */
    'user-leave': (payload: IUserEventPayload) => void;
    /**
     * @event user-publish-media - Event fired when a user publishes a new media stream.
     * @param payload The publish media stream event payload.
     */
    'user-publish-media': (payload: IPublishMediaStreamEventPayload) => void;
    /**
     * @event user-unpublish-media - Event fired when a user unpublishes a media stream.
     * @param payload The unpublish media stream event payload.
     */
    'user-unpublish-media': (payload: IUnpublishMediaStreamEventPayload) => void;
    /**
     * @event cluster-disconnect - Event fired when the current user is disconnected from the cluster.
     * @param payload The user event payload.
     */
    'cluster-disconnect': (payload: IUserEventPayload) => void;
    /**
     * @event local-media-stream-track-fail - Event fired when a local media stream track fails.
     * @param payload The local media stream track fail event payload.
     *
     * If the local media stream is a ILocalDynamicMediaStream, you can remove the failed track from the stream and add a new one to the stream.
     * If the local media stream is a ILocalMediaStream, you will have to unpublish the stream and publish a new one with new tracks.
     */
    'local-media-stream-track-fail': (payload: ILocalMediaStreamTrackFailEventPayload) => void;
}
