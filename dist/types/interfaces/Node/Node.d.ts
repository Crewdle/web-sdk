/**
 * The node interface.
 * @category Core
 */
export interface INode {
    /**
     * Get the node ID.
     * @returns The node ID.
     */
    getId(): string;
    /**
     * Get the remote connections.
     * @returns The remote connections.
     */
    getRemoteConnections(): Set<string>;
}
