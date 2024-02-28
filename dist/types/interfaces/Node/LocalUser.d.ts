import { IUser } from './User';
/**
 * The authenticated user interface.
 */
export interface IAuthUser {
    /**
     * Get the node ID.
     * @returns The node ID.
     */
    getId(): string;
    /**
   * Get the display name of the user.
   * @returns The display name of the user.
   */
    getDisplayName(): string;
    /**
     * Get the email of the user.
     * @returns The email of the user.
     */
    getEmail(): string;
    /**
     * Set the display name of the local user.
     * @param displayName The display name to set.
     */
    setDisplayName(displayName: string): void;
    /**
     * Set the email of the local user.
     * @param email The email to set.
     */
    setEmail(email: string): void;
}
/**
 * The local user interface.
 */
export interface ILocalUser extends IUser {
    /**
     * Set the display name of the local user.
     * @param displayName The display name to set.
     */
    setDisplayName(displayName: string): void;
    /**
     * Set the email of the local user.
     * @param email The email to set.
     */
    setEmail(email: string): void;
}
