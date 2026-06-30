export const environment = {
  production: true,
  apiUrl: 'https://2wbe1ip611.execute-api.us-east-2.amazonaws.com/fabApi',
  auth: {
    authority: 'https://cognito-idp.us-east-2.amazonaws.com/us-east-2_qb8HQhsb6',
    cognitoDomain: 'https://us-east-2qb8hqhsb6.auth.us-east-2.amazoncognito.com',
    clientId: '5glgtb2l2lqfvh2d7hsn3re6a0',
    redirectUrl: 'https://lucifab.dev/auth/callback',
    postLogoutRedirectUri: 'https://lucifab.dev/auth/logout',
    scope: 'openid email phone profile',
    responseType: 'code'
  },
  blog: {
    pageSize: 10
  },
  writePost: {
    autoSaveDelayMs: 3000
  }
};
