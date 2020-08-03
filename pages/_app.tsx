import React from "react";
import { AppProps } from "next/app";
import Amplify from "@aws-amplify/core";
import Auth from "@aws-amplify/auth";

import { reducer, StateProvider } from "../src/state";

// import config from "../src/aws-exports.js";

// Amplify.configure(config);
Amplify.configure({
  aws_project_region: process.env.USER_POOL_REGION,
  aws_cognito_identity_pool_id: process.env.COGNITO_IDENTITY_POOL_ID,
  aws_cognito_region: process.env.USER_POOL_REGION,
  aws_user_pools_id: process.env.USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.USER_POOL_CLIENT_ID,
  oauth: {},
  aws_appsync_graphqlEndpoint: process.env.GRAPHQL_ENDPOINT,
  aws_appsync_region: process.env.USER_POOL_REGION,
  aws_appsync_authenticationType: "AMAZON_COGNITO_USER_POOLS",
  aws_appsync_apiKey: process.env.APPSYNC_APIKEY,
});

Amplify.configure({
  Auth: {
    region: process.env.USER_POOL_REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_CLIENT_ID,

    // OPTIONAL - Configuration for cookie storage
    // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
    // example taken from https://aws-amplify.github.io/docs/js/authentication
    cookieStorage: {
      // REQUIRED - Cookie domain (only required if cookieStorage is provided)
      // This should be the subdomain in production as the cookie should only
      // be present for the current site
      domain: process.env.AUTH_COOKIE_DOMAIN,
      // OPTIONAL - Cookie path
      path: "/",
      // OPTIONAL - Cookie expiration in days
      expires: 7,
      // OPTIONAL - Cookie secure flag
      // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
      // The cookie can be secure in production
      secure: false,
    },
  },
});

Auth.configure({
  oauth: {
    domain: process.env.IDP_DOMAIN,
    scope: ["email", "openid"],
    // we need the /autologin step in between to set the cookies properly,
    // we don't need that when signing out though
    redirectSignIn: process.env.REDIRECT_SIGN_IN,
    redirectSignOut: process.env.REDIRECT_SIGN_OUT,
    responseType: "token",
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <StateProvider reducer={reducer}>
      <Component {...pageProps} />
    </StateProvider>
  );
}

export default App;
