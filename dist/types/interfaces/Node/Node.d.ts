/**
 * The node interface.
 */
export interface INode {
    /**
     * Get the node ID.
     * @returns The node ID.
     */
    getId(): string;
    /**
     * Get remote connections.
     * @returns The remote connections.
     */
    getRemoteConnections(): Set<string>;
}
