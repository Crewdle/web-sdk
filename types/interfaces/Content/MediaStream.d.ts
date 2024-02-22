import { IStream } from './Stream';
/**
 * The media stream interface.
 */
export interface IMediaStream extends IStream {
    /**
     * Get the media stream.
     * @returns The media stream.
     */
    getMediaStream(): MediaStream;
}
