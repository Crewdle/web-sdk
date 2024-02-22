import { IDataStream } from './DataStream';
/**
 * The pub/sub topic interface.
 */
export interface IPubSubTopic<T> extends IDataStream {
    /**
     * Publish content to the topic.
     * @param content The content to publish. Content needs to be a valid JSON.stringify argument.
     * @param userIds The user IDs to publish to.
     */
    publish(content: T | File, userIds?: string[]): void;
    /**
     * Subscribe to the topic.
     * @typeParam U - Any of the content types defined in {@link ISubscriptions}.
     * @param contentType - One of the content type defined in {@link ISubscriptions}.
     * @param callback - The callback when the content is received. callbacks' payload are defined in {@link ISubscriptions}.
     */
    subscribe: SubscribeFunction<T>;
    /**
     * Unsubscribe from the topic.
     */
    unsubscribe(contentType: SubscriptionKeys<T>): void;
    /**
     * Close the topic.
     */
    close(): void;
}
/**
 * The pub/sub topic subscriptions interface.
 */
export interface ISubscriptions<T> {
    /**
     * @event data - To subscribe to data events.
     * @param userId The user ID of the user who published the data.
     * @param content The content that was published.
     */
    'data': (userId: string, content: T) => void;
    /**
     * @event file - To subscribe to file events.
     * @param userId The user ID of the user who published the file.
     * @param content The file that was published.
     */
    'file': (userId: string, content: File) => void;
}
/**
 * The pub/sub topic subscription keys.
 */
export type SubscriptionKeys<T> = keyof ISubscriptions<T>;
/**
 * The pub/sub topic subscribe function.
 */
export type SubscribeFunction<T> = {
    /**
     * Subscribe to the topic.
     * @typeParam U - Any of the content types defined in {@link ISubscriptions}.
     * @param contentType - One of the content type defined in {@link ISubscriptions}.
     * @param callback - The callback when the content is received. callbacks' payload are defined in {@link ISubscriptions}.
     */
    <U extends SubscriptionKeys<T>>(contentType: U, callback: ISubscriptions<T>[U]): void;
};
