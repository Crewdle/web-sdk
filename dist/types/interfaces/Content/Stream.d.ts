import { ContentType } from './Types';
/**
 * The stream interface.
 * @category Core
 */
export interface IStream {
    /**
     * Get the owner ID of the stream.
     * @returns The owner ID of the stream.
     */
    getOwnerId(): string;
    /**
     * @internal
     * Get the content type of the stream.
     * @returns The content type of the stream.
     */
    getContentType(): ContentType;
}
