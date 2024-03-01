import { IStream } from './Stream';
/**
 * The media stream interface.
 * @category Core
 */
export interface IMediaStream extends IStream {
    /**
     * Get the label of the stream.
     * @returns The label of the stream.
     */
    getLabel(): string;
    /**
     * Get the media stream.
     * @returns The media stream.
     */
    getMediaStream(): MediaStream;
}
