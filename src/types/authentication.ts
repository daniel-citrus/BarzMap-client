export interface AuthenticatedUserDetails {
    userToken?: string;
    firstName?: string;
    lastName?: string;
    profile_picture_url?: string;
    email?: string;
    role?: [string]
}

/** 
 * List of Auth0 user permissions.
 * Each value must exactly match the permission name as defined in the Auth0 dashboard.
 */
export type UserPermissions =
    "create:parks" |
    "delete:parks" |
    "read:parks" |
    "update:parks";