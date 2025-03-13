/**
 * SDK Client Error Codes - Any error that is thrown by the SDK will have a code that can be used to identify the error.
 * @category Core
 */
export declare enum SDKClientErrorCodes {
    /**
     * The API key is missing.
     */
    ApiKeyMissing = "api-key-missing",
    /**
     * The Connection DataChannel's buffer is not empty.
     */
    ConnectionBufferNotEmpty = "connection-buffer-not-empty",
    /**
     * The cluster has already been joined.
     */
    ClusterAlreadyJoined = "cluster-already-joined",
    /**
     * The external storage connection already exists.
     */
    ExternalStorageConnectionAlreadyExists = "external-storage-connection-already-exists",
    /**
     * The external storage connection is already subscribed.
     */
    ExternalStorageConnectionAlreadySubscribed = "external-storage-connection-already-subscribed",
    /**
     * The external storage connection does not exist.
     */
    ExternalStorageConnectionDoesNotExist = "external-storage-connection-does-not-exist",
    /**
     * The external storage connectiors are missing.
     */
    ExternalStorageConnectorsMissing = "external-storage-connectors-missing",
    /**
     * The path is invalid.
     */
    ExternalStorageInvalidPath = "external-storage-invalid-path",
    /**
     * The external storage connection name is not a string.
     */
    ExternalStorageNameNotString = "external-storage-name-not-string",
    /**
     * The feature is not enabled. Contact our support team for more information.
     */
    FeatureNotEnabled = "feature-not-enabled",
    /**
     * The Generative AI Context already exists.
     */
    GenerativeAIContextAlreadyExists = "generative-ai-context-already-exists",
    /**
     * The Generative AI Context does not exist.
     */
    GenerativeAIContextDoesNotExist = "generative-ai-context-does-not-exist",
    /**
     * The Generative AI Job is missing the thread ID.
     */
    GenerativeAIContextJobMissingThreadId = "generative-ai-context-job-missing-thread-id",
    /**
     * The Generative AI Job is invalid.
     */
    GenerativeAIContextJobInvalidType = "generative-ai-context-job-invalid-type",
    /**
     * The Generative AI label conflicts with an existing label.
     */
    GenerativeAILabelConflict = "generative-ai-label-conflict",
    /**
     * The Generative AI Worker already exists.
     */
    GenerativeAIWorkerAlreadyExists = "generative-ai-worker-already-exists",
    /**
     * The Generative AI Worker is missing required connector.
     */
    GenerativeAIWorkerMissingConnector = "generative-ai-worker-missing-connector",
    /**
     * The Generative AI Worker model is not synchronized.
     */
    GenerativeAIWorkerModelSyncError = "generative-ai-worker-model-sync-error",
    /**
     * The graph database already exists.
     */
    GraphDatabaseAlreadyExists = "graph-database-already-exists",
    /**
     * The graph database does not exist.
     */
    GraphDatabaseDoesNotExist = "graph-database-does-not-exist",
    /**
     * The graph database connector is missing.
     */
    GraphDatabaseMissingConnector = "graph-database-missing-connector",
    /**
     * The graph database name is not a string.
     */
    GraphDatabaseNameNotString = "graph-database-name-not-string",
    /**
     * The job dispatcher already exists.
     */
    JobDispatcherAlreadyExists = "job-dispatcher-already-exists",
    /**
     * The job dispatcher does not exist.
     */
    JobDispatcherDoesNotExist = "job-dispatcher-does-not-exist",
    /**
     * The job dispatched already exists in the job dispatcher.
     */
    JobDispatcherJobExists = "job-dispatcher-job-exists",
    /**
     * The job does not exist in the job dispatcher.
     */
    JobDispatcherJobNotFound = "job-dispatcher-job-not-found",
    /**
     * The job dispatched is not supported by the job dispatcher.
     */
    JobDispatcherInvalidJobType = "job-dispatcher-invalid-job-type",
    /**
     * The job worker already exists.
     */
    JobWorkerAlreadyExists = "job-worker-already-exists",
    /**
     * The job worker already exists.
     */
    JobWorkerDoesNotExist = "job-worker-does-not-exist",
    /**
     * The object store already exists.
     */
    ObjectStoreAlreadyExists = "object-store-already-exists",
    /**
     * The object store is already subscribed.
     */
    ObjectStoreAlreadySubscribed = "object-store-already-subscribed",
    /**
     * The object store does not exist.
     */
    ObjectStoreDoesNotExist = "object-store-stream-does-not-exist",
    /**
     * The object store name is not a string.
     */
    ObjectStoreNameNotString = "object-store-name-not-string",
    /**
     * The object store payload is invalid.
     */
    ObjectStoreInvalidPayload = "object-store-invalid-payload",
    /**
     * The path is invalid.
     */
    ObjectStoreInvalidPath = "object-store-invalid-path",
    /**
     * The object store is not synchronized.
     */
    ObjectStoreNotInSync = "object-store-not-in-sync",
    /**
     * Internal SDK error. Contact our support team if the error persists.
     */
    InternalSDKError = "internal-sdk-error",
    /**
     * Invalid access.
     */
    InvalidAccess = "invalid-access",
    /**
     * The key-value database already exists.
     */
    KeyValueDatabaseAlreadyExists = "key-value-database-already-exists",
    /**
     * The key-value database does not exists.
     */
    KeyValueDatabaseDoesNotExist = "key-value-database-does-not-exist",
    /**
     * The key-value database index was not found.
     */
    KeyValueDatabaseIndexNotFound = "key-value-database-index-not-found",
    /**
     * The key-value database query is invalid.
     */
    KeyValueDatabaseInvalidQuery = "key-value-database-invalid-query",
    /**
     * The value is invalid.
     */
    KeyValueDatabaseInvalidValue = "key-value-database-invalid-value",
    /**
     * The key-value database name is not a string.
     */
    KeyValueDatabaseNameNotString = "key-value-database-name-not-string",
    /**
     * The key-value database is not open.
     */
    KeyValueDatabaseNotOpen = "key-value-database-not-open",
    /**
     * The key-value database name is reserved.
     */
    KeyValueDatabaseTableNameReserved = "key-value-database-table-name-reserved",
    /**
     * The key-value database table was not found.
     */
    KeyValueDatabaseTableNotFound = "key-value-database-table-not-found",
    /**
     * The key-value database layout is invalid.
     */
    KeyValueDatabaseInvalidLayout = "key-value-database-invalid-layout",
    /**
     * The local media stream already exists.
     */
    LocalMediaStreamAlreadyExists = "local-media-stream-already-exists",
    /**
     * The local media stream needs an audio context.
     */
    LocalMediaStreamNoAudioContext = "local-media-stream-no-audio-context",
    /**
     * The pub/sub topic already exists.
     */
    PubSubTopicAlreadyExists = "pub-sub-topic-already-exists",
    /**
     * The pub/sub topic does not exist.
     */
    PubSubTopicDoesNotExist = "pub-sub-topic-does-not-exist",
    /**
     * The pub/sub topic name is not a string.
     */
    PubSubTopicNameNotString = "pub-sub-topic-name-not-string",
    /**
     * The pub/sub topic is already subscribed.
     */
    PubSubTopicAlreadySubscribed = "pub-sub-topic-already-subscribed",
    /**
     * The query builder argument is invalid.
     */
    QueryBuilderInvalidArgument = "query-helper-invalid-argument",
    /**
     * The remote media stream already exists.
     */
    RemoteMediaStreamAlreadyExists = "remote-media-stream-already-exists",
    /**
     * The remote media stream subscription parameters are invalid.
     */
    RemoteMediaStreamInvalidSubscriptionParams = "remote-media-stream-invalid-subscription-params",
    /**
     * The subscription request is in progress.
     */
    SubscriptionRequestInProgress = "subscription-request-in-progress",
    /**
     * The node is not authenticated.
     */
    NodeNotAuthenticated = "node-not-authenticated",
    /**
     * The node type is invalid.
     */
    NodeInvalidType = "node-invalid-type",
    /**
     * The node type is not supported.
     */
    NodeTypeNotSupported = "node-type-not-supported",
    /**
     * The node type is required.
     */
    NodeTypeRequired = "node-type-required",
    /**
     * The vector database already exists.
     */
    VectorDatabaseAlreadyExists = "vector-database-already-exists",
    /**
     * The vector database does not exist.
     */
    VectorDatabaseDoesNotExist = "vector-database-does-not-exist",
    /**
     * The vector database connector is missing.
     */
    VectorDatabaseMissingConnector = "vector-database-missing-connector",
    /**
     * The vector database name is not a string.
     */
    VectorDatabaseNameNotString = "vector-database-name-not-string"
}
/**
 * SDK Client Error - Any error that is thrown by the SDK will be an instance of this class.
 * @category Core
 */
export declare class SDKClientError extends Error {
    code: SDKClientErrorCodes;
    /**
     * Throws an error with the given code and message.
     * @param code The error code
     * @param error The error message
     */
    constructor(code: SDKClientErrorCodes, error: string);
}
