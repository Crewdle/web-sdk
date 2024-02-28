import { ContentType } from './Types';
/**
 * The stream interface.
 */
export interface IStream {
    /**
     * Get the label of the stream.
     * @returns The label of the stream.
     */
    getLabel(): string;
    /**
     * Get the owner ID of the stream.
     * @returns The owner ID of the stream.
     */
    getOwnerId(): string;
    /**
     * Get the content type of the stream.
     * @returns The content type of the stream.
     */
    getContentType(): ContentType;
}
