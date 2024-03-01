import { ICluster } from '../Cluster/Cluster';
import { IAuthUser } from '../Node/LocalUser';
import { ICredentials } from '../SDK/Credentials';
/**
 * The SDK interface.
 * @category Core
 */
export interface ISDK {
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
