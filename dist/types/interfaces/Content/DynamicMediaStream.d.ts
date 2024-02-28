import { IMediaStream } from './MediaStream';
import { MediaStreamTransformer } from './Types';
/**
 * The dynamic media stream interface.
 */
export interface IDynamicMediaStream extends IMediaStream {
    /**
     * Set the transformations to apply to the stream.
     * @param transformations The transformations to apply to the stream.
     */
    setTransformations(transformations: MediaStreamTransformer[]): void;
}
