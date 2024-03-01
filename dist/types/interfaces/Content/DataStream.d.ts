import { IStream } from './Stream';
/**
 * The data stream interface.
 * @category Core
 */
export interface IDataStream extends IStream {
    /**
     * Get the name of the stream.
     * @returns The name of the stream.
     */
    getName(): string;
}
