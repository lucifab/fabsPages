export const environment = {
  production: false,
  apiUrl: 'https://localhost:44304',
  auth: {
    authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_qb8HQhsb6',
    cognitoDomain: 'https://us-east-2qb8hqhsb6.auth.us-east-2.amazoncognito.com',
    clientId: '5glgtb2l2lqfvh2d7hsn3re6a0',
    redirectUrl: 'http://localhost:4200/auth/callback',
    postLogoutRedirectUri: 'http://localhost:4200/auth/logout',
    scope: 'openid email phone profile',
    responseType: 'code'
  },
  blog: {
    pageSize: 3
  }
};
