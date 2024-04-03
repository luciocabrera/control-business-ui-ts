const env = process.env;

export const AUTH = {
  authorizeEndpoint: `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/authorize`,
  clientId: env.CLIENT_ID as string,
  clientSecret: env.CLIENT_SECRET as string,
  // prompt: 'login', // optional
  redirectUri: env.REDIRECT_URI as string,
  scope: 'openid profile email', // optional
  tenantId: env.TENANT_ID, // optional - necessary for organization without multitenant (see below)
  tokenEndpoint: `https://login.microsoftonline.com/${env.TENANT_ID}/oauth2/v2.0/token`,
};
