import { ICluster } from '../../interfaces/Cluster/Cluster';
import { IAuthUser } from '../../interfaces/Node/LocalUser';
import { ICredentials } from '../../interfaces/SDK/Credentials';
import { ISDK } from '../../interfaces/SDK/SDK';
import { ISDKOptions } from '../../interfaces/SDK/SDKOptions';
/**
 * The SDK class.
 * This is the entry point for the Crewdle SDK.
 */
export declare class SDK implements ISDK {
    private static instance;
    /**
     * @internal
     */
    private readonly authService;
    private readonly vendorId;
    private readonly options;
    /**
     * @internal
     */
    private readonly configs;
    /**
     * @internal
     */
    private authContext?;
    /**
     * @internal
     */
    private constructor();
    /**
     * Get an instance of the SDK.
     * @param vendorId The ID of the vendor to access the SDK.
     * @param accessToken The access token to validate the access to the SDK.
     * @param options The options to configure the SDK.
     * @returns An instance of the SDK.
     */
    static getInstance(vendorId: string, accessToken: string, options?: ISDKOptions): Promise<ISDK>;
    /**
     * Get the current estimated server timestamp.
     */
    static timestamp(): Promise<number>;
    /**
     * @internal
     */
    private static validateAccess;
    /**
     * @internal
     */
    authenticateUser(credentials: ICredentials): Promise<IAuthUser>;
    /**
     * @internal
     */
    joinCluster(clusterId: string): Promise<ICluster>;
}
