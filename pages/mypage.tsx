import React from "react";
import Head from "next/head";

import { useAuth } from "../auth";

import GenericTemplate from "../components/templates/GenericTemplate";

const MyPage = () => {
  const auth = useAuth(null);
  return (
    <>
      <Head>
        {auth ? (
          <title>{auth.accessTokenData.username} | next-chat-app</title>
        ) : (
          <title>ログインしてください | next-chat-app</title>
        )}
      </Head>
      <GenericTemplate title="マイページ">
        {auth ? (
          <React.Fragment>
            <h4>IdTokenData</h4>
            <div>
              <React.Fragment>
                <p>{auth.idTokenData.email}</p>
                <p>{auth.idTokenData["cognito:username"]}</p>
              </React.Fragment>
            </div>
            <h4>AccessTokenData</h4>
            <div>{auth.accessTokenData.username}</div>
          </React.Fragment>
        ) : (
          <p>
            <small>ログインしてください。</small>
          </p>
        )}
      </GenericTemplate>
    </>
  );
};

export default MyPage;
