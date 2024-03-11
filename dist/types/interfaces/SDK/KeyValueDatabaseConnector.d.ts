import { IValueType, ValueTypeOmitId, IDatabaseTableQuery, IDatabaseLayout } from '../Content/KeyValueDatabase';
/**
 * The key-value database migration handle interface.
 * @category Key-Value Database
 */
export interface IKeyValueDatabaseMigrationHandle {
    /**
     * Get all the tables in the database.
     * @returns An array with the names of all the tables in the database.
     */
    getTables(): string[];
    /**
     * Check if a table exists in the database.
     * @param tableName The name of the table to check.
     * @returns True if the table exists, false otherwise.
     */
    hasTable(tableName: string): boolean;
    /**
     * Create a table in the database.
     * @param tableName The name of the table to create.
     */
    createTable(tableName: string): void;
    /**
     * Delete a table from the database.
     * @param tableName The name of the table to delete.
     */
    deleteTable(tableName: string): void;
    /**
     * Get all the indexes for a table in the database.
     * @param tableName The name of the table to get the indexes for.
     * @returns An array with the names of all the indexes in the table.
     */
    getIndexes(tableName: string): string[];
    /**
     * Check if an index exists in a table in the database.
     * @param tableName The name of the table to check the index in.
     * @param indexKeyPath The key path of the index to check.
     * @returns True if the index exists, false otherwise.
     */
    hasIndex(tableName: string, indexKeyPath: string): boolean;
    /**
     * Create an index in a table in the database.
     * @param tableName The name of the table to create the index in.
     * @param indexKeyPath The key path of the index to create.
     */
    createIndex(tableName: string, indexKeyPath: string): void;
    /**
     * Delete an index from a table in the database.
     * @param tableName The name of the table to delete the index from.
     * @param indexKeyPath The key path of the index to delete.
     */
    deleteIndex(tableName: string, indexKeyPath: string): void;
}
/**
 * The key-value database connector constructor type.
 * @category Key-Value Database
 */
export type KeyValueDatabaseConnectorConstructor = new (dbKey: string, layout: IDatabaseLayout) => IKeyValueDatabaseConnector;
/**
 * The key-value database connector interface.
 * @category Key-Value Database
 */
export interface IKeyValueDatabaseConnector {
    /**
     * Open the database and run a migration on it if necessary.
     * @param migration The migration to run on the database.
     */
    open(migration: (db: IKeyValueDatabaseMigrationHandle) => void): Promise<void>;
    /**
     * Close the database.
     */
    close(): void;
    /**
     * Check if a table exists in the database.
     * @returns True if the table exists, false otherwise.
     */
    hasTable(tableName: string): boolean;
    /**
     * Create a table in the database.
     * @param tableName The name of the table to create.
     */
    createTable(tableName: string): void;
    /**
     * Get the table connector for a table in the database.
     * @param tableName The name of the table to get the connector for.
     */
    getTableConnector<T extends IValueType>(tableName: string): IKeyValueDatabaseTableConnector<T>;
}
/**
 * The key-value database table connector interface.
 * @category Key-Value Database
 */
export interface IKeyValueDatabaseTableConnector<T extends IValueType> {
    /**
     * Get the value for a key.
     * @param key The key to get the value for.
     * @returns A promise that resolves with the value for the key, or undefined if the key was not found.
     */
    get(key: string): Promise<T | undefined>;
    /**
     * Set the value for a key.
     * @param key The key to set the value for.
     * @param value The value to set for the key. It must be a {@link SupportedIndexTypes}.
     */
    set(key: string, value: ValueTypeOmitId<T>): Promise<T>;
    /**
     * Add a value to the database.
     * @param value  The value to add. It must be a {@link SupportedIndexTypes}.
     * @returns A promise that resolves with the value added.
     */
    add(value: ValueTypeOmitId<T>): Promise<T>;
    /**
     * Delete a key.
     * @param key The key to delete.
     * @returns A promise that resolves when the key has been deleted.
     */
    delete(key: string): Promise<void>;
    /**
     * Clear the database.
     * Fires a {@link IDatabaseTableEvent} for each key deleted.
     * @returns A promise that resolves when the database has been cleared.
     */
    clear(): Promise<void>;
    /**
     * Get all the values matching the query in the database.
     * @param query The query to use to filter the values.
     * If no query is provided, all the values in the database are returned.
     * @returns A promise that resolves with all the values matching the query.
     */
    list(query?: IDatabaseTableQuery): Promise<T[]>;
    /**
     * Count the number of keys matching the query in the database.
     * @param query The query to use to filter the keys.
     * If no query is provided, all the keys in the database are counted.
     * @returns A promise that resolves with the number of keys matching the query.
     */
    count(query?: IDatabaseTableQuery): Promise<number>;
    /**
     * Calculate the size of the table.
     * @returns A promise that resolves with the size of the table in bytes.
     */
    calculateSize(): Promise<number>;
}
