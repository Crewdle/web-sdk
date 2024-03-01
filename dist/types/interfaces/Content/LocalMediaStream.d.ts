import { IMediaStream } from './MediaStream';
import { MediaStreamPriority } from './Types';
/**
 * The local media stream interface.
 * @category Media Stream
 */
export interface ILocalMediaStream extends IMediaStream {
    /**
     * Set the priority of the stream.
     * @param priority The priority of the stream.
     */
    setPriority(priority: MediaStreamPriority): void;
    /**
     * Unpublish the stream.
     */
    unpublish(): void;
}
