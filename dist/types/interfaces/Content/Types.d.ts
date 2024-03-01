/**
 * The type of content of a stream.
 * @category Core
 */
export declare enum ContentType {
    /**
     * The content is data.
     */
    Data = "data",
    /**
     * The content is media.
     */
    Media = "media",
    /**
     * The content is a file.
     */
    File = "file",
    /**
     * @ignore
     */
    PubSub = "pubsub",
    /**
     * @ignore
     */
    ObjectStore = "objectstore",
    /**
     * @ignore
     */
    KeyValueDatabase = "keyvaluedatabase"
}
/**
 * The priority of a media stream. Higher priority streams will be prioritized over lower priority streams for quality of experience.
 * @category Media Stream
 */
export declare enum MediaStreamPriority {
    /**
     * The highest priority.
     */
    High = 1,
    /**
     * The default priority.
     */
    Default = 2,
    /**
     * The lowest priority.
     */
    Low = 3
}
/**
 * A function that validates media subscription parameters.
 * @param params The media subscription parameters to validate.
 * @returns True if the media subscription parameters are valid.
 * @throws {@link SDKClientErrorCodes.RemoteMediaStreamInvalidSubscriptionParams} if the subscription parameters are invalid.
 * @category Media Stream
 */
export declare function isValidMediaSubscriptionParams(params: unknown): params is MediaSubscriptionParams;
/**
 * The subscription parameters for a media stream.
 * @category Media Stream
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
 * @category Media Stream
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
 * @category Media Stream
 */
export type AudioSubscriptionParams = {};
/**
 * The subscription parameters for a track.
 * @category Media Stream
 */
export type TrackSubscriptionParams = VideoSubscriptionParams | AudioSubscriptionParams;
/**
 * The maximum resolution for a video track.
 * @category Media Stream
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
 * @category Media Stream
 */
export type MediaStreamTransformer = (imageData: ImageData) => ImageData;
/**
 * The media track kind. Can be either 'audio' or 'video'.
 * @category Media Stream
 */
export type MediaTrackKind = 'audio' | 'video';
/**
 * The media source. Can be either a media stream or a HTML video element.
 * @category Media Stream
 */
export type MediaStreamSource = MediaStream | HTMLVideoElement;
