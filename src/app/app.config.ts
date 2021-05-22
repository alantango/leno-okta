// const { CLIENT_ID, ISSUER, OKTA_TESTING_DISABLEHTTPSCHECK } = process.env;

export default {
  oidc: {
    clientId: "0oa2vntg4UKYq5Y6H5d6",
    issuer: "https://dev-9535874.okta.com/oauth2/default",
    redirectUri: '/login/callback',
    scopes: ['openid', 'profile','custom_act'],
    pkce: true,
    // testing: {
    //   disableHttpsCheck: `${OKTA_TESTING_DISABLEHTTPSCHECK}`
    // }
  },
  resourceServer: {
    messagesUrl: 'http://localhost:8000/api/messages',
  }
};
