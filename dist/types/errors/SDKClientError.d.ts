/**
 * SDK Client Error Codes
 * Any error that is thrown by the SDK will have a code that can be used to identify the error.
 */
export declare enum SDKClientErrorCodes {
    FeatureNotEnabled = "feature-not-enabled",
    ObjectStoreAlreadyExists = "object-store-already-exists",
    ObjectStoreAlreadySubscribed = "object-store-already-subscribed",
    ObjectStoreDoesNotExist = "object-store-stream-does-not-exist",
    ObjectStoreLabelNotString = "object-store-label-not-string",
    ObjectStoreInvalidPayload = "object-store-invalid-payload",
    ObjectStoreInvalidPath = "object-store-invalid-path",
    ObjectStoreNotInSync = "object-store-not-in-sync",
    InternalSDKError = "internal-sdk-error",
    KeyValueDatabaseDoesNotExist = "key-value-database-does-not-exist",
    KeyValueDatabaseIndexNotFound = "key-value-database-index-not-found",
    KeyValueDatabaseInvalidQuery = "key-value-database-invalid-query",
    KeyValueDatabaseInvalidValue = "key-value-database-invalid-value",
    KeyValueDatabaseNameNotString = "key-value-database-name-not-string",
    KeyValueDatabaseNotOpen = "key-value-database-not-open",
    KeyValueDatabaseTableNameReserved = "key-value-database-table-name-reserved",
    KeyValueDatabaseTableNotFound = "key-value-database-table-not-found",
    KeyValueDatabaseInvalidLayout = "key-value-database-invalid-layout",
    LocalMediaStreamAlreadyExists = "local-media-stream-already-exists",
    PubSubTopicAlreadyExists = "pub-sub-topic-already-exists",
    PubSubTopicDoesNotExist = "pub-sub-topic-does-not-exist",
    PubSubTopicLabelNotString = "pub-sub-topic-label-not-string",
    PubSubTopicAlreadySubscribed = "pub-sub-topic-already-subscribed",
    QueryBuilderInvalidArgument = "query-helper-invalid-argument",
    RemoteMediaStreamAlreadyExists = "remote-media-stream-already-exists",
    RemoteMediaStreamInvalidSubscriptionParams = "remote-media-stream-invalid-subscription-params",
    SubscriptionRequestInProgress = "subscription-request-in-progress",
    UserNotAuthenticated = "user-not-authenticated"
}
/**
 * SDK Client Error
 * Any error that is thrown by the SDK will be an instance of this class.
 */
export declare class SDKClientError extends Error {
    code: SDKClientErrorCodes;
    constructor(code: SDKClientErrorCodes, error: string);
}
