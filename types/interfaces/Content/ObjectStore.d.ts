import { IDataStream } from './DataStream';
/**
 * The object kind enum.
 */
export declare enum ObjectKind {
    /**
     * The file kind.
     */
    File = "file",
    /**
     * The folder kind.
     */
    Folder = "directory"
}
/**
 * The file descriptor interface.
 */
export interface IFileDescriptor {
    /**
     * The object kind.
     */
    kind: ObjectKind.File;
    /**
     * The name of the file.
     */
    name: string;
    /**
     * The type of the file.
     */
    type: string;
    /**
     * The size of the file.
     */
    size: number;
    /**
     * The path of the file.
     */
    path: string;
    /**
     * The path name of the file (a combination of the path and the name).
     */
    pathName: string;
}
/**
 * The object store folder descriptor interface.
 */
export interface IFolderDescriptor {
    /**
     * The object kind.
     */
    kind: ObjectKind.Folder;
    /**
     * The name of the folder.
     */
    name: string;
    /**
     * The path of the folder.
     */
    path: string;
    /**
     * The path name of the folder (a combination of the path and the name).
     */
    pathName: string;
    /**
     * The folder entries.
     */
    entries?: ObjectDescriptor[];
}
/**
 * The object descriptor type.
 */
export type ObjectDescriptor = IFileDescriptor | IFolderDescriptor;
/**
 * The object store payload action enum.
 */
export declare enum PayloadAction {
    /**
     * The action to write a file.
     */
    File = "file",
    /**
     * The action to create a folder.
     */
    Folder = "folder",
    /**
     * The action to move or rename an object.
     */
    Move = "move"
}
/**
 * The file payload interface.
 */
export interface IFilePayload {
    /**
     * The file store payload action.
     */
    action: PayloadAction.File;
    /**
     * The file to publish.
     */
    file: File;
    /**
     * The path of the file.
     */
    path?: string;
}
/**
 * The object store folder payload interface.
 */
export interface IFolderPayload {
    /**
     * The object store folder payload action.
     */
    action: PayloadAction.Folder;
    /**
     * The path of the folder.
     */
    path: string;
}
/**
 * The object store move payload interface.
 */
export interface IMovePayload {
    /**
     * The object store payload action.
     */
    action: PayloadAction.Move;
    /**
     * The path of the object.
     */
    path: string;
    /**
     * The new path of the object.
     */
    newPath: string;
}
/**
 * The file store payload.
 */
export type Payload = IFilePayload | IFolderPayload | IMovePayload;
/**
 * The file store event type enum.
 */
export declare enum StorageEventType {
    /**
     * The file write event.
     */
    FileWrite = "file-write",
    /**
     * The file delete event.
     */
    FileDelete = "file-delete",
    /**
     * The file move event.
     */
    FileMove = "file-move",
    /**
     * The folder create event.
     */
    FolderCreate = "folder-create",
    /**
     * The folder delete event.
     */
    FolderDelete = "folder-delete",
    /**
     * The folder move event.
     */
    FolderMove = "folder-move"
}
/**
 * The file write event payload interface.
 */
export interface IFileWriteEventPayload {
    /**
     * The file descriptor.
     */
    file: IFileDescriptor;
}
/**
 * The folder create event payload interface.
 */
export interface IFolderCreateEventPayload {
    /**
     * The folder descriptor.
     */
    folder: IFolderDescriptor;
}
/**
 * The object (file or folder) delete event payload interface.
 */
export interface IObjectDeleteEventPayload {
    /**
     * The name of the object.
     */
    name: string;
    /**
     * The path of the object.
     */
    path: string;
    /**
     * The path name of the object (a combination of the path and the name).
     */
    pathName: string;
}
/**
 * The object (file or folder) move event payload interface.
 */
export interface IObjectMoveEventPayload {
    /**
     * The name of the object.
     */
    name: string;
    /**
     * The path of the object.
     */
    path: string;
    /**
     * The path name of the object (a combination of the path and the name).
     */
    pathName: string;
    /**
     * The old name of the object.
     */
    oldName: string;
    /**
     * The old path of the object.
     */
    oldPath: string;
    /**
     * The old path name of the object (a combination of the old path and the old name).
     */
    oldPathName: string;
}
/**
 * The file write event interface.
 */
export interface IFileWriteEvent {
    /**
     * The file write event type.
     */
    event: StorageEventType.FileWrite;
    /**
     * The file write event payload.
     */
    payload: IFileWriteEventPayload;
}
/**
 * The file delete event interface.
 */
export interface IFileDeleteEvent {
    /**
     * The file delete event type.
     */
    event: StorageEventType.FileDelete;
    /**
     * The file delete event payload.
     */
    payload: IObjectDeleteEventPayload;
}
/**
 * The file move event interface.
 */
export interface IFileMoveEvent {
    /**
     * The file move event type.
     */
    event: StorageEventType.FileMove;
    /**
     * The file move event payload.
     */
    payload: IObjectMoveEventPayload;
}
/**
 * The folder create event interface.
 */
export interface IFolderCreateEvent {
    /**
     * The folder create event type.
     */
    event: StorageEventType.FolderCreate;
    /**
     * The folder create event payload.
     */
    payload: IFolderCreateEventPayload;
}
/**
 * The folder delete event interface.
 */
export interface IFolderDeleteEvent {
    /**
     * The folder delete event type.
     */
    event: StorageEventType.FolderDelete;
    /**
     * The folder delete event payload.
     */
    payload: IObjectDeleteEventPayload;
}
/**
 * The folder move event interface.
 */
export interface IFolderMoveEvent {
    /**
     * The folder move event type.
     */
    event: StorageEventType.FolderMove;
    /**
     * The folder move event payload.
     */
    payload: IObjectMoveEventPayload;
}
/**
 * The object store event.
 */
export type StorageEvent = IFileWriteEvent | IFileDeleteEvent | IFileMoveEvent | IFolderCreateEvent | IFolderDeleteEvent | IFolderMoveEvent;
/**
 * The object store interface.
 */
export interface IObjectStoreBucket extends IDataStream {
    /**
     * Close the object store.
     */
    close(): void;
    /**
     * Subscribe to the object store events.
     * @param callback The callback function.
     */
    subscribe(callback: (data: StorageEvent) => void): void;
    /**
     * Unsubscribe from the object store.
     */
    unsubscribe(): void;
    /**
     * Publish an action to the object store.
     * @param payload The object store payload.
     * @returns A promise that resolves when the action is published.
     */
    publish(payload: Payload): Promise<void>;
    /**
     * Unpublish an object from the object store. It also permanently deletes the object.
     * @param path The path of the object.
     * @returns A promise that resolves when the object is unpublished.
     */
    unpublish(path: string): Promise<void>;
    /**
     * Get a object from the object store.
     * @param path The path of the object.
     * @returns The object.
     */
    get(path: string): Promise<File>;
    /**
     * List the objects and folders of the object store.
     * @param path The path of the folder.
     * @param recursive Whether to list the objects and folders recursively.
     * @returns The list of objects and folders.
     */
    list(path: string, recursive?: boolean): Promise<ObjectDescriptor[]>;
}
