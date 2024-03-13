import { ObjectDescriptor, ObjectKind } from '../Content/ObjectStore';
/**
 * The file handle interface.
 * @category Object Storage
 */
export interface IFileHandle {
    /**
     * Gets the file.
     * @returns A promise that resolves with the file.
     */
    getFile(): Promise<File>;
}
/**
 * The object handle interface.
 * @category Object Storage
 */
export interface IObjectHandle {
    /**
     * The kind of the object.
     */
    kind: string;
    /**
     * The name of the object.
     */
    name: string;
}
/**
 * The folder handle interface.
 * @category Object Storage
 */
export interface IFolderHandle {
    /**
     * An async iterator that allows iterating over the entries in the folder.
     */
    [Symbol.asyncIterator](): AsyncIterableIterator<[string, IObjectHandle]>;
    /**
     * An async iterator that allows iterating over the entries in the folder.
     */
    entries(): AsyncIterableIterator<[string, IObjectHandle]>;
    /**
     * An async iterator that allows iterating over the keys in the folder.
     */
    keys(): AsyncIterableIterator<string>;
    /**
     * An async iterator that allows iterating over the values in the folder.
     */
    values(): AsyncIterableIterator<IObjectHandle>;
    /**
     * Gets the file handle.
     * @param name The name of the file.
     * @returns A promise that resolves with the file handle.
     */
    getFileHandle(name: string): Promise<IFileHandle>;
}
/**
 * The object store connector constructor type.
 * @category Object Storage
 */
export type ObjectStoreConnectorConstructor = new (storeKey: string) => IObjectStoreConnector;
/**
 * The object store connector interface.
 * @category Object Storage
 */
export interface IObjectStoreConnector {
    /**
     * Gets a file.
     * @param path The path to the file.
     * @returns A promise that resolves with the file.
     */
    get(path: string): Promise<File>;
    /**
     * Lists the objects in a folder.
     * @param path The path to the folder.
     * @param recursive Whether to list the objects recursively.
     * @returns A promise that resolves with an array of object descriptors.
     */
    list(path: string, recursive: boolean): Promise<ObjectDescriptor[]>;
    /**
     * Gets the root folder handle.
     * @returns A promise that resolves with the root folder handle.
     */
    getRootFolderHandle(): Promise<IFolderHandle>;
    /**
     * Gets or creates a folder handle.
     * @param path The path to the folder.
     * @returns A promise that resolves with the folder handle.
     */
    getOrCreateFolderHandle(path?: string): Promise<IFolderHandle>;
    /**
     * Gets a folder handle.
     * @param path The path to the folder.
     * @returns A promise that resolves with the folder handle.
     */
    getFolderHandle(path: string): Promise<[IFolderHandle, string, string[]]>;
    /**
     * Writes a file.
     * @param file The file to write.
     * @param path The path to write the file to.
     */
    writeFile(file: File, path?: string): Promise<void>;
    /**
     * Moves an object.
     * @param path The path to the object.
     * @param newPath The path to move the object to.
     */
    moveObject(path: string, newPath: string): Promise<ObjectKind>;
    /**
     * Deletes an object.
     * @param path The path to the object.
     */
    deleteObject(path: string): Promise<ObjectKind>;
    /**
     * Calculates the size of an object.
     * @param path The path to the object.
     * @returns A promise that resolves with the size of the object.
     */
    calculateSize(path: string): Promise<number>;
}
