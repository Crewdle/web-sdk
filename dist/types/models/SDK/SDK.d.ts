import { ICluster } from '../../interfaces/Cluster/Cluster';
import { IAuthUser } from '../../interfaces/Node/LocalUser';
import { ICredentials } from '../../interfaces/SDK/Credentials';
import { ISDK } from '../../interfaces/SDK/SDK';
import { ISDKOptions } from '../../interfaces/SDK/SDKOptions';
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
    static getInstance(vendorId: string, accessToken: string, options?: ISDKOptions, secretKey?: string): Promise<ISDK>;
    /**
     * Get the current estimated server timestamp.
     */
    static timestamp(): Promise<number>;
    /**
     * Authenticate a user.
     * @param credentials The credentials to authenticate the user with.
     * @returns A promise that resolves with the authenticated user.
     */
    authenticateUser(credentials: ICredentials): Promise<IAuthUser>;
    /**
     * Join a cluster.
     * @param clusterId The ID of the cluster to join.
     * @returns A promise that resolves with the cluster.
     * @throws {@link SDKClientErrorCodes.UserNotAuthenticated} if the user is not authenticated.
     */
    joinCluster(clusterId: string): Promise<ICluster>;
}
