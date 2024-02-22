import { IClusterEventEmitter } from './ClusterEventEmitter';
import { IKeyValueDatabase, IDatabaseLayout } from '../Content/KeyValueDatabase';
import { ILocalMediaStream } from '../Content/LocalMediaStream';
import { ILocalDynamicMediaStream } from '../Content/LocalDynamicMediaStream';
import { IObjectStoreBucket } from '../Content/ObjectStore';
import { IPubSubTopic } from '../Content/PubSubTopic';
import { IRemoteMediaStream } from '../Content/RemoteMediaStream';
import { IStream } from '../Content/Stream';
import { MediaStreamSource } from '../Content/Types';
import { ILocalUser } from '../Node/LocalUser';
import { IUser } from '../Node/User';

import type { LayoutBuilder } from '../../models/Content/KeyValueDatabaseLayoutBuilder';

/**
 * The cluster interface.
 */
// rename Cluster to Cluster
export interface ICluster extends IClusterEventEmitter {
  /**
   * Leave the cluster.
   */
  leave(): void;

  /**
   * Get the local user for this cluster.
   */
  getUser(): ILocalUser;

  /**
   * Open a pub/sub topic.
   * @param name The name of the PubSub Topic.
   * @throws {@link SDKClientErrorCodes.PubSubTopicAlreadyExists} if the topic already exists
   * @throws {@link SDKClientErrorCodes.PubSubTopicLabelNotString} if the name is not a string.
   * @returns The pub/sub topic.
   */
  openPubSubTopic<T>(name: string): IPubSubTopic<T>;

  /**
   * Open a object store bucket.
   * @param name The name of the Object Store bucket.
   * @throws {@link SDKClientErrorCodes.ObjectStoreAlreadyExists} if the data stream is already open.
   * @throws {@link SDKClientErrorCodes.ObjectStoreLabelNotString} if the name is not a string.
   * @returns A promise that resolves with the data stream.
   */
  openObjectStoreBucket(name: string): Promise<IObjectStoreBucket>;

  /**
   * Open a key-value database.
   * @param name The name of the key-value database.
   * @param layout The {@link IDatabaseLayout | schema} of the key-value database.
   * @returns A promise that resolves with the key-value database.
   */
  openKeyValueDatabase(name: string, layout: IDatabaseLayout | LayoutBuilder): Promise<IKeyValueDatabase>;

  /**
   * Publish a local media stream.
   * @param label The label of the media stream.
   * @param mediaSource The media source to publish.
   * @throws {@link SDKClientErrorCodes.LocalMediaStreamAlreadyExists} if the media stream is already published.
   * @throws {@link SDKClientErrorCodes.LocalMediaStreamInvalidSource} if the media source is invalid.
   * @returns The local media stream.
   */
  // suggestion: publishMediaStream(options => local or dynamic)
  // TODO rename - Check how to return the right typing if merging publishLocal and publishDynamic
  publishLocalMediaStream(label: string, mediaSource: MediaStreamSource): ILocalMediaStream;

  /**
   * Publish a local dynamic media stream. Like a local media stream but can be modified after creation.
   * @param label The label of the media stream.
   * @param mediaSource The media source to publish.
   * @throws {@link SDKClientErrorCodes.LocalMediaStreamAlreadyExists} if the media stream is already published.
   * @throws {@link SDKClientErrorCodes.LocalMediaStreamInvalidSource} if the media source is invalid.
   * @returns The local dynamic media stream.
   */
  // TODO rename suggestion: merge with publishLocalMediaStream
  publishLocalDynamicMediaStream(label: string, mediaSource: MediaStreamSource): ILocalDynamicMediaStream;

  /**
   * Get an array of opened pub/sub topics.
   * @param strategy The strategy to use to filter the topics.
   */
  getPubSubTopics(strategy?: (item: IPubSubTopic<unknown>) => boolean): IPubSubTopic<unknown>[];

  /**
   * Get an array of opened object store buckets.
   * @param strategy The strategy to use to filter the data streams.
   */
  getObjectStoreBuckets(strategy?: (item: IObjectStoreBucket) => boolean): IObjectStoreBucket[];

  /**
   * Get an array of opened key-value databases.
   * @param strategy The strategy to use to filter the key-value databases.
   */
  getKeyValueDatabases(strategy?: (item: IKeyValueDatabase) => boolean): IKeyValueDatabase[];

  /**
   * Get an array of published local media streams.
   * @param strategy The strategy to use to filter the media streams.
   */
  getLocalMediaStreams(strategy?: (item: ILocalMediaStream) => boolean): ILocalMediaStream[];

  /**
   * Get an array of published remote media streams.
   * @param strategy The strategy to use to filter the media streams.
   */
  getRemoteMediaStreams(strategy?: (item: IRemoteMediaStream) => boolean): IRemoteMediaStream[];

  /**
   * Get an array of all available streams.
   * @param strategy The strategy to use to filter the streams.
   */
  // TODO - Remove this
  getStreams(strategy?: (item: IStream) => boolean): IStream[];

  /**
   * Get an array of all connected remote users.
   * @param strategy The strategy to use to filter the users.
   */
  getRemoteUsers(strategy?: (item: IUser) => boolean): IUser[];
}
