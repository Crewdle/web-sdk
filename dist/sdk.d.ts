import { ISDK } from '../types/interfaces/SDK/SDK';
import { ICredentials } from '../types/interfaces/SDK/Credentials';
import { IAuthUser } from '../types/interfaces/Node/LocalUser';
import { ICluster } from '../types/interfaces/Cluster/Cluster';
import { ISDKOptions } from '../types/interfaces/SDK/SDKOptions';

export { ICluster } from '../types/interfaces/Cluster/Cluster';
export { IClusterEventEmitter } from '../types/interfaces/Cluster/ClusterEventEmitter';
export { IClusterEvents, IPublishMediaStreamEventPayload, IUnpublishMediaStreamEventPayload, IUserEventPayload, IUserInfoEventPayload } from '../types/interfaces/Cluster/ClusterEvents';
export { ClusterOnFunction, ClusterEventKeys } from '../types/interfaces/Cluster/Types';

export { IDataStream } from '../types/interfaces/Content/DataStream';
export { IDynamicMediaStream } from '../types/interfaces/Content/DynamicMediaStream';
export { ObjectKind, IFileDescriptor, IFolderDescriptor, ObjectDescriptor, PayloadAction, IFilePayload, IFolderPayload, IMovePayload, Payload, StorageEventType, IFolderCreateEventPayload, IObjectDeleteEventPayload, IFileWriteEvent, IFileDeleteEvent, IFileMoveEvent, IFolderCreateEvent, IFolderDeleteEvent, IFolderMoveEvent, StorageEvent, IObjectStoreBucket } from '../types/interfaces/Content/ObjectStore';
export { IKeyValueDatabase, IDatabaseEvent, IDatabaseLayout, IDatabaseTable, IDatabaseTableAction, IDatabaseTableEvent, ITableIndex, ITableLayout, IDatabaseTableQuery, IDatabaseTableQueryWhereBetween, IDatabaseTableQueryWhereValue, IDatabaseTableQueryWhereValues, IValueType, DatabaseEvent, SupportedIndexTypes, ValueTypeOmitId } from '../types/interfaces/Content/KeyValueDatabase';
export { ILocalDynamicMediaStream } from '../types/interfaces/Content/LocalDynamicMediaStream';
export { ILocalMediaStream } from '../types/interfaces/Content/LocalMediaStream';
export { IMediaStream } from '../types/interfaces/Content/MediaStream';
export { IPubSubTopic } from '../types/interfaces/Content/PubSubTopic';
export { IRemoteMediaStream, Unsubscribe } from '../types/interfaces/Content/RemoteMediaStream';
export { IStream } from '../types/interfaces/Content/Stream';
export { AudioSubscriptionParams, ContentType, MediaStreamSource, MediaStreamPriority, MediaStreamTransformer, MediaSubscriptionParams, MediaTrackKind, Resolution, VideoSubscriptionParams } from '../types/interfaces/Content/Types';

export { INode } from '../types/interfaces/Node/Node';
export { IAuthUser, ILocalUser } from '../types/interfaces/Node/LocalUser';
export { IUser } from '../types/interfaces/Node/User';

export { ICredentials } from '../types/interfaces/SDK/Credentials';
export { ISDK } from '../types/interfaces/SDK/SDK';
export { ILoggingConnector } from '../types/interfaces/SDK/LoggingConnector';
export { ISDKOptions } from '../types/interfaces/SDK/SDKOptions';

export { SDKClientErrorCodes } from '../types/errors/SDKClientError';

export { LayoutBuilder } from '../types/models/Content/KeyValueDatabaseLayoutBuilder';
export { QueryBuilder } from '../types/models/Content/KeyValueDatabaseQueryBuilder';

/**
 * The SDK class.
 * This is the entry point for the Crewdle SDK.
 */
export class SDK implements ISDK {
  /**
   * Get an instance of the SDK.
   * @param vendorId The ID of the vendor to access the SDK.
   * @param accessToken The access token to validate the access to the SDK.
   * @param options The options to configure the SDK.
   * @returns An instance of the SDK.
   */
  static getInstance(vendorId: string, accessToken: string, options?: ISDKOptions): Promise<ISDK>;
  authenticateUser(credentials: ICredentials): Promise<IAuthUser>;
  joinCluster(clusterId: string): Promise<ICluster>;
}
