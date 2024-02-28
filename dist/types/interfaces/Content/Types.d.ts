/**
 * The type of content of a stream.
 */
export declare enum ContentType {
    Data = "data",
    Media = "media",
    File = "file",
    PubSub = "pubsub",
    ObjectStore = "objectstore",
    KeyValueDatabase = "keyvaluedatabase"
}
/**
 * The priority of a media stream. Higher priority streams will be prioritized over lower priority streams for quality of experience.
 */
export declare enum MediaStreamPriority {
    High = 1,
    Default = 2,
    Low = 3
}
/**
 * A function that validates media subscription parameters.
 * @param params The media subscription parameters to validate.
 * @returns True if the media subscription parameters are valid.
 * @throws {@link SDKClientErrorCodes.RemoteMediaStreamInvalidSubscriptionParams} if the subscription parameters are invalid.
 */
export declare function isValidMediaSubscriptionParams(params: unknown): params is MediaSubscriptionParams;
/**
 * The subscription parameters for a media stream.
 */
export type MediaSubscriptionParams = {
    /**
     * The video subscription parameters.
     */
    video?: VideoSubscriptionParams | boolean;
    /**
     * The audio subscription parameters.
     */
    audio?: AudioSubscriptionParams | boolean;
};
/**
 * The subscription parameters for a video track.
 */
export type VideoSubscriptionParams = {
    /**
     * The maximum resolution for the video track.
     */
    maxResolution?: Resolution;
    /**
     * The HTML element to render the video track to.
     */
    renderElement?: HTMLVideoElement;
};
/**
 * The subscription parameters for an audio track.
 */
export type AudioSubscriptionParams = {};
/**
 * The subscription parameters for a track.
 */
export type TrackSubscriptionParams = VideoSubscriptionParams | AudioSubscriptionParams;
/**
 * The maximum resolution for a video track.
 */
export type Resolution = {
    /**
     * The width of the resolution.
     */
    width: number;
    /**
     * The height of the resolution.
     */
    height: number;
};
/**
 * The media stream transformer. Used to transform the media stream before it is sent.
 * @param imageData The image data to transform.
 * @returns The transformed image data.
 */
export type MediaStreamTransformer = (imageData: ImageData) => ImageData;
/**
 * The media track kind. Can be either 'audio' or 'video'.
 */
export type MediaTrackKind = 'audio' | 'video';
/**
 * The media source. Can be either a media stream or a HTML video element.
 */
export type MediaStreamSource = MediaStream | HTMLVideoElement;
