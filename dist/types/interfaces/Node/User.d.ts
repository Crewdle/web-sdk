import { INode } from './Node';
/**
 * The user interface.
 * @category Core
 */
export interface IUser extends INode {
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
}
