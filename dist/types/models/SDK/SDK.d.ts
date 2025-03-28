import { ICluster, IAuthAgent, IAuthUser, IAgentCredentials, IUserCredentials, ISDK, ISDKOptions, ISDKCloseOptions, NodeType } from '@crewdle/web-sdk-types';
/**
 * The SDK class.
 * This is the entry point for the Crewdle SDK.
 * @category Core
 */
export declare class SDK implements ISDK {
    /**
     * @ignore
     */
    private constructor();
    /**
     * Get an instance of the SDK.
     * @param vendorId The ID of the vendor to access the SDK.
     * @param accessToken The access token to validate the access to the SDK.
     * @param options The options to configure the SDK.
     * @param secretKey The secret key to use for the SDK when calling from a server.
     * @returns An instance of the SDK.
     */
    static getInstance(vendorId: string, accessToken: string, mode: NodeType, options?: ISDKOptions, secretKey?: string): Promise<ISDK>;
    /**
     * Get the current estimated server timestamp.
     */
    static timestamp(): Promise<number>;
    /**
     * Get if the SDK is running in production mode.
     */
    static isProduction(): boolean;
    /**
     * Close the SDK.
     */
    close(options?: ISDKCloseOptions): Promise<void>;
    /**
     * Authenticate a user.
     * @param credentials The credentials to authenticate the user with.
     * @returns A promise that resolves with the authenticated user.
     */
    authenticateUser(credentials: IUserCredentials): Promise<IAuthUser>;
    /**
     * Authenticate an agent.
     * @param credentials The credentials to authenticate the agent with.
     * @returns A promise that resolves with the authenticated agent.
     */
    authenticateAgent(credentials: IAgentCredentials): Promise<IAuthAgent>;
    /**
     * Validate a key.
     * @param key The key to validate.
     * @param origin The origin of the request.
     * @returns A promise that resolves with the vendor ID.
     */
    validateKey(key: string, origin?: string): Promise<string>;
    /**
     * Join a cluster.
     * @param clusterId The ID of the cluster to join.
     * @returns A promise that resolves with the cluster.
     * @throws {@link SDKClientErrorCodes.NodeNotAuthenticated} if the node is not authenticated.
     */
    joinCluster(clusterId: string): Promise<ICluster>;
}
