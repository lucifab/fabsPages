export interface CognitoUserData {
  sub: string;
  email?: string;
  email_verified?: boolean;
  phone_number?: string;
  phone_number_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  preferred_username?: string;
  picture?: string;
  'cognito:username'?: string;
  auth_time?: number;
  exp?: number;
  iat?: number;
  [claim: string]: unknown;
}
